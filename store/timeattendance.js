import axios from "axios";

export const state = () => ({
  timer: {
    start: null,
    end: null,
    type: null,
    active: null,
  },
});

export const getters = {
  getTimerData(state) {
    return state.timer;
  }
}

export const mutations = {
  SET_TIMER_DATA: (state, payload) => {
    const { start, end, type, active } = payload;
    state.timer.start = start || 0;
    state.timer.end = end || 0;
    state.timer.type = type;
    state.timer.active = active || false;
  }
};

export const actions = {
  async setTimerData(ctx, payload) {
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
  }
}
