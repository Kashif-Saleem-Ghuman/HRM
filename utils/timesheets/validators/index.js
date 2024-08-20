import { DateTime } from "luxon";
import {
  calculateTimeDifferenceInMinutes,
  isEndTimeOnSameDay,
} from "../../functions/time";
import { getTimeFromDate, addDayToDate } from "../../functions/dates";

export function validateInEntryWithExistingBreak({
  timeEntryBreak,
  timeEntryIn,
}) {
  if (!timeEntryBreak) return true;
  const breakEntry = timeEntryBreak;

  const breakEntryStartTime = DateTime.fromISO(breakEntry.start).toJSDate();
  const breakEntryEndTime = DateTime.fromISO(breakEntry.end).toJSDate();

  const inEntryStartTime = DateTime.fromISO(timeEntryIn.start).toJSDate();
  let inEntryEndTime = DateTime.fromISO(timeEntryIn.end).toJSDate();

  if (
    !isEndTimeOnSameDay(
      getTimeFromDate(timeEntryIn.start),
      getTimeFromDate(timeEntryIn.end)
    )
  ) {
    inEntryEndTime = addDayToDate(inEntryEndTime);
  }

  const isBreakAfterInEntry =
    breakEntryStartTime >= inEntryStartTime &&
    breakEntryEndTime <= inEntryEndTime;

  if (!isBreakAfterInEntry) {
    return false;
  }
  return true;
}

const startAndEndTimePresent = ({ start, end }) => {
  return start && end;
};

const isTotalNegative = (total) => {
  return total < 0;
};

const isEndDateGreatherThanNow = ({ start, end, date }) => {
  const [hours, minutes, seconds] = end.split(":").map(Number);

  let dateTime = DateTime.fromJSDate(date).set({
    hours,
    minutes,
    seconds,
  });

  if (!isEndTimeOnSameDay(start, end)) {
    dateTime = dateTime.plus({ day: 1 });
  }

  dateTime = dateTime.toJSDate();

  const now = new Date();
  return dateTime > now;
};

export const validateEntry = ({
  start,
  end,
  date,
  timeEntryIn,
  timeEntryBreak,
}) => {
  const totalInMinutes = calculateTimeDifferenceInMinutes(start, end);
  const errors = [];
  if (!startAndEndTimePresent({ start, end })) {
    errors.push("start and end time not present");
  }

  if (isTotalNegative(totalInMinutes)) {
    errors.push("total is negative");
  }

  if (isEndDateGreatherThanNow({ start, end, date })) {
    errors.push("end date is greater than now");
  }

  if (!validateInEntryWithExistingBreak({ timeEntryIn, timeEntryBreak })) {
    errors.push("in entry is not within break entry");
  }

  return { valid: errors.length == 0, errors };
};