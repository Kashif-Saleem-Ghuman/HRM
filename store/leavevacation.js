import axios from "axios";
import { DateTime } from "luxon";
export const state = () => ({
  leaveVacationList: [],
  leaveVacationListUser: [],
  formToDAte: {},
});

export const getters = {
  getLeaveVacation(state) {
    return state.leaveVacationList;
  },
  getLeaveVacationUser(state) {
    return state.leaveVacationListUser;
  },
  getformToDate(state) {
    return state.formToDAte;
  },
  getActiveTab(state) {
    return state.activeTab;
  },
  getUserRole(state) {
    return state.userRole;
  },
};
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

export const actions = {
  async setLeaveVacations(ctx, payload) {
    const { from, to, search, status } = payload;
    try {
      const leaveVacations = await axios.get(
        `${process.env.API_URL}/requests/admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            from,
            to,
            search,
            status,
            split: true,
          },
        }
      );
      const sortedLeave = leaveVacations.data.requests.sort((a, b) => {
        const endDateA = DateTime.fromISO(a.start);
        const endDateB = DateTime.fromISO(b.start);
        console.log(endDateA, "data", endDateB)

        return endDateB - endDateA;
      });
      console.log(sortedLeave, "data")
      ctx.commit("SET_LEAVEVACATION_LIST", sortedLeave);
      return sortedLeave;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  },
  async setLeaveVacationsUser(ctx, payload) {
    try {
      const leaveVacations = await axios.get(
        `${process.env.API_URL}/requests`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            from: payload?.from,
            to: payload?.to,
            employeeId: payload?.employeeId,
            search: payload?.search,
          },
        }
      );
      const sortedLeave = leaveVacations.data.requests.sort((a, b) => {
        const endDateA = DateTime.fromISO(a.start);
        const endDateB = DateTime.fromISO(b.start);
        return endDateB - endDateA;
      });
      ctx.commit("SET_LEAVEVACATION_LIST_USER", sortedLeave);
      // var data = leave.data.requests
      return sortedLeave;
    } catch (e) {
      if (e.response.status === 500) {
        return window.open("/not-found", "_self");
      }
      console.log(e);
    }
  },
  setActiveFromToDate(context, payload) {
    context.commit("SET_FROMTODATE_LIST", payload);
  },
};
