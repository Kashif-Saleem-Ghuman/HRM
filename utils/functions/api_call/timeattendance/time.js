import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
import { DateTime } from "luxon"
import{ TIMESHEET_NOTIFICATIN_MESSAGE} from "@/utils/constant/Notifications"

export async function getTimeAttendance(payload) {

  try {
    const url = `/timesheets/admin/daily`
    const config = createConfig();
    config.params = payload;
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (e) {
    throw e;
    // console.error(e);
  }
}

export async function getAdminTimesheets(payload) {
  const { from, to, status } = payload
  const url = '/timesheets/admin/'
  if (!from || !to ) throw new Error(`'from' and 'to' params required for ${url}`)

  try {
    const config = createConfig();
    const params = {
      from,
      to, 
      status
    }
    config.params = params
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (e) {
    console.error(e);
  }
}

export async function getPendingTimesheets(payload) {
  const { from, to, searchString } = payload
  const url = '/timesheets/admin/pending'
  if (!from || !to ) throw new Error(`'from' and 'to' params required for ${url}`)

  try {
    const config = createConfig();
    const params = {
      from,
      to, 
      searchString
    }
    config.params = params
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (e) {
    throw e;
  }
}

export async function approveTimesheets({ timesheetIds }) {
  const ids = {timesheetIds}
  try {
    const url = '/timesheets/admin/approve'
    const config = createConfig()
    await hrmApiAxiosInstance.post(
        url,
        ids,
        config
    );
    this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.approved);
  } catch (e) {
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
}

export async function pastDueBatchApproveTimesheets(request) {
  try {
    const url = '/timesheets/admin/batch-approve/past-due'
    const config = createConfig()
    await hrmApiAxiosInstance.post(
      url,
      request,
      config
    );
    this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.approved);
  } catch (e) {
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
}
export async function rejectTimesheets({ timesheetIds }) {
  const ids = {timesheetIds};
  try {
    const url = '/timesheets/admin/reject'
    const config = createConfig()
    await hrmApiAxiosInstance.post(
        url,
        ids,
        config
    );
    this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);

  } catch (e) {
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
}

export async function pastDueBatchRejectTimesheets(request) {
  try {
    const url = '/timesheets/admin/batch-reject/past-due'
    const config = createConfig()
    await hrmApiAxiosInstance.post(
      url,
      request,
      config
    );
    this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);

  } catch (e) {
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
}


export async function getPastDueTimesheets(payload) {
  const { from, to, searchString } = payload
  const url = '/timesheets/admin/past-due'
  if (!from || !to ) throw new Error(`'from' and 'to' params required for ${url}`)

  try {
    const config = createConfig();
    const params = {
      from,
      to,
      searchString
    }
    config.params = params
    const { data } = await hrmApiAxiosInstance.get(
      url,
      config
    );
    return data
  } catch (e) {
    throw e;
  }
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
    console.log(e);
  }
}


export async function getAdminTimesheetWidget({ from, to }) {
  try {
    const config = createConfig();
    config.params = {
      from,
      to,
    };
    const timesheetData = await hrmApiAxiosInstance.get(
      "/widgets/admin/timesheet/",
      config
    );
      return timesheetData.data
  } catch (e) {
    console.error(e);
  }
}

export async function getAdminCelebrationWidget() {
  try {
    const config = createConfig();
    const celebration = await hrmApiAxiosInstance.get(
      "/widgets/admin/celebration/",
      config
    );
      return celebration.data
  } catch (e) {
    console.error(e);
  }
}


export async function getUserTimesheetWidget() {
  try {
    const config = createConfig();
    config.params = {
      from: DateTime.now().startOf('year').toISO(),
      to: DateTime.now().toISO()
    };
    const widget = await hrmApiAxiosInstance.get(
      "/widgets/timesheet/",
      config
    );

    return widget?.data
  } catch (e) {
    console.error(e);
  }
}

export async function getTimeAttendanceDaily(date) {
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
    console.log(e);
  }
}

export async function getTimeAttendanceCustomRange({ from, to, searchString }) {
  try {
    const config = createConfig();
    config.params = { from, to, searchString };
    const { data } = await hrmApiAxiosInstance.get(
      "/timesheets/admin",
      config
    );
    return data || [];
  } catch (error) {
    throw error;
  }
}

export async function getTimesheets({ from, to, employeeId }) {
  try {
    const url = "/timesheets";
    const config = createConfig();
    config.params = { from, to };
    if (employeeId) config.params.employeeId = employeeId;
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data?.timesheets || [];
  } catch (error) {
    throw error;
  }
}

export async function getWeekTimesheets({ from, to, employeeId }) {
  try {
    const url = "/timesheets/week";
    const config = createConfig();
    config.params = { from, to };
    if (employeeId) config.params.employeeId = employeeId;
    const { data } = await hrmApiAxiosInstance.get(url, config);
    return data?.timesheets || [];
  } catch (error) {
    throw error;
  }
}

export async function approveTimesheet({ id }) {
  try {
    const url = `/timesheets/admin/approve/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.post(url, {}, config);
    return data
  } catch (error) {
    console.error(error);
  }
}

export async function approvePastDueTimesheet({ id, date, employeeId }) {
  try {
    const url = `/timesheets/admin/approve/past-due/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.post(url, { date, employeeId }, config);
    return data
  } catch (error) {
    console.error(error);
  }
}
export async function rejectPastDueTimesheet({ id, date, employeeId, refusalReason }) {
  try {
    const url = `/timesheets/admin/reject/past-due/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.post(url, { date, employeeId, refusalReason }, config);
    return data
  } catch (error) {
    console.error(error);
  }
}

export async function getAdminWidget() {
  try {
    const config = createConfig();
    const celebration = await hrmApiAxiosInstance.get(
      "widgets/admin/count",
      config
    );
      return celebration.data
  } catch (e) {
    console.error(e);
  }
}

export async function rejectTimesheet({ id, refusalReason}) {
  try {
    const url = `/timesheets/admin/reject/${id}`;
    const config = createConfig();
    const { data } = await hrmApiAxiosInstance.post(url, {refusalReason}, config);
    return data
  } catch (error) {
    // console.error(error);
  }
}

