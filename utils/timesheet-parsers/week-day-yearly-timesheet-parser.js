import { forOwn } from "lodash";
import BaseTimesheetParser from "./base-timesheet-parser";

export default class WeekDayYearlyTimesheetParser extends BaseTimesheetParser {
  parse() {
    const timesheet = this.timesheets;
    const timeEntries = timesheet?.timeEntries;
    const timeEntriesByWeek = this.groupTimeEntriesByWeekDay(timeEntries);
    const weekData = {};
    let total = 0;

    forOwn(timeEntriesByWeek, (timeEntries, date) => {
      const day = {};
      day.date = date;
      const totalHours = this.getDayTotalWorkHours(timeEntries);
      total += totalHours;
      weekData[date] = {
        timeEntries,
        totalHours,
      };
    });

    return { ...this.timesheets, weekData, total };
  }
}
