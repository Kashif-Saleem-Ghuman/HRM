import { search } from "../../utils/functions/api_call/search";
import { createNotificationObject } from "../../utils/notifications";

const actions = {
  async performSearch({ state, commit }, payload) {
    const { search: searchString } = payload
    const results = await search(payload);
    commit("SET_SEARCH_RESULTS", { results, search: searchString });
  },

  addNotification({ state, commit }, { notification }) {
    if ( typeof notification === 'string' ) {
      notification = createNotificationObject({ text: notification })
    }
    commit("ADD_NOTIFICATION", { notification })
  },
};

export default actions;