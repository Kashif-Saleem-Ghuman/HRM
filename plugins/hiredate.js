// plugins/globalFunctions.js
import { DateTime } from 'luxon';

export default ({ store }, inject) => {
  // Dispatch the setActiveUser action without payload
  store.dispatch('employee/setActiveUser');

  // Access Vuex getters from the store after dispatching the action
  const getActiveUser = () => store.getters['employee/GET_ACTIVE_USER'];

  // Inject a global function to calculate minDate
  const minDate = () => {
    const activeUser = getActiveUser();
    const hireDate = activeUser?.hireDate;
    return hireDate
      ? DateTime.fromISO(hireDate).toISODate()
      : DateTime.local(2024, 1, 1).toISODate();
  };

  // Inject functions into the app
  inject('minDate', minDate);
};
