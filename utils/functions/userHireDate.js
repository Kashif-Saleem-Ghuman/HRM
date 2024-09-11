export async function fetchUser(store, id) {
    let activeUser = null;
  
    if (id) {
      await store.dispatch('employee/setUser', id);
      activeUser = store.getters['employee/GET_USER'];
    } else {
      await store.dispatch('employee/setActiveUser');
      activeUser = store.getters['employee/GET_ACTIVE_USER'];
    }
    return activeUser;
  }
  