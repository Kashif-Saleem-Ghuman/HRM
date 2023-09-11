import { groupBy, keyBy } from "lodash";
import { DateTime } from "luxon";

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
      groupedByWeekDay[DateTime.fromJSDate(new Date(date)).weekday] = groupedByDate[date];
    }
    return groupedByWeekDay;
  }
  generateActivityReport = (timeEntries) => {
    const timeEntriesByActivity = keyBy(timeEntries, "activity");

    const timeEntryIn = timeEntriesByActivity.in?.start
      ? this.getTimeFromDate(timeEntriesByActivity.in.start)
      : null;

    const timeEntryOut = timeEntriesByActivity.in?.end
      ? this.getTimeFromDate(timeEntriesByActivity.in.end)
      : null;

    const timeEntryBreak = timeEntriesByActivity.break?.start
      ? this.getDateDiffInMinutes(
          timeEntriesByActivity.break.start,
          timeEntriesByActivity.break.end
        )
      : null;

    let total = 0;

    if (timeEntriesByActivity.in?.start && timeEntriesByActivity.in?.end) {
      total = this.getDateDiffInMinutes(
        timeEntriesByActivity.in?.start,
        timeEntriesByActivity.in?.end
      );
    }

    const activityReport = {
      in: timeEntryIn,
      out: timeEntryOut,
      break: timeEntryBreak,
      total,
    };

    return activityReport;
  };

  generateActivityReportFromTimer = (timers, timeEntries) => {
    const timer = timers[0] ?? {};
    const timeEntriesByActivity = keyBy(timeEntries, "activity");
    const timeEntryIn = timer?.start ? this.getTimeFromDate(timer.start) : null;

    const timeEntryOut = null;
    const timeEntryBreak = timeEntriesByActivity.break?.start
      ? this.getDateDiffInMinutes(
          timeEntriesByActivity.break.start,
          timeEntriesByActivity.break.end
        )
      : null;

    let total = this.getDateDiffInMinutes(timer.start, DateTime.now().toISO());

    const activityReport = {
      in: timeEntryIn,
      out: timeEntryOut,
      break: timeEntryBreak,
      total,
    };

    return activityReport;
  };

  getDayTotalWorkHours(timeEntries = []) {
    const timeEntry = timeEntries.find(
      (timeEntry) => timeEntry.activity == "in"
    );
    return timeEntry?.total ?? 0;
  }

  getTimeFromDate = (date) => {
    return DateTime.fromISO(date).toFormat("HH:mm");
  };

  getDateDiffInMinutes = (start, end) => {
    if (!start || !end) return null;

    const startDate = DateTime.fromISO(start);
    const endDate = DateTime.fromISO(end);
    const diff = endDate.diff(startDate, "minutes");
    const { minutes } = diff.toObject();
    return minutes;
  };
}
