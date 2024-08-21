import { redirectToLogin } from "../utils/functions/api_call/auth";

export default async ({ store, $cookies }) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3TkpBUGRSNlJaemRHeU9YIiwic3ViZSI6ImNjY3Rlc3RAbWFpbGluYXRvci5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6InFMa3pQZHlQMGpXYlFyb3YiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJVU0VSIiwic3ViYyI6IkNhbmFkYSIsImVudiI6ImRldiIsImlhdCI6MTcyNDIzODUwNDkxNiwiZXhwIjoxNzMyMDE0NTA0OTE2LCJqdGkiOiJmMmEzZjI2Mi05MjcxLTQ2MTItOTI3Ni1lNWJmOTIzNWM3YTgifQ.tTW2jYLT0O7iOYnCBTpN-wSpx517-3YQ3LcdWkuTH94';

  if (!token) {
    return redirectToLogin();
  }

  localStorage.setItem("accessToken", token);
  store.dispatch("token/setToken", token);

  await store.dispatch("token/validateJwtToken", { token });
};
