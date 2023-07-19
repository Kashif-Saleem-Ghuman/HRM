import axios from "axios";
export const state = () => ({
  leaveVacationList: [],
  formToDAte:{},
});

export const getters = {
    getLeaveVacation(state) {
      return state.leaveVacationList
    },
    getformToDate(state) {
      return state.formToDAte
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
  SET_FROMTODATE_LIST: (state, payload) => {
    state.formToDAte = payload;
  },
};

export const  actions = {
    async setLeaveVacations(ctx, payload) {
    this.loading = true;
    try {
      const leaveVacations = await axios.get(
        "https://dev-hrm-api.business-in-a-box.com/v1/requests/admin",
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
      ctx.commit("SET_LEAVEVACATION_LIST", leaveVacations.data.requests);
      return leaveVacations.data.requests
    } catch (e) {
      alert(e);
    }
    this.loading = false;
  },
  setActiveFromToDate(context, payload) {
    context.commit('SET_FROMTODATE_LIST', payload)
  },
}
