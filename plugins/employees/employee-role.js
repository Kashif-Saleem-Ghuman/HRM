import { USER_ROLES } from "../../utils/constant/Constant";

export default ({ app }, inject) => {
  inject('isAdmin', () => {
    return app.store.state.token.isAdmin;
  });

  inject('isUser', () => {
    return app.store.state.token.isUser;
  });

  inject('isManager', () => {
    return app.store.state.token.isManager;
  });

  inject('isAdminOrManager', () => {
    return app.store.state.token.isAdmin || app.store.state.token.isManager;
  });


  inject('isAccountAdmin', () => {
    return app.store.state.token.hrmRole === USER_ROLES.ADMIN;
  });

  inject('isAccountManager', () => {
    return app.store.state.token.hrmRole === USER_ROLES.MANAGER;
  });
};