export const state = () => ({
  timeOffList: [],
});

export const getters = {
  GET_TIMEOFF_LIST(state) {
    return state.timeOffList;
  },
};

export const mutations = {
  SET_TIMEOFF_LIST: (state, payload) => {
    state.timeOffList = payload;
  },
};

export const actions = {
  async addtimeOff(ctx, payload) {
    try {
      const timeOff = await this.$axios.$post(
        `${process.env.API_URL}/employees/${payload.id}/time-off`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (timeOff) {
        ctx.commit("SET_TIMEOFF_LIST", timeOff);
        return timeOff;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async gettimeOff(ctx, payload) {
    try {
      const timeOff = await this.$axios.$get(
        `${process.env.API_URL}/employees/${payload.id}/time-off`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (timeOff) {
        ctx.commit("SET_TIMEOFF_LIST", timeOff);
        return timeOff;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async updatetimeOff(ctx, payload) {
    try {
      const timeOff = await this.$axios.$put(
        `${process.env.API_URL}/${payload.id}/time-off`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (timeOff) {
        ctx.commit("SET_TIMEOFF_LIST", timeOff);
        return timeOff;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
