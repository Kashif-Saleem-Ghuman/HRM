import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";

export async function createRequest(payload) {
  const { request } = payload
  
  try {
    const url = `/requests`
    const config = createConfig();
    
    const { data } = await hrmApiAxiosInstance.post(
      url,
      { ...request },
      config
    );
    return data
  } catch (e) {
    console.error(e);
  }
}


export async function rejectRequest(payload) {
  const { id, request } = payload;

  try {
    const url = `requests/admin/${id}/reject`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.put(url, { ...request }, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}

