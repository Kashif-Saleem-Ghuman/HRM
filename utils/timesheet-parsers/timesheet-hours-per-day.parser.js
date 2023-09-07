import { forOwn } from "lodash";
import BaseTimesheetParser from "./base-timesheet-parser";

export default class TimesheetHoursPerDayParser extends BaseTimesheetParser {
  parse() {
    const timesheet = this.timesheets;

    const timeEntries = timesheet.timeEntries;
    const timeEntriesByDate = this.groupTimeEntriesByDate(timeEntries);
    const dailyTimeEntries = {};
    let total = 0;

    forOwn(timeEntriesByDate, (timeEntries, date) => {
      const day = {};
      day.date = date;
      const totalHours = this.getDayTotalWorkHours(timeEntries);
      total += totalHours;
      dailyTimeEntries[date] = {
        timeEntries,
        totalHours,
      };
    });

    return { ...timesheet, dailyTimeEntries, total };
  }
}
