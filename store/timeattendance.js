import axios from "axios";
import fecha from "fecha";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";

export const state = () => ({
  timer: {
    start: null,
    end: null,
    type: null,
    active: null,
  },
  dailyTimeEntries: [],
});

export const getters = {
  getTimerData(state) {
    return state.timer;
  },
  getDailyTimeEntries(state) {
    return state.dailyTimeEntries;
  }
}

export const mutations = {
  SET_TIMER_DATA: (state, payload) => {
    const { start, end, type, active } = payload;
    state.timer.start = start || 0;
    state.timer.end = end || 0;
    state.timer.type = type;
    state.timer.active = active || false;
  },

  SET_DAILY_TIME_ENTRIES: (state, payload) => {
    state.dailyTimeEntries = payload;
  }
};

export const actions = {
  async setTimerData(ctx, employeeId = '') {
    this.loading = true;
    const defaultUrl = `${process.env.API_URL}/timers`;
    const url = employeeId ? defaultUrl + `?employeeId=${employeeId}` : defaultUrl;
    try {
      const leaveVacations = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      ctx.commit("SET_TIMER_DATA", leaveVacations.data);
      return leaveVacations.data;
    } catch (e) {
      alert(e);
    }
    this.loading = false;
  },

  async setDailyTimeEntries(ctx) {
    try {
      const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(new Date().setHours(23, 59, 59, 59)).toISOString();
      const { data } = await axios.get(
        process.env.API_URL + `/timesheets/daily?from=${startOfDay}&to=${endOfDay}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      ctx.commit("SET_DAILY_TIME_ENTRIES", data.timeEntries);
    } catch (e) {
      alert(e);
    }
  },

  async setEmployeeDailyTimeEntry(ctx, employeeId) {
    try {
      const date = fecha.format(new Date(), "YYYY-MM-DD")
      const { data } = await axios.get(
        process.env.API_URL + "/timesheets/admin/daily?date=" + date,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      const employee = data.employees.find((a) => a.id === employeeId);
      const timeEntries = employee.timeEntries || [];
      ctx.commit("SET_DAILY_TIME_ENTRIES", timeEntries.map((te) => ({
        start: te.start,
        end: te.end,
        total: te.total,
      })));
    } catch (e) {
      alert(e);
    }
  }
}
