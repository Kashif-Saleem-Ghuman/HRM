import {ACTIVITY_TYPE, TIME_ENTRY} from "@/utils/constant/Constant";
import {getTimeDiffInSeconds} from "@/utils/functions/common_functions";
import {DateTime} from "luxon";

function calculateBreakTotalChronometer(entries) {
  return entries.reduce((total, entry) => {
    if (entry.activity === ACTIVITY_TYPE.BREAK && entry.source === TIME_ENTRY.SOURCE_TIMER) {
      return total + getTimeDiffInSeconds(entry.start, entry.end ?? new Date());
    }
    return total;
  }, 0);
}
export function getChronometerDuration(todayTimeEntries) {
  const timeEntry = todayTimeEntries.find((entry) =>
    entry.activity === ACTIVITY_TYPE.IN && entry.source === TIME_ENTRY.SOURCE_TIMER
  );

  if (!timeEntry || timeEntry.source == TIME_ENTRY.SOURCE_MANUAL) {
    return 0;
  }

  const timerChronometer = getTimeDiffInSeconds(timeEntry.start, timeEntry.end ?? new Date());
  const breakChronometer = calculateBreakTotalChronometer(todayTimeEntries);

  return Math.max(0, timerChronometer - breakChronometer);
}

export function isDateToday(date) {
  return DateTime.fromISO(date).hasSame(DateTime.now(), 'day');
}
export const getInTimeEntry = (dailyTimeEntries) => {
  return dailyTimeEntries.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)
}
