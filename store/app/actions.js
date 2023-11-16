import { search } from "../../utils/functions/api_call/search";

const actions = {
  async performSearch({ state, commit }, payload) {
    const results = await search(payload);
    commit("SET_SEARCH_RESULTS", results);
  },
};

export default actions;
