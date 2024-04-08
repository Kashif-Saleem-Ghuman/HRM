import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
import { generateRequestSelectedDays } from "../../requests/request-selected-days";
import { DateTime } from "luxon";

export async function createRequest(payload) {
  const { request } = payload;

  try {
    const url = `/requests`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.post(
      url,
      { ...request },
      config
    );
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function rejectRequest(payload) {
  const { id, request } = payload;

  try {
    const url = `requests/admin/${id}/reject`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.put(url, { ...request }, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}
export async function editRequest(payload) {
  const { id } = payload;
  var data = payload;
  let startDate = new Date(data.start).toISOString();
  const isoStartDate = DateTime.fromISO(startDate)
    .startOf("day")
    .toUTC()
    .toISO();
  let endDate = new Date(data.end).toISOString();
  const isoEndDate = DateTime.fromISO(endDate).endOf("day").toUTC().toISO();
  this.addForm.start = isoStartDate;
  this.addForm.end = isoEndDate;
  let isHalfday = this.isHalfday;
  this.addForm.selectedDays = generateRequestSelectedDays(
    startDate,
    endDate,
    isHalfday
  );
  const request = this.addForm;
  try {
    const url = `requests/${id}`;
    const config = createConfig();

    const { data } = await hrmApiAxiosInstance.put(url, { ...request }, config);
    return data;
  } catch (e) {
    console.error(e);
  }
}
