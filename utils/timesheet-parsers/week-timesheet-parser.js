import { forOwn } from "lodash";
import BaseTimesheetParser from "./base-timesheet-parser";
export default class WeekTimesheetParser extends BaseTimesheetParser {
  parse() {
    const timesheet = this.timesheets[0];

    if (!timesheet) return [];

    const timeEntries = timesheet.timeEntries;
    const timeEntriesByDate = this.groupTimeEntriesByDate(timeEntries);
    const activityReports = [];
    let total = 0;

    // Generate activity report for each day
    forOwn(timeEntriesByDate, (timeEntries, date) => {
      const day = {};
      day.activityReport = this.generateActivityReport(timeEntries);
      day.date = date;
      total += this.getDayTotalWorkHours(timeEntries);
      activityReports.push(day);
    });

    return { ...timesheet, activityReports, total };
  }
}
