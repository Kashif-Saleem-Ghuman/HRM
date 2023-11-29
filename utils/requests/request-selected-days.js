import { DateTime } from "luxon";

export function generateRequestSelectedDays(startDate, endDate) {
  let selectedDays = {};

  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  for (
    let currentDay = start;
    currentDay <= end;
    currentDay = currentDay.plus({ days: 1 })
  ) {
    const isWeekend = currentDay.weekday >= 6;

    selectedDays[currentDay.toISODate()] = !isWeekend;
  }

  return selectedDays;
}
