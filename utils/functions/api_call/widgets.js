import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";

export async function getAdminAttendanceWidget() {
  try {
    const url = `/widgets/admin/attendance`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getAdminTimesheetsWidget() {
  try {
    const url = `/widgets/admin/timesheet`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}
