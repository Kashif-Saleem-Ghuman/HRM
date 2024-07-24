import { redirectToLogin } from "../utils/functions/api_call/auth";

export default async ({ store, $cookies }) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1cG1XWmRQTlAweWFLZ1JsIiwic3ViZSI6ImFhYXRlc3RAbWFpbGluYXRvci5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6InFMa3pQZHlQMGpXYlFyb3YiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJBRE1JTiIsInN1YmMiOiJDYW5hZGEiLCJlbnYiOiJkZXYiLCJpYXQiOjE3MjE4MDI5NTMxNTcsImV4cCI6MTcyOTU3ODk1MzE1NywianRpIjoiNmZkYTE3YTctNTUyYS00YmJmLThkMjQtMDk0MTM0ZTI1MGJlIn0.vtxegdbj2ugruAINMk5uhPGX_O_LckKKc6REsgVFp6w'

  if (!token) {
    return redirectToLogin();
  }

  localStorage.setItem("accessToken", token);
  store.dispatch("token/setToken", token);

  await store.dispatch("token/validateJwtToken", { token });
};
