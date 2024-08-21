import {DateTime} from "luxon";
import {getTimeFromDate} from "@/utils/functions/dates";

export function formatTime(timeInSeconds, includeSeconds = true) {
  if (timeInSeconds <= 0) return includeSeconds ? "00:00:00" : "00:00"
  const hours = Math.floor(timeInSeconds / 3600);
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  if (!includeSeconds) return `${formattedHours}:${formattedMinutes}`;
  const seconds = timeInSeconds % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function calculateActivityDetails(currentTimerStart, timeEntries) {
  // by default, just consider the start time of the current timer
  let inTime = currentTimerStart
    ? new Date(currentTimerStart).toTimeString().split(' ')[0]
    : null;
  // there is no out time before there is a timeEntry record
  let outTime = null;

  const clockInTimeEntry = timeEntries?.find?.((t) => t.activity === 'in');

  let breaksSeconds = 0;
  let totalSeconds = 0;

  if (clockInTimeEntry) {
    // when there is a record in daily entries, override inTime
    // with starting time of the first record
    inTime = new Date(clockInTimeEntry.start)
      .toTimeString()
      .split(' ')
      [0];

    outTime = clockInTimeEntry.end && new Date(clockInTimeEntry.end)
      .toTimeString()
      .split(' ')
      [0];

    totalSeconds = Math.floor(
      (
        new Date(clockInTimeEntry.end).getTime()
        - new Date(clockInTimeEntry.start).getTime()
      ) / 1000
    );
  }

  const breaks = timeEntries.filter((t) => t.activity === 'break');

  for (let entry of breaks) {
    if (!entry.end) continue

    const start = getTimeFromDate(entry.start);
    const end = getTimeFromDate(entry.end);

    const startDateTime =DateTime.fromFormat(start, "HH:mm");
    const endDateTime = DateTime.fromFormat(end, "HH:mm");

    breaksSeconds += endDateTime.diff(startDateTime, "seconds").seconds;

  }

  totalSeconds -= breaksSeconds;


  return {
    in: inTime === null ? '--:--' : inTime.trim().slice(0, 5),
    out: outTime === null ? '--:--' : outTime.trim().slice(0, 5),
    breaks: formatTime(breaksSeconds, false),
    total: formatTime(totalSeconds, false),
  };
}
