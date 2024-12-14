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

export async function getPayMethodById(id) {
  try {
    const url = `/pay-methods/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data;
  } catch (e) {
    throw e;
    // console.error(e);
  }
}


export async function createPayMethod(body) {
  try {
    const url = `/pay-methods`;
    const config = createConfig(); // Assuming this adds headers or tokens
    const { data } = await hrmApiAxiosInstance.post(url, body, config);
    return data;
  } catch (e) {
    throw e;
  }
}



