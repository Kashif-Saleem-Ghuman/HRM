import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
export async function onLeaveEmployees({date}) {
  try {
    const config = createConfig();
    config.params = {date}
    const timesheetData = await hrmApiAxiosInstance.get(
      "/dashboard/admin/approved-leave-count",
      config
    );
      return timesheetData.data
  } catch (e) {
    console.error(e);
  }
}