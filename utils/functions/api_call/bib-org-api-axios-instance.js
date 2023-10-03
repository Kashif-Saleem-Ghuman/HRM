import axios from "axios";

export const bibOrgApiAxiosInstance = axios.create({
  baseURL: process.env.ORG_API_ENDPOINT,
});
