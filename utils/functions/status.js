import { TIMESHEET_STATUSES } from "../constant/Constant";


export const getStatusLabel = (status, isDone=false) => {
  if (isDone) return "Done";
  
  const statusLabel = {
    [TIMESHEET_STATUSES.APPROVED]: "Approved",
    [TIMESHEET_STATUSES.PENDING]: "Pending",
    [TIMESHEET_STATUSES.REJECTED]: "Rejected",
    [TIMESHEET_STATUSES.PAST_DUE]: "Past Due",
    [TIMESHEET_STATUSES.NOT_SUBMITTED]: "Not Submitted",
  };
  return statusLabel[status] || "";
}
export const getStatusIcon = (status) => {
  const iconStatusMapper = {
    [TIMESHEET_STATUSES.APPROVED]: "check-all",
    [TIMESHEET_STATUSES.PENDING]: "warning",
    [TIMESHEET_STATUSES.REJECTED]: "urgent-solid",
    [TIMESHEET_STATUSES.PAST_DUE]: "help",
    [TIMESHEET_STATUSES.NOT_SUBMITTED]: "help",
  };
  return iconStatusMapper[status] || "";
};

export const getStatusVariant = (status) => {
  const variantStatusMapper = {
    [TIMESHEET_STATUSES.APPROVED]: "chip-wrapper__bgsucess",
    [TIMESHEET_STATUSES.PENDING]: "chip-wrapper__bgabsent",
    [TIMESHEET_STATUSES.REJECTED]: "chip-wrapper__bgrejected",
    [TIMESHEET_STATUSES.PAST_DUE]: "chip-wrapper__bgpastdue",
    [TIMESHEET_STATUSES.NOT_SUBMITTED]: "chip-wrapper__bgnotsubmitted",
  };
  return variantStatusMapper[status] || "";
};
