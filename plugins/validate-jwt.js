import { redirectToLogin } from "../utils/functions/api_call/auth";

export default async ({ store, $cookies }) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQeTdMRGR3cE9xMWUxWUtYIiwic3ViZSI6ImNoYXJhbi5wYWxAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJBRE1JTiIsInN1YmMiOiJVbml0ZWQgU3RhdGVzIiwiZW52IjoiZGV2IiwiaWF0IjoxNzEwODIwMDU0NzI3LCJleHAiOjE3MTg1OTYwNTQ3MjcsImp0aSI6ImE5NTJmMmIzLWRmZTAtNDE3Mi1hN2Y2LWM1YWE3MzAwMjEwNSJ9.RUAr6U5r6g8FyNcwHM43IquzxYya0ee4r_eL4xVI7ig';

  if (!token) {
    return redirectToLogin();
  }

  localStorage.setItem("accessToken", token);
  store.dispatch("token/setToken", token);

  await store.dispatch("token/validateJwtToken", { token });
};
