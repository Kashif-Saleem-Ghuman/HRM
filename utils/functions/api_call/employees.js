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

export async function getEmployee(payload) {
  const { id } = payload
  
  try {
    const url = `/employees/${id}`
    const config = createConfig();
    
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (err) {
    if (err.response.status === 500) {
      alert("test")
      return this.$nuxt.error({ statusCode: 500, message: err.message })
    }
    this.$router.push('/not-found');
    window.open('/not-found')  }
}

export async function downloadEmployeeFile(payload) {
  const { employeeId, fileId } = payload
  
  try {
    const url = `/employees/${employeeId}/files/${fileId}/download`
    const config = createConfig();
    config.responseType = 'blob'
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (e) {
    console.error(e);
  }
}
export async function getEmployees() {
  try {
    const config = createConfig();
    const url = `/employees`
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (e) {
    console.error(e);
  }
}
