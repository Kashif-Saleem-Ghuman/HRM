export const state = () => ({
  user: [],
  userList: [],
  departmentList: [],
  reportList: [],
});

export const getters = {
  GET_USERS_LIST(state) {
    return state.userList;
  },
  GET_USER(state) {
    return state.user;
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
  SET_USERS: (state, payload) => {
    state.userList = payload;
  },
  SET_DEPARTMENT: (state, payload) => {
    state.departmentList = payload;
  },
  SET_REPORTS: (state, payload) => {
    state.reportList = payload;
  },
};

export const actions = {
  async setUserListPayload(ctx, payload) {
    // console.log(payload, "Payload console")

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
        return employeeList;
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
      var reportsTo = report.employees;
      if (report) {
        ctx.commit("SET_REPORTS", reportsTo);
        return report;
      }
    } catch (e) {
      console.log(e);
    }
  },
 
  async setUser(ctx, payload) {
    try {
      const user = await this.$axios.$get(
        `${process.env.API_URL}/employees/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (user) {
        ctx.commit("SET_USER", user);
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
        ctx.commit("SET_USER", user);
        return user;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
