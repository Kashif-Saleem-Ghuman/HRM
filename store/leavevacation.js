import axios from "axios";
export const state = () => ({
  leaveVacationList: [],
});

export const getters = {
    getLeaveVacation(state) {
      return state.leaveVacationList
    },
    getActiveTab(state){
      return state.activeTab
    },
    getUserRole(state){
      return state.userRole
    }
  }
export const mutations = {
  SET_LEAVEVACATION_LIST: (state, payload) => {
    state.leaveVacationList = payload;
  },
};

export const  actions = {
    async setLeaveVacations(ctx, payload) {
    this.loading = true;
    try {
      const leaveVacations = await axios.get(
        "https://dev-hrm-api.business-in-a-box.com/v1/requests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            from: payload.from,
            to:payload.to
          },
        }
      );
      console.log(leaveVacations.data.requests, "leaveVacationsleaveVacations")
      ctx.commit("SET_LEAVEVACATION_LIST", leaveVacations.data.requests);
    } catch (e) {
      alert(e);
    }
    this.loading = false;
  }
}