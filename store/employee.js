import { redirectToLogin } from "../utils/functions/api_call/auth";
import { getActiveEmployees } from "../utils/functions/api_call/employees";
import { getActiveTimer } from "../utils/functions/api_call/timeattendance/timer";

export const state = () => ({
  user: [],
  activeUser:[],
  userList: [],
  departmentList: [],
  reportList: [],
  selectedEmployeeId: null,
  selectedEmployee: null,
  activeEmployees: {},
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
  SET_ACTIVE_EMPLOYEES: (state, payload) => {
    state.activeEmployees = payload;
  },

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
  SET_SELECTED_EMPLOYEE: (state, { employee }) => {
    state.selectedEmployee = employee
  }
};

export const actions = {
  async setActiveEmployees({ commit }) {
    try {
      const activeEmployees = await getActiveEmployees();
      commit("SET_ACTIVE_EMPLOYEES", activeEmployees);
    } catch (error) {
      console.log(error);
    }
  },

  async setSelelectedEmployee({ state, commit}, { employeeId }) {
    if (!employeeId) return  commit("SET_SELECTED_EMPLOYEE", { employee: null })
    if (state.selectedEmployee && state.selectedEmployee.id == employeeId) return state.selectedEmployee

    const employee = { id: employeeId }
    commit("SET_SELECTED_EMPLOYEE", { employee })
    return employee
  },

  async setSelectedEmployeeTimer({ state, commit}) {
    const employeeId = state.selectedEmployee?.id
    if (!employeeId) return 
    const timer = await getActiveTimer({ employeeId })
    const employee = { ...state.selectedEmployee, timer }
    commit("SET_SELECTED_EMPLOYEE", { employee })
    return employee
  },

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
