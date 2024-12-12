import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";

export async function getPayMethods() {
  try {
    const url = `/pay-methods`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data.payMethods;
  } catch (e) {
    throw e;
    // console.error(e);
  }
}
