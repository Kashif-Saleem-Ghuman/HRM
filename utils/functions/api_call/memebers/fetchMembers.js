import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";

export async function fetchMembers() {
  const url = `/employees`;
  const config = createConfig();
  const { data } = await hrmApiAxiosInstance.get(url, config);
  return data;
}
