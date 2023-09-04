import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";

export async function getTimeAttendance() {
  this.loading = true;
  try {
    const config = createConfig();
    const timeAttendance = await hrmApiAxiosInstance.get(
      "/timesheets/admin/attendance?date=" + this.getCurrentDate,
      config
    );
    this.localData = timeAttendance.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}

export async function getTimesheet() {
  try {
    const config = createConfig();
    config.params = {
      from: this.getformToDate?.from,
      to: this.getformToDate?.to,
    };
    const timesheetData = await hrmApiAxiosInstance.get(
      "/widgets/admin/timesheet/",
      config
    );

    this.timesheetData = timesheetData.data;
  } catch (e) {
    alert(e);
  }
}

export async function getTimeAttendanceDaily(date) {
  this.loading = true;
  try {
    const config = createConfig();
    config.params = {
      from: date,
      to: date,
      employeeId: this.id,
    };
    const timeAttendance = await hrmApiAxiosInstance.get(
      "/timesheets/daily?date=",
      config
    );
    this.todayData = timeAttendance.data;
    return timeAttendance.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getTimeAttendanceWeek({ from, to }) {
  try {
    const config = createConfig();
    config.params = { from, to };
    const { data } = await hrmApiAxiosInstance.get(
      "/timesheets/weekly",
      config
    );
    return data?.timesheets || [];
  } catch {}
}

export async function getTimeAttendanceMonth() {
  try {
    const config = createConfig();
    config.params = {
      from: this.getformToDate?.from,
      to: this.getformToDate?.to,
    };
    const timeAttendance = await hrmApiAxiosInstance.get(
      "/timesheets/month?date=",
      config
    );
    this.MonthViewData = timeAttendance.data;
  } catch (e) {
    alert(e);
  }
}

export async function getTimesheets({ from, to }) {
  try {
    const url = "/timesheets";
    const config = createConfig();
    config.params = { from, to };
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data?.timesheets || [];
  } catch (error) {
    console.error(`Error while fetching timesheets from ${url}`);
    console.error(error);
  }
}
