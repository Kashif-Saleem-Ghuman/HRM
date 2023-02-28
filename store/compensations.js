export const state = () => ({
  compensationsList: [],
  compensationsById: [],
  compensationsEmployeeById: [],
});

export const getters = {
  GET_COMPENSATIONS_LIST(state) {
    return state.compensationsList;
  },
  GET_COMPENSATIONS_BY_ID(state) {
    return state.compensationsById;
  },
  GET_COMPENSATIONS_EMPLOYEE_BY_ID(state) {
    return state.compensationsEmployeeById;
  },
};

export const mutations = {
  SET_COMPENSATIONS_LIST: (state, payload) => {
    state.compensationsList = payload;
  },
  SET_COMPENSATIONS_BY_ID: (state, payload) => {
    state.compensationsById = payload;
  },
  SET_COMPENSATIONS_EMPLOYEE_BY_ID: (state, payload) => {
    state.compensationsEmployeeById = payload;
  },
};

export const actions = {
  // Compensation list by Employee ID
  async addCompensationsEmployeeId(ctx, payload) {
    try {
      const compensationsById = await this.$axios.$post(
        `${process.env.API_URL}/employees/${payload.id}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensationsById) {
        ctx.commit("SET_COMPENSATIONS_EMPLOYEE_BY_ID", compensationsById);
        return compensationsById;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async getCompensationsEmployeeId(ctx) {
    try {
      const compensations = await this.$axios.$get(
        `${process.env.API_URL}/employees/${payload.id}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("SET_COMPENSATIONS_EMPLOYEE_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async updateCompensationsEmployeeId(ctx) {
    try {
      const compensations = await this.$axios.$put(
        `${process.env.API_URL}/employees/${payload.id}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("SET_COMPENSATIONS_EMPLOYEE_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },

  // Compensation list API
  async getCompensations(ctx) {
    try {
      const compensations = await this.$axios.$get(
        `${process.env.API_URL}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("GET_COMPENSATIONS_LIST", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async updateCompensations(ctx) {
    try {
      const compensations = await this.$axios.$get(
        `${process.env.API_URL}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("GET_COMPENSATIONS_LIST", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },

  // Compensation list by ID

  async getCompensationsById(ctx, payload) {
    try {
      const compensations = await this.$axios.$get(
        `${process.env.API_URL}/compensations/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("GET_COMPENSATIONS_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async patchCompensationsById(ctx, payload) {
    try {
      const compensations = await this.$axios.$patch(
        `${process.env.API_URL}compensations/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("GET_COMPENSATIONS_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async deleteCompensationsId(ctx, payload) {
    try {
      const compensations = await this.$axios.$delete(
        `${process.env.API_URL}compensations/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("GET_COMPENSATIONS_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async addCompensationsEmployeeById(ctx, payload) {
    try {
      const compensations = await this.$axios.$post(
        `${process.env.API_URL}/employees/${payload.id}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("SET_COMPENSATIONS__EMPLOYEE_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getCompensationsEmployeeById(ctx, payload) {
    try {
      const compensations = await this.$axios.$post(
        `${process.env.API_URL}/employees/${payload.id}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("SET_COMPENSATIONS_BY_EMPLOYEE__ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async updateCompensationsEmployeeById(ctx, payload) {
    try {
      const compensations = await this.$axios.$put(
        `${process.env.API_URL}/employees/${payload.id}/compensations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (compensations) {
        ctx.commit("SET_COMPENSATIONS_EMPLOYEE_BY_ID", compensations);
        return compensations;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
