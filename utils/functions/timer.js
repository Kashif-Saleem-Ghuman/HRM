import {
  ACTIVITY_TYPE,
  TIME_ENTRY_SOURCE,
} from "@/utils/constant/Constant";
import { TimeEntry } from "@/components/common/models/time_entry";
import {getTimeDiffInSeconds} from "@/utils/functions/common_functions";
import {DateTime} from "luxon";

function calculateBreakTotalChronometer(entries) {
  return entries.reduce((total, entry) => {
    if (entry.isActivityBreak() && entry.isSourceTimer()) {
      return total + getTimeDiffInSeconds(entry.getStart(), entry.getEnd());
    }
    return total;
  }, 0);
}
export function getChronometerDuration(todayTimeEntries) {
  const timeEntries = todayTimeEntries?.map(timeEntry => new TimeEntry(timeEntry));

  const inTimeEntry = timeEntries.find( (entry) => entry.isActivityIn() && entry.isSourceTimer() );

  if (!inTimeEntry || inTimeEntry.isSourceManual()) {
    return 0;
  }

  const timerChronometer = getTimeDiffInSeconds(inTimeEntry.getStart(), inTimeEntry.getEnd());
  const breakChronometer = calculateBreakTotalChronometer(timeEntries);

  return Math.max(0, timerChronometer - breakChronometer);
}

export function isDateToday(date) {
  return DateTime.fromISO(date).hasSame(DateTime.now(), 'day');
}
export const getInTimeEntry = (dailyTimeEntries) => {
  return dailyTimeEntries.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)
}
