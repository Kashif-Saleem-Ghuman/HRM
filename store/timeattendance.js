import axios from "axios";

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
  async setTimerData(ctx) {
    this.loading = true;
    try {
      const leaveVacations = await axios.get(
        `${process.env.API_URL}/timers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
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
  }
}
