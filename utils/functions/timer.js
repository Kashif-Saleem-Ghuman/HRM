import {ACTIVITY_TYPE, TIME_ENTRY} from "@/utils/constant/Constant";
import {getTimeDiffInSeconds} from "@/utils/functions/common_functions";
import {DateTime} from "luxon";
export function getChronometerDuration(todayTimeEntries) {
  let chronometer = 0;
  let timeEntry = todayTimeEntries.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)

  if(timeEntry && timeEntry?.isTimerEntry){
    chronometer = getTimeDiffInSeconds(timeEntry.start, timeEntry.end ?? new Date())
  }
  let breakEntries = todayTimeEntries?.filter((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.BREAK && timeEntry.source == TIME_ENTRY.SOURCE_TIMER);

  let breakTotalChronometer = 0;
  breakEntries?.map(entry => {
    if(entry.source === TIME_ENTRY.SOURCE_TIMER){
      breakTotalChronometer += getTimeDiffInSeconds(entry.start, entry.end ?? new Date());
    }
  })
  return breakTotalChronometer > chronometer ? chronometer : chronometer - breakTotalChronometer;
}

// export function getBreakTimerDuration(todayTimeEntries) {
//   let breakEntries = todayTimeEntries?.filter((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.BREAK && timeEntry.source == TIME_ENTRY.SOURCE_TIMER);
//
//   let breakTotalChronometer = 0;
//   breakEntries?.map(entry => {
//     if(entry.source === TIME_ENTRY.SOURCE_TIMER){
//       breakTotalChronometer += getTimeDiffInSeconds(entry.start, entry.end ?? new Date());
//     }
//   })
//   return breakTotalChronometer;
// }

export function isBreakTimerRunning(breakEntries) {
  const breakIndex = breakEntries.findIndex((entry) => entry.activity == 'break' && entry.start && !entry.end && entry.source === 'manual');
  return breakIndex != -1 ? true : false;
}

export function checkIsManualEntry(dailTimeEntries) {
  let timeEntry = dailTimeEntries.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)
  if(timeEntry && !timeEntry?.isTimerEntry){
    return true
  }
  return false;
}
export function isDateToday(date) {
  return DateTime.fromISO(date).hasSame(DateTime.now(), 'day');
}
export const getInTimeEntry = (dailyTimeEntries) => {
  return dailyTimeEntries.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)
}
