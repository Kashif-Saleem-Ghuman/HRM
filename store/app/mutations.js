const mutations = {
  SET_SEARCH_RESULTS(state, { results, search }) {
    state.searchResults = results;
    state.search = search;
  },
};

export default mutations;
