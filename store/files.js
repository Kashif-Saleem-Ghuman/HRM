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

export const actions = {
//   async setRootFolders({ commit, state }, folders) {
//     let rootFolders = await this.$axios.$get(
//       process.env.VUE_APP_CONVERT_API_URL + "rootfolders", {
//         headers: {
//           Authorization: state.accessToken,
//         },
//       }
//     );

//     // console.log(rootFolders, "Calledasdas")
//     if (rootFolders.name != 'Error') {
//       if (rootFolders.data) {
//         var recentFolder = rootFolders.data;
//         recentFolder.reverse();
//         // this.$store.dispatch('setRootFolders', rootFolders.data)
//         commit('setRootFolders', recentFolder)
//       } else {
//         // this.$store.dispatch('setRootFolders', [])
//         commit('setRootFolders', [])
//       }

//     }
//     // context.commit('setRootFolders', folders)
//   },
//   async setRootFiles({ commit, state }, files) {
//     let rootFiles = await this.$axios.$get(
//       process.env.VUE_APP_CONVERT_API_URL + "rootfiles", {
//         headers: {
//           // Authorization: this.$cookies.get("b_ssojwt"),
//           Authorization: state.accessToken,
//         },
//       }
//     );
//     // console.log(rootFiles)
//     if (rootFiles.name != 'Error') {
//       if (rootFiles.data) {
//         commit('setRootFiles', rootFiles.data)
//       } else {
//         commit('setRootFiles', [])
//       }
//     }
//   },
//   async setRecentFiles({ commit, state }, files) {
//     let recentFiles = await this.$axios.$get(
//       process.env.VUE_APP_CONVERT_API_URL + "getrecentfiles", {
//         headers: {
//           // Authorization: this.$cookies.get("b_ssojwt"),
//           Authorization: state.accessToken,
//         },
//       }
//     );
//     console.log(recentFiles, "askhdjakshdkjahsdkjhaskjhdkjashdkjhaskjdhk")
//     if (recentFiles.name != 'Error') {
//       if (recentFiles.data) {
//         commit('setRecentFiles', recentFiles.data)
//       } else {
//         commit('setRecentFiles', [])
//       }
//     }
//   },
//   setActiveFolder({ commit }, folder) {
//     commit('SET_ACTIVE_FOLDER', folder)
//   },
  
//   setSubfolder(context, payload) {
//     context.commit('SET_SUBFOLDER', payload)
//   },
//   async fetchFolderData({ commit, state }, folder) {
//     try {
//       const subfolder = await this.$axios.$get(process.env.VUE_APP_CONVERT_API_URL + 'getfolders/?id=' + folder._id, {
//         headers: {
//           Authorization: state.accessToken,
//         }
//       })
//       if (subfolder.total > 0) {
//         // console.log(subfolder.data)
//         commit('SET_SUBFOLDER', subfolder.data)
//       } else {
//         // console.warn(subfolder.total, 'folders found')
//         commit('SET_SUBFOLDER', [])
//       }
//       commit('SET_ACTIVE_FOLDER', folder)
//     } catch (e) {
//       // console.log(e);
//     }

//     try {
//       const subfiles = await this.$axios.$get(process.env.VUE_APP_CONVERT_API_URL + 'getfiles/?id=' + folder._id, {
//         headers: {
//           Authorization: state.accessToken,
//         }
//       })
//       if (subfiles.total > 0) {
//         // console.log(subfiles.data)
//         commit('SET_SUBFILES', subfiles.data)
//       } else {
//         // console.warn(subfiles.total, 'files found');
//         commit('SET_SUBFILES', [])
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   },

//   async createFolder({ commit, state }, payload) {
//     try {
//       const folder = await this.$axios.$post(process.env.VUE_APP_CONVERT_API_URL + 'createfolder', payload, {
//         headers: {
//           "Authorization": state.accessToken,
//         }
//       })
//       // console.log(folder.data)
//       if (folder.statusCode == 200) {
//         commit('SET_ACTIVE_FOLDER', folder.data)
//       } else {
//         commit('SET_ACTIVE_FOLDER', '')
//       }
//       // this.openPopupNotification(1)
//     } catch (e) {
//       // console.log(e);
//       alert(e)
//     }
//   }
  
}

