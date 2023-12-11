import axios from "axios";
export const state = () => ({
  leaveVacationAllowance: [],
});

export const getters = {
    getLeaveAllowance(state) {
      return state.leaveVacationAllowance
    },
  }
export const mutations = {
  SET_LEAVEVACATION_ALLOWANCE: (state, payload) => {
    state.leaveVacationAllowance = payload;
  },
};

export const  actions = {
    async setLeaveVacationsAllowance(ctx, payload) {
    this.loading = true;
    try {
      const leaveVacationsAlowance = await axios.get(
        `${process.env.API_URL}/widgets/admin/request/employees/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      ctx.commit("SET_LEAVEVACATION_ALLOWANCE", leaveVacationsAlowance.data);
      return leaveVacationsAlowance.data
    } catch (e) {
      alert(e);
    }
    this.loading = false;
  },
}
