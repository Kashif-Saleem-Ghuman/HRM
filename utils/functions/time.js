import { DateTime, Duration } from "luxon";

export const formatHoursToHHMM = (hours) => {
  if (!hours === null || hours === undefined) {
    hours = 0;
  }

  return Duration.fromObject({ minutes: hours * 60 }).toFormat("hh:mm");
};

export function calculateTimeDifferenceInMinutes(startTime, endTime) {
  const startDateTime = DateTime.fromFormat(startTime, "HH:mm");
  const endDateTime = DateTime.fromFormat(endTime, "HH:mm");

  const duration = endDateTime.diff(startDateTime, "minutes");

  const minutesDifference = Math.abs(duration.minutes);

  return minutesDifference;
}

export function calculateTimeDifferenceInHHMM(startTime, endTime) {
  const startDateTime = DateTime.fromFormat(startTime, "HH:mm");
  let endDateTime = DateTime.fromFormat(endTime, "HH:mm");

  if (endDateTime < startDateTime) {
    endDateTime = endDateTime.plus({ days: 1 });
  }

  const duration = endDateTime.diff(startDateTime);

  const { hours, minutes } = duration.shiftTo("hours", "minutes");

  const formattedDifference = `${padWithZero(hours)}:${padWithZero(minutes)}`;

  return formattedDifference;
}

export function padWithZero(number) {
  return number.toString().padStart(2, "0");
}

export function isEndTimeOnSameDay(startTime, endTime) {
  const startDateTime = DateTime.fromFormat(startTime, "HH:mm").toJSDate()
  const endDateTime = DateTime.fromFormat(endTime, "HH:mm").toJSDate()

  return endDateTime > startDateTime
}
