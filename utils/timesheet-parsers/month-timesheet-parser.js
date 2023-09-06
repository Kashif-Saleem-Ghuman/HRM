import { forOwn } from "lodash";
import BaseTimesheetParser from "./base-timesheet-parser";

export default class MonthTimesheetParser extends BaseTimesheetParser {
  parse() {
    this.timesheets.forEach((timesheet) => {
      const timeEntries = timesheet.timeEntries;
      const timeEntriesByDate = this.groupTimeEntriesByDate(timeEntries);
      let total = 0;
      const hoursPerDay = [];

      // generate total hours per day
      forOwn(timeEntriesByDate, (dayTimeEntries, date) => {
        const day = {};
        const totalHours = this.getDayTotalWorkHours(dayTimeEntries);
        day.totalHours = totalHours;
        total += totalHours;
        hoursPerDay.push({ date, ...day, total });
      });

      timesheet.hoursPerDay = hoursPerDay;
    });

    return this.timesheets;
  }
}
