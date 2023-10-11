import { WEEK_DAY } from "@/utils/constant/Constant.js";
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
        WEEK_DAY[DateTime.fromISO(date).weekday].value.substring(0, 3)
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
