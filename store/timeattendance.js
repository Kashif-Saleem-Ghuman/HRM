import axios from "axios";
import { DateTime } from "luxon";
import {
  startTimer,
  stopTimer
} from "@/utils/functions/functions_lib_api";
import { getTimeAttendance } from "@/utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { Employee } from "../components/common/models/employee";
import { Timesheet } from "../components/common/models/timesheet";
import { cloneDeep } from "lodash";
import {ACTIVITY_TYPE, MAX_TIMER_DURATION_HOUR, TIME_ENTRY_SOURCE} from "../utils/constant/Constant";
import {
  getChronometerDuration,
  isDateToday,
} from "@/utils/functions/timer";

export const state = () => ({
  timer: {
    start: null,
    end: null,
    type: null,
    active: null,
  },
  breakTimer: {
    id: null,
    start: null,
    end: null,
    type: null,
    active: null,
  },
  dailyTimeEntries: [],
  dailyTimeEntriesToday: [],
  chronometer: 0,
  employeesAttendance: null,
  timesheet: {},
  timesheetToday: {},
  viewFrom: false,
});

export const getters = {
  getTimerData(state) {
    return state.timer;
  },
  getBreakTimerData(state) {
    return state.breakTimer;
  },
  getDailyTimeEntries(state) {
    return state.dailyTimeEntries;
  },

  getTimesheet(state) {
    return state.timesheet;
  },
  getTimesheetToday(state) {
    return state.timesheetToday;
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
    state.timer = payload.timer;
  },

  SET_BREAK_TIMER_DATA: (state, payload) => {
    state.breakTimer = payload.breakTimer;
  },

  RESET_TIME_ATTENDANCE_ENTRIES: (state, payload) => {
    state.dailyTimeEntries = [];
  },

  SET_DAILY_TIME_ENTRIES: (state, payload) => {
    state.dailyTimeEntries = payload;
  },

  SET_DAILY_TIME_ENTRIES_TODAY: (state, payload) => {
    state.dailyTimeEntriesToday = payload;
  },

  SET_TIMESHEET: (state, { timesheet }) => {
    state.timesheet = new Timesheet(timesheet)
  },

  SET_TIMESHEET_TODAY: (state, { timesheet }) => {
    state.timesheetToday = new Timesheet(timesheet);
  },

  SET_CHRONOMETER: (state, payload) => {
    const { chronometer } = payload
    state.chronometer = chronometer
  },

  SET_IS_TIMER_RUNNING: (state, payload) => {
    const { status } = payload
    state.isTimerRunning = status
  },
  SET_VIEW_FROM: (state, payload) => {
    state.viewFrom = payload
  }
};

export const actions = {
  async getEmployeesAttendance({ state, commit }, payload) {
    try {
      const { employees = [] } = await getTimeAttendance(payload);
      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      const parsedEmployees = employees.map((employee) => ( new Employee(employee) ));
      commit("SET_EMPLOYEE_ATTENDANCE", parsedEmployees);
      return cloneDeep(parsedEmployees)
    } catch (error) {
      throw error;
    }
  },

  async stopTimer({ commit, state }, { timer }) {
    try {
      let end = DateTime.now().toUTC().toISO();
      if (timer && timer.active) {
        const timerStart = DateTime.fromJSDate(new Date(timer.start))
        const timerDiff = DateTime.now().diff(timerStart, 'hours')
        const isExeedMaxDuration = timerDiff.hours >= MAX_TIMER_DURATION_HOUR
        if (isExeedMaxDuration) {
          end = timerStart.plus({ hours: MAX_TIMER_DURATION_HOUR }).toISO()
        }
      }
      await stopTimer({ id: state.timer.id, end, activity: ACTIVITY_TYPE.IN, source: TIME_ENTRY_SOURCE.SOURCE_TIMER })
    } catch (error) {
      console.error(error);
    }
    commit("SET_TIMER_DATA", {timer: {}})
    commit('SET_BREAK_TIMER_DATA', {breakTimer: {}});
  },


  async startTimer({ commit, dispatch }) {
    try {
      await startTimer()
    } catch (errorMessage) {
      throw errorMessage;
    }
    commit("SET_TIMER_DATA", { timer: {} })
  },


  resetTimeAttendanceEntries(ctx) {
    ctx.commit("RESET_TIME_ATTENDANCE_ENTRIES");
  },

  async setDailyTimeEntries(ctx, date = null) {
    try {
      const reqDate = date ?? DateTime.now().toISODate();
      const startOfDay = DateTime.fromISO(reqDate).startOf('day').toUTC().toISO();
      const { data } = await axios.get(
        process.env.API_URL + `/timesheets/daily?date=${reqDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );


      date && ctx.commit("SET_DAILY_TIME_ENTRIES", data.timeEntries);

      date && data && ctx.commit("SET_TIMESHEET", {timesheet: data?.timesheet || {}})

      if (isDateToday(startOfDay)) {

        !ctx.state.timer.active && ctx.commit("SET_CHRONOMETER", {
          chronometer: getChronometerDuration(data.timeEntries)
        });

        // Setting up Today time entries
        ctx.commit("SET_DAILY_TIME_ENTRIES_TODAY", data.timeEntries || []);
        ctx.commit("SET_TIMESHEET_TODAY",{ timesheet: data.timesheet || {}});

        // Setting up the timer
        ctx.commit("SET_TIMER_DATA", {timer: data?.activeTimeEntry || {}});
        ctx.commit('SET_BREAK_TIMER_DATA', {breakTimer: data?.activeBreak || {}});
      }
      return data
    } catch (e) {
      throw e;
    }
  },

  async setEmployeeDailyTimeEntry(ctx, { date, employeeId }) {
    try {
      const { data } = await axios.get(
        process.env.API_URL
          + "/timesheets/daily?date="
          + date
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
  },
  setIsViewFromTimesheetCard(ctx, payload) {
    ctx.commit("SET_VIEW_FROM", payload);
  }
}
