export const state = () => ({
  accessToken: "",
  activeTab:'Employee Profile',
})
export const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
  getActiveTab(state){
    return state.activeTab
  }
}
export const mutations = {
  SET_TOKEN(state, value) {
    state.accessToken = value
    // this.$cookies.set("b_ssojwt", value)
  },
  SET_ACTIVE_TAB(state, value) {
    state.activeTab = value
  },
}

export const actions = {
  setToken(context, token) {
    context.commit('SET_TOKEN', token)
  },
  setActiveTab(context, activetab) {
    console.log(activetab, "activetabactivetabactivetab")
    context.commit('SET_ACTIVE_TAB', activetab)
  },

}
