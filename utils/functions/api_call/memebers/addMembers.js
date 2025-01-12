import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";

export async function addMembers(payPlanId, memberIds) {
  const url = `pay-plans/${payPlanId}/assign`;
  const config = createConfig();
  // Convert string IDs to numbers if they're not already
  const numericMemberIds = memberIds.map(id => Number(id));
  
  const payload = {
    employeeIds: numericMemberIds
  };
  
  const { data } = await hrmApiAxiosInstance.put(url, payload, config);
  return data;
}
