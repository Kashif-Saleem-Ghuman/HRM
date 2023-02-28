var businessId = localStorage.getItem("businessId");
export const state = () => ({
  departmentList: [],
});

export const getters = {
  GET_DEPARTMENT_LIST(state) {
    return state.departmentList;
  },
};

export const mutations = {
  SET_DEPARTMENT_LIST: (state, payload) => {
    state.departmentList = payload;
  },
};

export const actions = {
  async addDepartment(ctx) {
    try {
      const department = await this.$axios.$post(
        `${process.env.API_URL}/organizations/${businessId}/departments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (department) {
        ctx.commit("SET_DEPARTMENT_LIST", department);
        return department;
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
        ctx.commit("SET_DEPARTMENT_LIST", department);
        return department;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async updateDepartment(ctx) {
    try {
      const department = await this.$axios.$put(
        `${process.env.API_URL}/organizations/${businessId}/departments/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (department) {
        ctx.commit("SET_DEPARTMENT_LIST", department);
        return department;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async deleteDepartment(ctx) {
    try {
      const department = await this.$axios.$delete(
        `${process.env.API_URL}/organizations/${businessId}/departments/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (department) {
        ctx.commit("SET_DEPARTMENT_LIST", department);
        return department;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
