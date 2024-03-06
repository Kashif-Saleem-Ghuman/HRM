import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
export async function onLeaveEmployees({date}) {
  if (!date) {
    throw new Error("date is required for fetching on leave employess");
  }
  try {
    const config = createConfig();
    config.params = {date}
    const onLeaveData = await hrmApiAxiosInstance.get(
      "/dashboard/admin/approved-leave-count",
      config
    );
      return onLeaveData.data
  } catch (e) {
    console.error(e);
  }
}