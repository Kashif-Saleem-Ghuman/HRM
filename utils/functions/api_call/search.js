import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";

export async function search(payload) {
  const { search } = payload;

  if (!search) return [];

  try {
    const url = `/search`;
    const config = createConfig();
    config.params = { search };
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}
