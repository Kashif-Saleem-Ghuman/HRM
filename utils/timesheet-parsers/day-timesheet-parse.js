import BaseTimesheetParser from "./base-timesheet-parser";

export default class DayTimesheetParser extends BaseTimesheetParser {
  parse() {
    // naming hack here, BaseTimesheetParser takes timesheets as arguments, we could change it for "data"
    const employee = this.timesheets;
    const { timeEntries, timers } = employee;

    let activityReport;

    if (timers?.length) {
      activityReport = this.generateActivityReportFromTimer(
        timers,
        timeEntries
      );
    } else {
      activityReport = this.generateActivityReport(timeEntries);
    }
    return activityReport;
  }
}
