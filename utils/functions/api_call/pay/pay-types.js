import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";

export async function getPayTypes() {
  try {
    const url = `/pay-types`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data.payTypes;
  } catch (e) {
    throw e;
  }
}

export async function createPayType(body) {
  try {
    const url = `/pay-types`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.post(url, body, config);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updatePayType(id, body) {
  try {
    const url = `/pay-types/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.put(url, body, config);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deletePayType(id) {
  try {
    const url = `/pay-types/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.delete(url, config);
    return data;
  } catch (e) {
    throw e;
  }
}
