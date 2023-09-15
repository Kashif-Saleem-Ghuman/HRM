import { DateTime, Duration} from "luxon"

export const formatHoursToHHMM = (hours) => {
  if (!hours === null || hours === undefined) {
    hours = 0;
  } 
 
  return Duration.fromObject({ minutes: hours * 60 }).toFormat("hh:mm")
}