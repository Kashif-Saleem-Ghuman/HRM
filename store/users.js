export const state = () => ({
  user: [],
  userList: [],
  departmentList: [],
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
  sortUserList(state, payload) {
    if (payload.order == "desc") {
      console.log(state.userList, "userList");
      state.userList.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }
    if (payload.order == "asc") {
      console.log(state.userList, "userList");
      state.userList.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
  },
};

export const actions = {
  async setUserList(ctx) {
    try {
      const employeeList = await this.$axios.$get(
        `${process.env.API_URL}/employees`,
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
  async setDepartmentList(ctx) {
    try {
      const department = await this.$axios.$get(
        `${process.env.API_URL}/organizations/${localStorage.getItem(
          "businessId"
        )}/departements`,
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
        `${process.env.API_URL}/employees/${payload}`,
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
