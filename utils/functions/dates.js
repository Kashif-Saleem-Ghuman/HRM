import { DateTime } from "luxon";

export const formatIsoDateToYYYYMMDD = (date) => {
  return DateTime.fromISO(date).toUTC().toFormat("yyyy-MM-dd");
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

export const getTimeFromDate = (date) => {
  return DateTime.fromISO(date).toFormat("HH:mm");
};

export const getDateDiffInMinutes = (start, end) => {
  if (!start || !end) return null;

  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);
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