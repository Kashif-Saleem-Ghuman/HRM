import { TIMESHEET_STATUSES } from "../../../utils/constant/Constant";

export function Timesheet(timesheet) {
  for (let key in timesheet) {
    this[key] = timesheet[key];
  }

  this.isLocked = () => {
    return this.status === TIMESHEET_STATUSES.APPROVED
  }
}