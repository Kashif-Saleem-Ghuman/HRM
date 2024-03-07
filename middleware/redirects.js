import { USER_ROLES } from "../utils/constant/Constant";
import { ADMIN_HOME_PATH, USER_HOME_PATH } from "../utils/constant/routes";

export default async function ({ route, redirect, store }) {
  const { path } = route;
  let userRole = localStorage.getItem("userRole");

  if (userRole) {
    userRole = store.state.token.isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER;
    localStorage.setItem("userRole", userRole);
  }
  if (path === "/") {
    if (userRole === USER_ROLES.ADMIN) {
      return redirect(ADMIN_HOME_PATH);
    } else if (userRole === USER_ROLES.USER) {
      return redirect(USER_HOME_PATH);
    }
  }
}
