import { USER_ROLES } from "../utils/constant/Constant";
import { getEmployeeRole } from "../utils/employees/get-employee-role";
import {
  redirectToLogin,
  validateToken,
} from "../utils/functions/api_call/auth";

export const state = () => ({
  accessToken: "",
  activeTab: "Employee Profile",
  userRole: "",
  userId: "",
  activeUserData: [],
  isAdmin: false,
  isUser: false,
  subr: null,
  hrmRole: null,
  accountType: "",
});
export const getters = {
  getAccessToken(state) {
    return state.accessToken;
  },
  getActiveTab(state) {
    return state.activeTab;
  },
  getUserRole(state) {
    return state.userRole;
  },
  getUserId(state) {
    return state.userId;
  },
  getActiveUserData(state) {
    return state.activeUserData;
  },
};
export const mutations = {
  SET_TOKEN(state, value) {
    state.accessToken = value;
    // this.$cookies.set("b_ssojwt", value)
  },
  SET_ACTIVE_TAB(state, value) {
    state.activeTab = value;
  },
  SET_ACTIVE_USER_ROLE(state, value) {
    state.userRole = value;
  },
  SET_ACTIVE_HRM_ROLE(state, value) {
    state.hrmRole = value;
  },
  SET_ACTIVE_USER_ID(state, value) {
    state.userId = value;
  },
  SET_ACTIVE_USER_DATA(state, value) {
    state.activeUserData = value;
  },
  SET_IS_ADMIN(state, value) {
    state.isAdmin = value;
  },
  SET_IS_USER(state, value) {
    state.isUser = value;
  },

  SET_IS_ROLE(state, value) {
    state.isUser = value == USER_ROLES.USER;
    state.isAdmin = value == USER_ROLES.ADMIN;
  },

  SET_SUBR(state, value) {
    state.subr = value;
  },

  SET_ACCOUNT_TYPE(state, value) {
    state.accountType = value;
  },
};

export const actions = {
  setToken(context, token) {
    context.commit("SET_TOKEN", token);
  },
  setActiveTab(context, activetab) {
    context.commit("SET_ACTIVE_TAB", activetab);
  },
  setActiveUserRole({ commit }, { employee }) {
    const viewRole = getEmployeeRole(employee);
    console.log(employee.hrmRole, employee, "employee.hrmRole");
    commit("SET_ACTIVE_USER_ROLE", employee.hrmRole);
    commit("SET_ACTIVE_HRM_ROLE", employee.hrmRole);

    commit("SET_IS_ROLE", viewRole);
  },
  setViewRole({ commit }, { role }) {
    commit("SET_IS_ROLE", role);
  },
  setActiveUserId(context, userId) {
    context.commit("SET_ACTIVE_USER_ID", userId);
  },
  setActiveUserData(context, activeUserData) {
    context.commit("SET_ACTIVE_USER_DATA", activeUserData);
  },
  async validateJwtToken({ commit }, { token }) {
    const u = await validateToken({ token }).catch((e) => {
      if (e.response.status === 401) {
        redirectToLogin();
      }
    });

    const accountType = u?.subbs;
    commit("SET_ACCOUNT_TYPE", accountType);

    const businessId = u?.subb;
    const userId = u?.sub;
    localStorage.setItem("businessId", businessId);
    localStorage.setItem("userId", userId);
    commit(
      "organizations/SET_ORGANIZATION_ID",
      { organizationId: businessId },
      { root: true }
    );
    return u;
  },
};
