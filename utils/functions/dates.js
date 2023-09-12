import { DateTime } from "luxon";

export const formatIsoDateToYYYYMMDD = (date) => {
  return DateTime.fromISO(date).toFormat("yyyy-MM-dd");
};

export const getWeekStartEndDates = (dateIso) => {
  const date = DateTime.fromISO(dateIso);
  const from = date.minus({ days: date.weekday % 7 });
  const to = from.plus({ days: 6 });
  return { from: from.toISO(), to: to.toISO() };
};

export const isDateOnSunday = (date) => {
  return DateTime.fromISO(date).weekday == 7;
};
