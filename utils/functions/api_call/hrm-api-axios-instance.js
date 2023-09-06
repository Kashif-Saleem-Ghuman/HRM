import axios from 'axios'

export const hrmApiAxiosInstance = axios.create({
  baseURL:  process.env.API_URL
});
