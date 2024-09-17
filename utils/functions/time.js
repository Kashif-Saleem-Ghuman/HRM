import { DateTime, Duration } from "luxon";
import {DATETIME_FORMAT} from "@/utils/functions/datetime-input";

export const formatHoursToHHMM = (hours) => {
  if (!hours === null || hours === undefined) {
    hours = 0;
  }
  // return Duration.fromObject({ minutes: hours * 60 }).toFormat("hh:mm");
  
  // added new changes to fix the minus value isSecureContext
  // const duration = Duration.fromObject({ minutes: Math.abs(hours * 60) }); 
  // const sign = hours < 0 ? "-" : ""; 
  // return `${sign}${duration.toFormat("hh:mm")}`;
  // const duration = Duration.fromObject({ minutes: Math.abs(hours * 60) }); 
  const minutes = Math.round(hours * 60);
  const duration = Duration.fromObject({ minutes: Math.abs(minutes) });
  const formattedDuration = duration.toFormat("hh:mm");
  
  if (hours < 0) {
    return "00:00"; // Return 0 for negative hours
  } else {
    return formattedDuration;
  }

};

export function getDateTimeFormat(date) {
  const dateFormat = DateTime.fromISO(date);
  return dateFormat.toFormat(DATETIME_FORMAT) + ' @ ' + dateFormat.toFormat('HH:mm');
}
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

export function isTimeFormat(time) {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}
