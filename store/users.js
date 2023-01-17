export const state = () => ({
  user: null,
  userList: [],
});

export const getters = {
  GET_USERS_LIST(state) {
    return state.userList;
  },
};

export const mutations = {
  SET_USER: (state, payload) => {
    state.userList = payload;
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

  // async setUserList(ctx) {
  //   ctx.commit('SET_USER', TABLE_SECTIONS);  
  // },
  
  async setUserList(ctx) {
    try {
      const employeeList = await this.$axios.$get(`${process.env.API_URL}/employees`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (employeeList) {
        ctx.commit("SET_USER", employeeList.employees);
        return employeeList;
      } 
    } catch (e) {
      console.log(e);
    }
  },
  sortUserList(ctx, payload) {
    ctx.commit("sortUserList", payload);
  },
};
