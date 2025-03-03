import { DateTime } from "luxon";

export const DATETIME_FORMAT = "dd-MMM-yyyy";

export const DATEPICKER_FORMAT = "yyyy-MM-dd";

function parseDate(dateString, format) {
  return DateTime.fromFormat(dateString, format).toJSDate();
}

function formatDate(dateObj, format) {
  return DateTime.fromJSDate(dateObj).toFormat(format);
}

export function getDatetimeCommonProps() {
  return {
    format: DATETIME_FORMAT,
    parseDate,
    formatDate,
  };
}
