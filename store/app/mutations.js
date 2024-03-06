import { popupNotificationMsgs } from "@/utils/constant/Notifications";

const mutations = {
  SET_SEARCH_RESULTS(state, { results, search }) {
    state.searchResults = results;
    state.search = search;
  },
  ADD_NOTIFICATION(state, { notification }) {
    if (typeof notification === 'number') {
      state.notifications.push(popupNotificationMsgs[notification]);
      return;
    } else {
      state.notifications.push(notification);
    }
  },

  RESET_NOTIFICATIONS(state) {
    state.notifications = [];
  },
};

export default mutations;
