import { DateTime } from "luxon"

export const formatIsoDateToYYYYMMDD = (date) => {
  return DateTime.fromISO(date).toFormat("yyyy-MM-dd")
}