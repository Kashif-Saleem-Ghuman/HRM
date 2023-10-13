import { WEEK_DAYS_START_MONDAY } from "@/utils/constant/Constant.js";
import { forOwn } from "lodash";
import { DateTime } from "luxon";
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

      timesheet[
        WEEK_DAYS_START_MONDAY[DateTime.fromISO(date).weekday - 1 ].substring(0, 3)
      ] = totalHours

      dailyTimeEntries[date] = {
        timeEntries,
        totalHours,
      };
    });
    timesheet.total = total
    return { ...timesheet, dailyTimeEntries, total };
  }
}
