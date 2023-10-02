import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";

export async function updateEmployee(payload) {
  const { id, employee } = payload
  
  try {
    const url = `/employees/${id}`
    const config = createConfig();
    
    const { data } = await hrmApiAxiosInstance.put(
      url,
      { ...employee },
      config
    );
    return data
  } catch (e) {
    console.error(e);
  }
}