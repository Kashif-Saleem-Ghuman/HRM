import BaseTimesheetParser from "./base-timesheet-parser";

export default class DayTimesheetParser extends BaseTimesheetParser {
  parse() {
    // naming hack here, BaseTimesheetParser takes timesheets as arguments, we could change it for "data"
    const employee = this.timesheets;
    const { timeEntries, timers } = employee;
    
    if (timers?.length) {
      employee.activityReport = this.generateActivityReportFromTimer(
        timers,
        timeEntries
      );
    } else {
      employee.activityReport = this.generateActivityReport(timeEntries);
    }
    
    return employee
  }
}
