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
  
  let inTime = currentTimerStart
    ? new Date(currentTimerStart).toISOString().substring(11, 16)
    : null;

  let outTime = null;
  let totalSeconds = 0;
  let breaksSeconds = 0;

  const clockInTimeEntry = timeEntries?.find((t) => t.activity === 'in');
  if (clockInTimeEntry && clockInTimeEntry.end) {
    inTime = new Date(clockInTimeEntry.start).toISOString().substring(11, 16);
    outTime = new Date(clockInTimeEntry.end).toISOString().substring(11, 16);

    totalSeconds = (new Date(clockInTimeEntry.end).getTime() - new Date(clockInTimeEntry.start).getTime()) / 1000;
  }

  const breaks = timeEntries.filter((t) => t.activity === 'break');
  
  for (let entry of breaks) {
    if (entry.end) {
      breaksSeconds += (new Date(entry.end).getTime() - new Date(entry.start).getTime()) / 1000;
    }
  }

  totalSeconds -= breaksSeconds;


  return {
    in: inTime || '--:--',
    out: outTime || '--:--',
    breaks: formatTime(breaksSeconds, false),
    total: formatTime(totalSeconds, false),
  };
}