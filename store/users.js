import axios from "axios";
import { TABLE_SECTIONS } from "../utils/constant/Constant.js";
export const state = () => ({
  user: null,
  userList: [],
});

export const getters = {
  GET_USERS_LIST(state) {
    return state.userList;
  },
  GET_SINGLE_USERS_LIST(state) {
    return state.userList;
  },
};

export const mutations = {
  SET_USER: (state, payload) => {
    state.userList = payload;
  },
  SET_SINGLE_USER: (state, payload) => {
    state.userList = payload;
  },
  sortUserList(state, payload) {
    // console.log("called", payload.order)
    // sort By Title
    if (payload.order == "desc") {
      console.log(state.userList, "userList");
      state.userList.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (payload.order == "asc") {
      console.log(state.userList, "userList");
      state.userList.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
};

export const actions = {
  async setUserList(ctx) {
    ctx.commit("SET_USER", TABLE_SECTIONS);
  },
  async setSingleUserList(ctx, payload) {
    var id = payload.userId;
    var users = TABLE_SECTIONS.find((user) => user.id === payload.userId);
    ctx.commit("SET_SINGLE_USER", users);
    return users;
  },
  sortUserList(ctx, payload) {
    ctx.commit("sortUserList", payload);
  },
};
