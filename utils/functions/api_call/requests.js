import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
import { generateRequestSelectedDays } from "../../requests/request-selected-days";
import { DateTime } from "luxon";
import { LEAVE_NOTIFICATIN_MESSAGE } from '../functions_lib'
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
export async function multipleRejectRequest({ requestIds }) {
  try {
    const url = '/requests/admin/batch-reject'
    const requestId = {requestIds}
    const config = createConfig()
    const rejectLeaveVacationsAdmin = await hrmApiAxiosInstance.put(
     url,
     requestId,
     config
    );
    this.$nuxt.$emit("pending-key");
    this.openPopupNotification(LEAVE_NOTIFICATIN_MESSAGE.rejected);
    this.requestListApproveData = rejectLeaveVacationsAdmin.data.requests;
  } catch (e) {
    this.openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
}

export async function rejectLeaveRequest(payload) {
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
