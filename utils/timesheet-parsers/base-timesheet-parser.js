import { groupBy, keyBy } from "lodash";
import { DateTime } from "luxon";
import { getDateDiffInMinutes, getDateDiffInSeconds, getTimeFromDate} from "../functions/dates";
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
      const nowInHourMin = DateTime.now().toUTC().toISO();
      total = timeEntryOut ? getDateDiffInSeconds(timeEntriesIn?.[0]?.start, timeEntriesIn?.[0]?.end) : getDateDiffInSeconds(timeEntriesIn?.[0]?.start, nowInHourMin);

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
      total: total / 60,
      timeEntryIn: timeEntriesIn,
      timeEntryBreak: timeEntriesBreak,
      isTimeEntryCompleted: Boolean(timeEntryIn && timeEntryOut)
    };

    return activityReport;
  };

  getTotalBreakTime = (timeEntries) => {
    return timeEntries?.reduce((total, entry) => {
      if (entry.end && entry.start) {
        total += getDateDiffInSeconds(
          entry.start,
          entry.end
        );
      }
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
    const timeEntryTotal = timeEntries
      .filter(t => t.activity === 'in' && t.start && t.end)
      .reduce((total, t) => total + getDateDiffInSeconds(t.start, t.end), 0);


    const breakEntryTotal = timeEntries
      .filter(t => t.activity === 'break' && t.start && t.end)
      .reduce((total, t) => total + getDateDiffInSeconds(t.start, t.end), 0);


    return Math.max(timeEntryTotal - breakEntryTotal, 0);
  }
}
