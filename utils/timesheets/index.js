import {DateTime} from "luxon";

export function shouldShowReminderIcon(reminderSentDate) {
  if(!reminderSentDate) return true;

  const now = DateTime.now();
  const date = DateTime.fromISO(reminderSentDate);

  const differenceInHours = now.diff(date, 'hours').hours;
  return differenceInHours > 24;
}
