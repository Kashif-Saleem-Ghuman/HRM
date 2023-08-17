import axios from "axios";
export const state = () => ({
  leaveVacationList: [],
  leaveVacationListUser: [],
  formToDAte:{},
});

export const getters = {
    getLeaveVacation(state) {
      return state.leaveVacationList
    },
    getLeaveVacationUser(state) {
      return state.leaveVacationListUser
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
  SET_LEAVEVACATION_LIST_USER: (state, payload) => {
    state.leaveVacationListUser = payload;
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
        `${process.env.API_URL}/requests/admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            from: payload?.from,
            to:payload?.to,
            search:payload?.search
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
  async setLeaveVacationsUser(ctx, payload) {

    this.loading = true;
    try {
      const leaveVacations = await axios.get(
        `${process.env.API_URL}/requests`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            from: payload?.from,
            to:payload?.to,
            employeeId:payload?.employeeId,
            search:payload?.search
          },
        }
      );
      ctx.commit("SET_LEAVEVACATION_LIST_USER", leaveVacations.data.requests);
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
