import { result } from "lodash";

export const strict = false;
var CryptoJS = require("crypto-js");
export const state = () => ({
  rootFolders: [],
  recentFiles: [],
  activeFolder: {
    __v: "",
    _id: "",
    active: true,
    name: "",
    parent: null,
    tags: [],
    subs: [],
    locked: false,
    protected: false,
    trashed: false,
    createdBy: {},
    updatedBy: {},
    deletedBy: {},
    createdAt: "",
    updatedAt: "",
    showChildren: false
  },
  subFolder: [],
  subFiles: []
})
export const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
  getRecentFiles(state) {
    return state.recentFiles
  },
  getActiveFolder(state) {
    return state.activeFolder
  },
  getSubFolder(state) {
    return state.subFolder
  },
  getSubFiles(state) {
    return state.subFiles
  }
}
export const mutations = {
  setRootFiles(state, files) {
    state.rootFiles = files
  },
  setRecentFiles(state, files) {
    state.recentFiles = files
  },
  SET_ACTIVE_FOLDER(state, folder) {
    state.activeFolder = folder
    state.activeFolder = Object.assign({}, state.activeFolder, folder)
  },
  SET_SUBFOLDER(state, payload) {
    state.subFolder = payload
  },
  SET_SUBFILES(state, payload) {
    state.subFiles = payload
  }
}

