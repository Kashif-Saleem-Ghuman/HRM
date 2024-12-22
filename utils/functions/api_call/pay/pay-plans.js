import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";

export async function getPayPlans() {
  try {
    const url = `/pay-plans`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data.payPlans;
  } catch (e) {
    throw e;
  }
}

export async function getPayPlanById(id) {
  try {
    const url = `/pay-plans/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function createPayPlan(body) {
  try {
    console.log("pay plan -- in API", body);
    const url = `/pay-plans`;
    const config = createConfig();  
    const { data } = await hrmApiAxiosInstance.post(url, body, config);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updatePayPlan(id, body) {
  try {
    const url = `/pay-plans/${id}`;
    const config = createConfig();  
    const { data } = await hrmApiAxiosInstance.put(url, body, config);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deletePayPlan(id) {
  try {
    const url = `/pay-plans/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.delete(url, config);
    return data;
  } catch (e) {
    throw e;
  }
}
