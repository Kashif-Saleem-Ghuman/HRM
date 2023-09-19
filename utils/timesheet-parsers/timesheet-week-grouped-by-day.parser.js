import { forOwn } from "lodash";
import BaseTimesheetParser from "./base-timesheet-parser";
import { ACTIVITY_TYPE } from "../constant/Constant";

export default class TimesheetWeekGroupedByDayParser extends BaseTimesheetParser {
  parse() {
    const timesheets = this.timesheets.timesheets;
    const timeEntries = timesheets.reduce((acc, current) => ([...acc, ...current.timeEntries]), []);
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
        vacation: timeEntries.some( timeEntry => timeEntry.activity == ACTIVITY_TYPE.VACATION),
        leave: timeEntries.some( timeEntry => timeEntry.activity == ACTIVITY_TYPE.LEAVE)
      };
    });

    return { ...this.timesheets, weekData, total };
  }
}
