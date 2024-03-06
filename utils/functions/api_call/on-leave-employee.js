import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
export async function getOnLeaveEmployeeByDate({ date }) {
  if (!date) {
    throw new Error("date is required for fetching on leave employess");
  }
  try {
    const url = `/api-path-goes-here`;
    const config = createConfig();
    config.params = {
      date,
    };
    const { data } = await hrmApiAxiosInstance.get(url, config);

    return data;
  } catch (e) {
    console.error(e);
  }
}