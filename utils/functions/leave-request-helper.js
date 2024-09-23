import { isUtcStartOfDay } from "./dates";
import { DateTime } from "luxon";
import { DATETIME_FORMAT } from "./datetime-input";

export function formatLeaveDate(isoDate) {
  if (!isUtcStartOfDay(isoDate)) {
    return DateTime.fromJSDate(new Date(isoDate)).toFormat(DATETIME_FORMAT);
  }

  return DateTime.fromISO(isoDate, { zone: "utc" }).toFormat(DATETIME_FORMAT);
}
