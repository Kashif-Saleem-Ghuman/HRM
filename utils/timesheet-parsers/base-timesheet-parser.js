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
      timeEntry.date
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
    const timeEntriesIn = timeEntries?.filter(
      (entry) => entry.activity === "in"
    );
    const timeEntriesBreak = timeEntries?.filter(
      (entry) => entry.activity === "break"
    );

    const timeEntryIn = timeEntriesIn?.[0]?.start
      ? getTimeFromDate(timeEntriesIn?.[0]?.start)
      : null;

    const timeEntryOut = timeEntriesIn?.[0]?.end
      ? getTimeFromDate(timeEntriesIn?.[0]?.end)
      : null;

    const totalBreakTime = this.getTotalBreakTime(timeEntriesBreak);

    let total = 0;

    if(timeEntryIn) {
      const nowInHourMin = getTimeFromDate(DateTime.now());
      total = timeEntryOut ? getDateDiffInMinutes(timeEntryIn, timeEntryOut) : getDateDiffInMinutes(timeEntryIn, nowInHourMin);

      if (totalBreakTime) {
        total -= totalBreakTime;
      }
    } 

    const activityReport = {
      in: timeEntryIn,
      out: timeEntryOut,
      break:
        totalBreakTime && totalBreakTime > 0
          ? formatHoursToHHMM(totalBreakTime / 60)
          : "00:00",
      total,
      timeEntryIn: timeEntriesIn,
      timeEntryBreak: timeEntriesBreak,
    };

    return activityReport;
  };

  getTotalBreakTime = (timeEntries) => {
    return timeEntries?.reduce((total, entry) => {
      total += getDateDiffInMinutes(
        getTimeFromDate(entry.start),
        getTimeFromDate(entry.end)
      );
      return total;
    }, 0);
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
    const timeEntriesInSum = timeEntries.find( t => t.activity == 'in')?.total ?? 0;
    const timeEntriesBreakSum = sumBy(timeEntries.filter( t => t.activity == 'break'), 'total') ?? 0
    return timeEntriesInSum > timeEntriesBreakSum ? timeEntriesInSum - timeEntriesBreakSum : 0
  }
}
