import axios from "axios";
import { DateTime } from "luxon";
import { startTimer, stopTimer } from "@/utils/functions/api_call/timeattendance/timer";
import { getTimeAttendance } from "@/utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { Employee } from "../components/common/models/employee";
import { Timesheet } from "../components/common/models/timesheet";
import { cloneDeep } from "lodash";
import { MAX_TIMER_DURATION_HOUR } from "../utils/constant/Constant";

export const state = () => ({
  timer: {
    start: null,
    end: null,
    type: null,
    active: null,
  },
  dailyTimeEntries: [],
  dailyTimeEntriesToday: [],
  chronometer: 0,
  isTimerRunning: false,
  employeesAttendance: null,
  timesheetToday: null
});

export const getters = {
  getTimerData(state) {
    return state.timer;
  },
  getDailyTimeEntries(state) {
    return state.dailyTimeEntries;
  },

  getdailyTimeEntriesToday(state) {
    return state.dailyTimeEntriesToday;
  }
}

export const mutations = {
  SET_EMPLOYEE_ATTENDANCE(state, payload) {
    state.employeesAttendance = payload
  },

  SET_TIMER_DATA: (state, payload) => {
    const { start, end, type, active } = payload;
    state.timer.start = start || 0;
    state.timer.end = end || 0;
    state.timer.type = type;
    state.timer.active = active || false;
  },

  SET_DAILY_TIME_ENTRIES: (state, payload) => {
    state.dailyTimeEntries = payload;
  },

  SET_DAILY_TIME_ENTRIES_TODAY: (state, payload) => {
    state.dailyTimeEntriesToday = payload;
  },

  SET_TIMESHEET_TODAY: (state, { timesheet }) => {
    state.timesheetToday = timesheet ? new Timesheet(timesheet) : null
  },

  SET_CHRONOMETER: (state, payload) => {
    const { chronometer } = payload
    state.chronometer = chronometer
  },

  SET_IS_TIMER_RUNNING: (state, payload) => {
    const { status } = payload
    state.isTimerRunning = status
  }
};

export const actions = {
  async getEmployeesAttendance({ state, commit }, payload) {
    try {
      const { date, searchString } = payload
      const { employees = [] } = await getTimeAttendance({ date, searchString });
      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      const parsedEmployees = employees.map((employee) => ( new Employee(employee) ));
      commit("SET_EMPLOYEE_ATTENDANCE", parsedEmployees);
      return cloneDeep(parsedEmployees)
    } catch (e) {
      if (e.response.status === 500) {
        return window.open('/not-found',"_self")
      }
      console.error(error);
    }
  },

  async stopTimer({ commit }, { timer }) {
    try {
      let end = null
      if (timer && timer.active) {
        const timerStart = DateTime.fromJSDate(new Date(timer.start))
        const timerDiff = DateTime.now().diff(timerStart, 'hours')
        const isExeedMaxDuration = timerDiff.hours >= MAX_TIMER_DURATION_HOUR
        if (isExeedMaxDuration) {
          end = timerStart.plus({ hours: MAX_TIMER_DURATION_HOUR }).toISO()
        }
      }
      await stopTimer({ end })
    } catch (error) {
      console.error(error);
    }
    commit("SET_TIMER_DATA", {})
  },


  async startTimer({ commit, dispatch }) {
    try {
      await startTimer()
      dispatch("setTimerData")
    } catch (error) {
      console.error(error);
    }
    commit("SET_TIMER_DATA", {})
    commit("SET_IS_TIMER_RUNNING", { status: false });
  },

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
      console.log(e);
    }
    this.loading = false;
  },

  async setDailyTimeEntries(ctx, date = new Date().toISOString()) {
    try {
      const startOfDay = DateTime.fromISO(date).startOf('day').toUTC().toISO()
      const endOfDay = DateTime.fromISO(date).endOf('day').toUTC().toISO()

      const { data } = await axios.get(
        process.env.API_URL + `/timesheets/daily?from=${startOfDay}&to=${endOfDay}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      ctx.commit("SET_DAILY_TIME_ENTRIES", data.timeEntries);

      if (DateTime.fromISO(startOfDay).hasSame(DateTime.now(), 'day')) {
        ctx.commit("SET_DAILY_TIME_ENTRIES_TODAY", data.timeEntries);
        ctx.commit("SET_TIMESHEET_TODAY",{ timesheet: data.timesheet});
      }
      return data
    } catch (e) {
      console.log(e);
    }
  },

  async setDailyTimeEntriesToday(ctx, date = new Date().toISOString()) {
    try {
      const startOfDay = DateTime.fromISO(date).startOf('day').toUTC().toISO()
      const endOfDay = DateTime.fromISO(date).endOf('day').toUTC().toISO()

      const { data } = await axios.get(
        process.env.API_URL + `/timesheets/daily?from=${startOfDay}&to=${endOfDay}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      ctx.commit("SET_DAILY_TIME_ENTRIES_TODAY", data.timeEntries);
    } catch (e) {
      console.log(e);
    }
  },

  async setEmployeeDailyTimeEntry(ctx, { date, employeeId }) {
    try {
      const startOfDay = DateTime.fromISO(date).startOf('day').toUTC().toISO()
      const endOfDay = DateTime.fromISO(date).endOf('day').toUTC().toISO()
      const { data } = await axios.get(
        process.env.API_URL
          + "/timesheets/daily?from="
          + startOfDay
          + "&to="
          + endOfDay
          + "&employeeId="
          + employeeId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      ctx.commit("SET_DAILY_TIME_ENTRIES", data.timeEntries.map((te) => ({
        start: te.start,
        end: te.end,
        total: te.total,
        status: te.status,
        activity: te.activity
      })));
    } catch (e) {
      if (e.response.status === 500) {
        return window.open('/not-found',"_self")
      }
      console.log(e);
    }
  },

  async setEmployeeDailyTimeEntryToday(ctx, { date, employeeId }) {
    try {
      const startOfDay = DateTime.fromISO(date).startOf('day').toUTC().toISO()
      const endOfDay = DateTime.fromISO(date).endOf('day').toUTC().toISO()
      const { data } = await axios.get(
        process.env.API_URL
        + "/timesheets/daily?from="
        + startOfDay
        + "&to="
        + endOfDay
        + "&employeeId="
        + employeeId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      ctx.commit("SET_DAILY_TIME_ENTRIES_TODAY", data.timeEntries.map((te) => ({
        start: te.start,
        end: te.end,
        total: te.total,
        status: te.status,
        activity: te.activity
      })));
    } catch (e) {
      if (e.response.status === 500) {
        return window.open('/not-found',"_self")
      }
      console.log(e);
    }
  }
}
