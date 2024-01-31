import axios from "axios"
const bibAuthApiAxiosInstance = axios.create({
  baseURL: process.env.USER_AUTH_API_ENDPOINT,
});

export async function validateToken({ token }) {
  try {
    const url = ``;
    const { data } = await bibAuthApiAxiosInstance.post(url, { ssojwt: token });
    return data?.u
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function redirectToLogin() {
  window.location.href = process.env.AUTH_REDIRECT_URL + process.env.HRM_APP_URL
}