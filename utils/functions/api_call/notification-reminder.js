import { createConfig } from "./config";
import { hrmApiAxiosInstance } from "./hrm-api-axios-instance";
export async function clockInReminder({ employeeIds }) {
  try {
    const url = "/employees/reminders/clock-in";
    const employeeId = { employeeIds };
    const config = createConfig();
    const rejectLeaveVacationsAdmin = await hrmApiAxiosInstance.post(
      url,
      employeeId,
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
