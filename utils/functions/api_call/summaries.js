import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
export async function getSummaryByDate({ date }) {
  if (!date) {
    throw new Error("date is required for fetching summary");
  }
  try {
    const url = `/summaries`;
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
export async function createSummary(summary) {
  try {
    const url = `/summaries`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.post(url, summary, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateSummary({ id, ...summary }) {
  try {
    const url = `/summaries/${id}`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.put(url, summary, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}
