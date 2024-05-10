export const state = () => ({
    previousPath: ''
  });
  
  export const mutations = {
    setPreviousPath(state, path) {
      state.previousPath = path;
    }
  };
  
  export const actions = {
    setPreviousPath({ commit }, path) {
      commit('setPreviousPath', path);
    }
  };
  
  export const getters = {
    getPreviousPath: state => state.previousPath
  };
  