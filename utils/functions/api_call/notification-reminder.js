import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
import { LEAVE_NOTIFICATIN_MESSAGE } from "../functions_lib";
export async function clockInReminder({ requestIds }) {
  try {
    const url = "/employees/reminders/clock-in";
    const requestId = { requestIds };
    const config = createConfig();
    const rejectLeaveVacationsAdmin = await hrmApiAxiosInstance.post(
      url,
      requestId,
      config
    );
    this.$openPopupNotification({
      text: "A reminder for Clock-in has been successfully sent to the employee.",
      variant: "primary-24"
    });
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
    this.$openPopupNotification({
      text: "A reminder for timesheet submission has been successfully sent to the employee.",
      variant: "primary-24"
    });
    this.requestListApproveData = rejectLeaveVacationsAdmin.data.requests;
  } catch (e) {
    console.log(e);
  }
}
