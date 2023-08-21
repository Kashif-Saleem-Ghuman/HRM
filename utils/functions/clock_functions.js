export function formatTime(timeInSeconds, includeSeconds = true) {
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

  const timeEntriesLength = timeEntries?.length;

  if(timeEntriesLength) {
    // when there is a record in daily entries, override inTime
    // with starting time of the first record
    inTime = new Date(timeEntries[0].start)
      .toTimeString()
      .split(' ')
      [0];

    // when there is a record in daily entries, outTime is the
    // ending time of the last record
    outTime = new Date(timeEntries[timeEntriesLength - 1].end)
      .toTimeString()
      .split(' ')
      [0];
  }

  let breaksSeconds = 0;
  let totalSeconds = 0;

  for (let i = 1; i < timeEntriesLength; i++) {
    totalSeconds += Math.floor(
      (
        new Date(timeEntries[i].end).getTime()
        - new Date(timeEntries[i].start).getTime()
      ) / 1000
    );
    if (i > 0) breaksSeconds += Math.floor(
      (
        new Date(timeEntries[i].start).getTime()
        - new Date(timeEntries[i - 1].end).getTime()
      ) / 1000
    );
  }

  return {
    in: inTime === null ? '--:--' : inTime.trim().slice(0, 5),
    out: inTime === null ? '--:--' : outTime.trim().slice(0, 5),
    breaks: formatTime(breaksSeconds, false),
    total: formatTime(totalSeconds, false),
  };
}