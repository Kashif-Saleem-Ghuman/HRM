import { redirectToLogin } from "../utils/functions/api_call/auth";

export const state = () => ({
  user: [],
  activeUser:[],
  userList: [],
  departmentList: [],
  reportList: [],
  selectedEmployeeId: null
});

export const getters = {
  GET_USERS_LIST(state) {
    return state.userList;
  },
  GET_USER(state) {
    return state.user;
  },
  GET_ACTIVE_USER(state) {
    return state.activeUser;
  },
  GET_DEPARTMENT_LIST(state) {
    return state.departmentList;
  },
  GET_REPORTS_LIST(state) {
    return state.reportList;
  },
};

export const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_ACTIVE_USER: (state, payload) => {
    state.activeUser = payload;
  },
  SET_USERS: (state, payload) => {
    state.userList = payload;
  },
  SET_DEPARTMENT: (state, payload) => {
    state.departmentList = payload;
  },
  SET_REPORTS: (state, payload) => {
    state.reportList = payload;
  },
  SET_SELECTED_EMPLOYEE_ID: (state, payload) => {
    const { employeeId } = payload
    state.selectedEmployeeId = employeeId;
  },
};

export const actions = {
  async setUserListPayload(ctx, payload) {
    try {
      const employeeList = await this.$axios.$get(
        `${process.env.API_URL}/employees?limit=${payload.limit}&page=${payload.page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (employeeList) {
        ctx.commit("SET_USERS", employeeList.employees);
        return employeeList;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async setUserList(ctx, payload) {
    // console.log(payload, "Payload console")

    try {
      const employeeList = await this.$axios.$get(
        `${process.env.API_URL}/employees`,
        // ${process.env.API_URL}/employees?limit=${payload.limit}&page=${payload.page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (employeeList) {
        ctx.commit("SET_USERS", employeeList.employees);
        return employeeList.employees;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async setReportsToList(ctx) {
    try {
      const report = await this.$axios.$get(
        `${process.env.API_URL}/employees/select-options`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      ctx.commit("SET_REPORTS",  report.employees);
      return  report.employees;
    } catch (e) {
      console.log(e);
    }
  },
 
  async setUser({ commit }, payload) {
    try {
      const user = await this.$axios.$get(
        `${process.env.API_URL}/employees/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (user) {
        commit("SET_USER", user);
        return user;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async setActiveUser(ctx) {
    try {
      const user = await this.$axios.$get(
        `${process.env.API_URL}/my-profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (user) {
        ctx.commit("SET_ACTIVE_USER", user);
        return user;
      }
    } catch (e) {
      console.error(e);
      if (e.response.status === 401) {
        redirectToLogin()
      };
    }
  },
};
