import { forOwn } from "lodash";
import BaseTimesheetParser from "./base-timesheet-parser";

export default class TimesheetWeekGroupedByDayParser extends BaseTimesheetParser {
  parse() {
    const timesheets = this.timesheets.timesheets;
    const isTimesheetArray = this.isTimesheetArray(timesheets);
    const timeEntries = isTimesheetArray ? timesheets.reduce((acc, current) => ([...acc, ...current.timeEntries]), []) : timesheets?.timeEntries;
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
    const timesheetData = isTimesheetArray ? this.timesheets : timesheets;
    return { ...timesheetData, weekData, total };
  }
  isTimesheetArray(timesheet) {
    return Array.isArray(timesheet);
  }
}
