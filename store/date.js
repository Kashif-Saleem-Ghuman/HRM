export const state = () => ({
    activeDate: "",
  })
  export const getters = {
    getActiveDate(state) {
      return state.activeDate
    },
  }
  export const mutations = {
    SET_ACTIVE_DATE(state, value) {
      state.activeDate = value
    },
  }
  
  export const actions = {
    setActiveDate(context, activeDate) {
      context.commit('SET_ACTIVE_DATE', activeDate)
    },
  }
  