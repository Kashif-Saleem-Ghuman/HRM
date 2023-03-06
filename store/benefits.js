export const state = () => ({
    benefitsList: [],
  });
  
  export const getters = {
    GET_BENEFITS_LIST(state) {
      return state.benefitsList;
    },
  };
  
  export const mutations = {
    SET_BENEFITS_LIST: (state, payload) => {
      state.benefitsList = payload;
    },
  };
  
  export const actions = {
    async addBenefits(ctx, payload) {
      try {
        const benefits = await this.$axios.$post(
          `${process.env.API_URL}/employees/${payload.id}/benefits`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (benefits) {
          ctx.commit("SET_BENEFITS_LIST", benefits);
          return benefits;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getBenefits(ctx, payload) {
      try {
        const benefits = await this.$axios.$get(
          `${process.env.API_URL}/employees/${payload.id}/benefits`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (benefits) {
          ctx.commit("SET_BENEFITS_LIST", benefits);
          return benefits;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async updateBenefits(ctx, payload) {
      try {
        const benefits = await this.$axios.$put(
          `${process.env.API_URL}/${payload.id}/benefits`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (benefits) {
          ctx.commit("SET_BENEFITS_LIST", benefits);
          return benefits;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deleteBenefits(ctx, payload) {
        try {
          const benefits = await this.$axios.$delete(
            `${process.env.API_URL}/${payload.id}/benefits`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          if (benefits) {
            ctx.commit("SET_BENEFITS_LIST", benefits);
            return benefits;
          }
        } catch (e) {
          console.log(e);
        }
      },
  };
  