import { TIMESHEET_STATUSES } from "../constant/Constant";

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
    [TIMESHEET_STATUSES.REJECTED]: "chip-wrapper__bgabsentpin",
    [TIMESHEET_STATUSES.PAST_DUE]: "chip-wrapper__bgvacation",
    [TIMESHEET_STATUSES.NOT_SUBMITTED]: "chip-wrapper__bgvacation",
  };
  return variantStatusMapper[status] || "";
};
