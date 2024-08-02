import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
import { LEAVE_NOTIFICATIN_MESSAGE } from "../functions_lib";
export async function clockInReminder({ requestIds }) {
  console.log(requestIds, "requestIds");
  try {
    const url = "/employees/reminders/clock-in";
    const requestId = { requestIds };
    const config = createConfig();
    const rejectLeaveVacationsAdmin = await hrmApiAxiosInstance.post(
      url,
      requestId,
      config
    );
    this.openPopupNotification(LEAVE_NOTIFICATIN_MESSAGE.rejected);
    this.requestListApproveData = rejectLeaveVacationsAdmin.data.requests;
  } catch (e) {
    console.log(e);
  }
}
export async function submitTimesheetReminder({ requestIds }) {
  try {
    const url = "/employees/reminders/submit-timesheet";
    const requestId = { requestIds };
    const config = createConfig();
    const rejectLeaveVacationsAdmin = await hrmApiAxiosInstance.post(
      url,
      requestId,
      config
    );
    this.openPopupNotification(LEAVE_NOTIFICATIN_MESSAGE.rejected);
    this.requestListApproveData = rejectLeaveVacationsAdmin.data.requests;
  } catch (e) {
    console.log(e);
  }
}
