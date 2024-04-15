import { groupBy, keyBy } from "lodash";
import { DateTime } from "luxon";
import { getDateDiffInMinutes, getTimeFromDate } from "../functions/dates";
import { sumBy } from "lodash";
import { formatHoursToHHMM } from "../functions/time";
export default class BaseTimesheetParser {
  constructor(timesheets = []) {
    this.timesheets = timesheets;
  }

  parse() {
    throw new Error('Method "parse" should be implemented in subclasses');
  }

  groupTimeEntriesByDate = (timeEntries = []) => {
    return groupBy(timeEntries, (timeEntry) =>
      DateTime.fromISO(timeEntry.start).toFormat("yyyy-MM-dd")
    );
  };

  groupTimeEntriesByWeekDay = (timeEntries = []) => {
    const groupedByDate = this.groupTimeEntriesByDate(timeEntries);
    const groupedByWeekDay = {};
    for (let date in groupedByDate) {
      groupedByWeekDay[DateTime.fromISO(date).weekday] = groupedByDate[date];
    }
    return groupedByWeekDay;
  }
  generateActivityReport = (timeEntries) => {
    const timeEntriesByActivity = keyBy(timeEntries, "activity");

    const timeEntryIn = timeEntriesByActivity.in?.start
      ? getTimeFromDate(timeEntriesByActivity.in.start)
      : null;

    const timeEntryOut = timeEntriesByActivity.in?.end
      ? getTimeFromDate(timeEntriesByActivity.in.end)
      : null;

    const timeEntryBreak = timeEntriesByActivity.break?.start
      ? getDateDiffInMinutes(
          getTimeFromDate(timeEntriesByActivity.break.start),
          getTimeFromDate(timeEntriesByActivity.break.end)
        )
      : null;

    let total = 0;

    if (timeEntriesByActivity.in?.start && timeEntriesByActivity.in?.end) {
      total = getDateDiffInMinutes(
          getTimeFromDate(timeEntriesByActivity.in?.start),
          getTimeFromDate(timeEntriesByActivity.in?.end)
      );

      if ( timeEntryBreak ) {
        total -= timeEntryBreak
      }
    }

    const activityReport = {
      in: timeEntryIn,
      out: timeEntryOut,
      break: timeEntryBreak && timeEntryBreak > 0 ?  formatHoursToHHMM(timeEntryBreak / 60) : "00:00",
      total,
    };

    return activityReport;
  };

  generateActivityReportFromTimer = (timers, timeEntries) => {
    const timer = timers[0] ?? {};
    const timeEntriesByActivity = keyBy(timeEntries, "activity");
    const timeEntryIn = timer?.start ? getTimeFromDate(timer.start) : null;

    const timeEntryOut = null;
    const timeEntryBreak = timeEntriesByActivity.break?.start
      ? getDateDiffInMinutes(
          timeEntriesByActivity.break.start,
          timeEntriesByActivity.break.end
        )
      : null;

    let total = getDateDiffInMinutes(timer.start, DateTime.now().toISO());

    const activityReport = {
      in: timeEntryIn,
      out: timeEntryOut,
      break: timeEntryBreak,
      total,
    };

    return activityReport;
  };

  getDayTotalWorkHours(timeEntries = []) {
    const timeEntriesInSum = sumBy(timeEntries.filter( t => t.activity == 'in'), 'total') ?? 0
    const timeEntriesBreakSum = sumBy(timeEntries.filter( t => t.activity == 'break'), 'total') ?? 0
    return timeEntriesInSum > timeEntriesBreakSum ? timeEntriesInSum - timeEntriesBreakSum : 0
  }
}
