import { isUtcStartOfDay } from "./dates";
import { DateTime } from "luxon";
import { DATETIME_FORMAT } from "./datetime-input";

export function formatLeaveDate(isoDate, format = DATETIME_FORMAT) {
  if (!isUtcStartOfDay(isoDate)) {
    return DateTime.fromJSDate(new Date(isoDate)).toFormat(format);
  }

  return DateTime.fromISO(isoDate, { zone: "utc" }).toFormat(format);
}
