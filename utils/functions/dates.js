import { DateTime } from "luxon";

//

export const formatIsoDateToYYYYMMDD = (date) => {
  return DateTime.fromISO(date).toUTC().toFormat("dd-MMM-yyyy");
};

export const getWeekStartEndDates = (dateIso) => {
  const date = DateTime.fromISO(dateIso);
  const from = date.minus({ days: date.weekday % 7 });
  const to = from.plus({ days: 6 });
  return { from: from.toISO(), to: to.toISO() };
};

/**
 * @typedef { Object } DateRange
 * @property { Date } from
 * @property { Date } to
 */

/**
 * @param { DateRange } param
 * @returns { DateRange }
 */
export const weekToUTCWeek = ({ from, to }) => {
  let utcFrom = DateTime.fromJSDate(from).toUTC().startOf("day");
  if (utcFrom.weekday === 6) utcFrom = utcFrom.plus({ days: 1 });

  let utcTo = DateTime.fromJSDate(to).toUTC().endOf("day");
  if (utcTo.weekday == 7) utcTo = utcTo.minus({ days: 1 });
  return { from: utcFrom.toJSDate(), to: utcTo.toJSDate() };
};

export const isDateOnSunday = (date) => {
  return DateTime.fromISO(date).weekday == 7;
};

export const getTimeFromDate = (date) => {
  return DateTime.fromISO(date).toFormat("HH:mm");
};

export const getDateDiffInMinutes = (start, end) => {
  if (!start || !end) return null;

  const startDate = DateTime.fromFormat(start, "HH:mm");
  let endDate = DateTime.fromFormat(end, "HH:mm");
  
  if (endDate < startDate) {
    endDate = endDate.plus({ days: 1 });
  }

  const diff = endDate.diff(startDate, "minutes");
  const { minutes } = diff.toObject();
  return minutes;
};

export const getDateDiffInHHMM = (start, end) => {
  if (!start || !end) return null;

  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);
  return endDate.diff(startDate, ["hour", "minute"]).toFormat("hh:mm");
}

export const parseInputTimeIntoArray = (timeInput) => {
  const [hours, minutes] = timeInput.trim().split(/\s*:\s*/).map(Number);
  if (
    (hours || hours === 0)
    && (minutes || minutes === 0)
    && hours < 24
    && hours >= 0
    && minutes < 60
    && minutes >=0
    && hours === Math.floor(hours)
    && minutes === Math.floor(minutes)
  ) {
    return [hours, minutes];
  }
  throw new Error('Invalid Input');
}

export const numberToClockDigits = (number) => {
  return `${number < 10 ? '0' : ''}${number}`
}

export const hoursAndMinutesToJSDate = (hours, minutes, date) => {
  return new Date(
    new Date(
      new Date(date).setHours(hours)
    ).setMinutes(minutes)
  );
}

export function isDateInRange(dateToCheck, startDate, endDate) {
  const luxonDateToCheck = DateTime.fromISO(dateToCheck);
  const luxonStartDate = DateTime.fromJSDate(startDate);
  const luxonEndDate = DateTime.fromJSDate(endDate);

  return luxonDateToCheck >= luxonStartDate && luxonDateToCheck <= luxonEndDate;
}

export function startOfDayEndOfDayRange({ startDate, endDate }) {
  const from = DateTime.fromISO(startDate).toUTC().startOf('day').toJSDate()
  const to = DateTime.fromISO(endDate).toUTC().endOf('day').toJSDate()
  return { from, to }
}

export function isSameDate(date1, date2) {
  const luxonDate1 = typeof date1 === "string" ? DateTime.fromISO(date1) : DateTime.fromJSDate(date1);
  const luxonDate2 = typeof date2 === "string" ? DateTime.fromISO(date2) : DateTime.fromJSDate(date2);

  const isSame =  (
    luxonDate1.year === luxonDate2.year &&
    luxonDate1.month === luxonDate2.month &&
    luxonDate1.day === luxonDate2.day
  );

  return isSame
}

export function isToday(date) {
  return isSameDate(date, new Date())
}