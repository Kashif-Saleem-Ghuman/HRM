export const state = () => ({
  accessToken: "",
})
export const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
}
export const mutations = {
  SET_TOKEN(state, value) {
    state.accessToken = value
    // this.$cookies.set("b_ssojwt", value)
  },
}

export const actions = {
  setToken(context, token) {
    context.commit('SET_TOKEN', token)
  },

}