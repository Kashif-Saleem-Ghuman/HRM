export const strict = false;
export const state = () => ({
  accessToken: "",
})
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  getAccessToken(state) {
    return state.accessToken
  },
}
export const mutations = {
  SET_TOKEN(state, value) {
    state.accessToken = value
    this.$cookies.set("b_ssojwt", value)
  },
  unsetToken(state) {
    state.accessToken = ""
  },

}

export const actions = {
  setToken(context, token) {
    context.commit('SET_TOKEN', token)
  },

}