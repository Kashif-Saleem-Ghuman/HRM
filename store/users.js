export const state = () => ({
  user: [],
  userList: [],
  departmentList: [],
  reportList: [],
  teamList: [],
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
  GET_TEAM_LIST(state) {
    return state.teamList;
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
  SET_TEAM: (state, payload) => {
    state.teamList = payload;
  },
  sortUserList(state, payload) {
    // var users = state.userList;
    // if (payload.order == "desc") {
    //   console.log(state.userList, "userList");
    //   state.userList.sort((a, b) => b.firstName.localeCompare(a.firstName));
    // }
    // if (payload.order == "asc") {
    //   console.log(state.userList, "userList");
    //   state.userList.sort((a, b) => a.firstName.localeCompare(b.firstName));
    // }
    // if (payload.sName == "reset") {

    //   // state.userList.sort((a, b) => a.localeCompare(b))
    // }
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
  async setTeamList(ctx) {
    try {
      const team = await this.$axios.$get(
        `${process.env.API_URL}/teams/select-options`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (team) {
        ctx.commit("SET_TEAM", team);
        return team;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async setReportsList(ctx) {
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
  async setDepartmentList(ctx) {
    var businessId = localStorage.getItem("businessId");
    try {
      const department = await this.$axios.$get(
        `${process.env.API_URL}/organizations/${businessId}/departments/select-options`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (department) {
        ctx.commit("SET_DEPARTMENT", department);
        return department;
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
  sortUserList(ctx, payload) {
    ctx.commit("sortUserList", payload);
  },
};
