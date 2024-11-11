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
}export async function submitTimesheetReminder({ timesheetIds }) {
  try {
    const url = "/employees/reminders/submit-timesheet";
    const payload = { timesheetIds: [timesheetIds] };
    const config = createConfig();
    const rejectLeaveVacationsAdmin = await hrmApiAxiosInstance.post(
      url,
      payload,
      config
    );
    this.$openPopupNotification({
      text: "A reminder for timesheet submission has been successfully sent to the employee.",
      variant: "primary-24"
    });
    this.requestListApproveData = rejectLeaveVacationsAdmin.data.requests;
  } catch (e) {
    throw new Error(e.response?.data?.message);
  }
}

export async function submitPastDueTimesheetReminder(timesheetId, payload) {
  console.log('$submitPastDueTimesheetReminder==', timesheetId, payload);
  try {
    const url = `/employees/reminder/submit-timesheets/past-due/${timesheetId}`;
    const config = createConfig();
    const pastDueTimesheet = await hrmApiAxiosInstance.post(
      url,
      payload,
      config
    );
    return pastDueTimesheet;

  } catch (e) {
    throw new Error(e.response?.data?.message);
  }
}
