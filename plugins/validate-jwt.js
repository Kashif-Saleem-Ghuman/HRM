import { redirectToLogin } from "../utils/functions/api_call/auth";

export default async ({ store, $cookies }) => {
  let token = $cookies.get(process.env.SSO_COOKIE_NAME);

  if (!token) {
    return redirectToLogin();
  }

  localStorage.setItem("accessToken", token);
  store.dispatch("token/setToken", token);

  await store.dispatch("token/validateJwtToken", { token });
};
