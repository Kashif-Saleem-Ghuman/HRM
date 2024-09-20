import { USER_ROLES } from "../utils/constant/Constant";
import { ADMIN_HOME_PATH, USER_HOME_PATH } from "../utils/constant/routes";

export default async function ({ route, redirect, store, app }) {
  const { path } = route;
  let userRole = localStorage.getItem("userRole");
  await app.$isThemeCheck();

  if (!userRole) {
    userRole = store.state.token.isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER;
    localStorage.setItem("userRole", userRole);
  }

  if (path === "/") {
    // Use route.path instead of this.$router.currentRoute.path
    if (path !== ADMIN_HOME_PATH && (userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.USER)) {
      return redirect(ADMIN_HOME_PATH);
    } else if (path !== USER_HOME_PATH && userRole === USER_ROLES.USER) {
      return redirect(USER_HOME_PATH);
    }
  }
}
