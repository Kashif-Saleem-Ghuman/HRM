export const state = () => ({
  isLightTheme: true,
});

export const mutations = {
  setTheme(state, theme) {
    state.isLightTheme = theme;
  },
};

export const actions = {
  toggleTheme({ commit }, theme) {
    commit('setTheme', theme);
  },
};

export const getters = {
  isLightTheme: (state) => state.isLightTheme,
};
