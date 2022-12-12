export const strict = false;
export const state = () => ({
  userToken: "",
  accessToken: "",
})
export const getters = {
 

}
export const mutations = {
  SET_TOKEN(state, value) {
    state.accessToken = value
  },
}

export const actions = {

  setToken(context, token) {
    context.commit('SET_TOKEN', token)
  },
  
}