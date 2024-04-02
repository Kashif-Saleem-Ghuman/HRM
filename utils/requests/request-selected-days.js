import { DateTime } from "luxon";

export function generateRequestSelectedDays(startDate, endDate, isHalfday) {
  console.log(isHalfday, "isHalfdayyyyyyyyyyyyyyy")
  let selectedDays = {};

  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  for (
    let currentDay = start;
    currentDay <= end;
    currentDay = currentDay.plus({ days: 1 })
  ) {
    const isWeekend = currentDay.weekday >= 6;
    let value = isWeekend ? 0 : 1;
    
    if (isHalfday) {
      value = 0.5; 
    }

    selectedDays[currentDay.toISODate()] = value;
  }

  return selectedDays;
}
