import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
export async function getEmployeeLeaveSettings(employeeId) {
  try {
    const url = `/leave-settings/employee`;
    const config = createConfig();
    config.params = { employeeId };

    const { data } = await hrmApiAxiosInstance.get(url, config);

    return data;
  } catch (error) {
    console.error("Error fetching employee leave settings:", error);
    throw error;
  }
}

export async function updateEmployeeLeaveSettings(id, payload) {
  try {
    const url = `/leave-settings/${id}`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.put(url, payload, config);
    
    return data;
  } catch (error) {
    console.error("Error updating employee leave settings:", error);
    throw error;
  }
}
