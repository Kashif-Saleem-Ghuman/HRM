import { redirectToLogin } from "../utils/functions/api_call/auth";

export default async ({ store, $cookies }) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQeTdMRGR3cE9xMWUxWUtYIiwic3ViZSI6ImNoYXJhbi5wYWxAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJBRE1JTiIsInN1YmMiOiJBbWVyaWNhbiBTYW1vYSIsImVudiI6ImRldiIsImlhdCI6MTcyMDUxNTkzNzYwMywiZXhwIjoxNzI4MjkxOTM3NjAzLCJqdGkiOiI1MmVkMmFkOS01NTA2LTQ4MmQtOWMyYy1mOGEwMjk5YTk5OTIifQ.obaF6YrGG-YeHp0jFzs4CnAuH2OdPGRwzkd0w0FL3gg'

  if (!token) {
    return redirectToLogin();
  }

  localStorage.setItem("accessToken", token);
  store.dispatch("token/setToken", token);

  await store.dispatch("token/validateJwtToken", { token });
};
