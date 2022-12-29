import axios from 'axios';  
import {TABLE_SECTIONS} from '../utils/constant/Constant.js'
export const state = () => ({
    user: null,
    userList: []
  });
  
  export const getters = {
    GET_USERS_LIST(state) {
      return state.userList;
    },
  };
  
  export const mutations = {
    SET_USER: (state, payload) => { 
        state.userList = payload;
    },
    sortUserList(state, payload) {
      // console.log("called", payload.order)
      // sort By Title
      if (payload.order == 'desc') {
        console.log(state.userList, "userList")
        state.userList.sort((a, b) => b.name.localeCompare(a.name))
      }
      if (payload.order == 'asc') {
        console.log(state.userList, "userList")
        state.userList.sort((a, b) => a.name.localeCompare(b.name))
      }

    }
  };
  
  export const actions = {
    async setUserList(ctx) {
      ctx.commit('SET_USER', TABLE_SECTIONS);  
    },
    sortUserList(ctx, payload) {
      ctx.commit('sortUserList', payload)
    }
  };
  