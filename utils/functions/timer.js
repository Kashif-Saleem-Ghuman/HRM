import {ACTIVITY_TYPE} from "@/utils/constant/Constant";
import {getTimeDiffInSeconds} from "@/utils/functions/common_functions";
import {DateTime} from "luxon";
export function getChronometerDuration(todayTimeEntries) {
  let chronometer = 0;
  let timeEntry = todayTimeEntries.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)
  if(timeEntry && timeEntry?.isTimerEntry){
    chronometer = getTimeDiffInSeconds(timeEntry.start, timeEntry.end)
  }
  return chronometer;
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
