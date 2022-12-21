export const state = () => ({
    user: null,
  });
  
  export const getters = {
    getUser(state) {
      return state.user;
    },
  };
  
  export const mutations = {
    setUser(state, payload) {
      state.user = payload;
    },
  
    fetchBusinessId(state, payload) {
      state.teamMembers = payload;
    },
    
  };
  
  export const actions = {
    async setUser(ctx, payload) {
      await ctx.commit('setUser', payload);
    },
  
    async fetchBusinessId(ctx) {
      const business = await this.$axios.$get(`${process.env.ORG_API_URL}/O3GWpmbk5ezJn4KR`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      ctx.commit("fetchBusinessId", business)
    },
  
    
    
  };
  