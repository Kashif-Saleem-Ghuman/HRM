export default ({ app, store }, inject) => {
    const isActiveUser = (id) => {
      const activeUser = store.getters['employee/GET_ACTIVE_USER'];
      return activeUser.id !== id;
    };
    inject('isActiveUser', isActiveUser);
  };
  