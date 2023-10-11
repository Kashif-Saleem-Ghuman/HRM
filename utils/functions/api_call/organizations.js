import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";

export async function updateOrganization(payload) {
  const { id, organization } = payload
  
  try {
    const url = `/organizations/${id}`
    const config = createConfig();
    
    const { data } = await hrmApiAxiosInstance.put(
      url,
      { ...organization },
      config
    );
    return data
  } catch (e) {
    console.error(e);
  }
}

export async function getOrganization(payload) {
  const { id } = payload
  
  try {
    const url = `/organizations/${id}`
    const config = createConfig();
    console.log('getting organization ....');
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    
    console.log({ data });
    return data
  } catch (e) {
    console.error(e);
  }
}