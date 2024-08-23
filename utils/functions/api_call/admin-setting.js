import {createConfig} from "@/utils/functions/api_call/config";
import {hrmApiAxiosInstance} from "@/utils/functions/api_call/hrm-api-axios-instance";


export async function getTimesheetSetting(organizationId) {

  try {
    const url = `/organizations/${organizationId}/timesheet-settings`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateTimesheetSetting(organizationId, payload) {
  try {
    const url = `/organizations/${organizationId}/timesheet-settings`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.put(
      url,
      payload,
      config
    );
    return data;
  } catch (e) {
    throw e;
  }
}

