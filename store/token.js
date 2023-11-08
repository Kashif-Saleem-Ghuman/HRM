import { USER_ROLES } from "../utils/constant/Constant"

export const state = () => ({
  accessToken: "",
  activeTab:'Employee Profile',
  userRole:'',
  userId:'',
  activeUserData:[],
  isAdmin: false,
  isUser: false,
  subr: null
})
export const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
  getActiveTab(state){
    return state.activeTab
  },
  getUserRole(state){
    return state.userRole
  },
  getUserId(state){
    return state.userId
  },
  getActiveUserData(state){
    return state.activeUserData
  }
}
export const mutations = {
  SET_TOKEN(state, value) {
    state.accessToken = value
    this.$cookies.set("b_ssojwt", value)
  },
  SET_ACTIVE_TAB(state, value) {
    state.activeTab = value
  },
  SET_ACTIVE_USER_ROLE(state, value) {
    state.userRole = value
  },
  SET_ACTIVE_USER_ID(state, value) {
    state.userId = value
  },
  SET_ACTIVE_USER_DATA(state, value) {
    state.activeUserData = value
  },
  SET_IS_ADMIN(state, value) {
    state.isAdmin = value
  },
  SET_IS_USER(state, value) {
    state.isUser = value
  },

  SET_SUBR(state, value) {
    state.subr = value
  }
}

export const actions = {
  setToken(context, token) {
    context.commit('SET_TOKEN', token)
  },
  setActiveTab(context, activetab) {
    context.commit('SET_ACTIVE_TAB', activetab)
  },
  setActiveUserRole({ commit }, value) {
    commit('SET_ACTIVE_USER_ROLE', value)
    commit('SET_IS_ADMIN', value === USER_ROLES.ADMIN) 
    commit('SET_IS_USER', value === USER_ROLES.USER)
  },
  setActiveUserId(context, userId) {
    context.commit('SET_ACTIVE_USER_ID', userId)
  },
  setActiveUserData(context, activeUserData) {
    context.commit('SET_ACTIVE_USER_DATA', activeUserData)
    console.log(activeUserData, "activeUserDataactiveUserDataactiveUserDataactiveUserData")
  }
}


