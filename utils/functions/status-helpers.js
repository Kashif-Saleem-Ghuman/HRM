export const getLeaveStatusIcon = (status) => {
  const statusMap = {
    approved: "check-circle-solid",
    pending: "eye-open",
    rejected: "close",
  };
  return statusMap[status];
};
export const getStatusIconVariant = (status) => {
  const statusMap = {
    approved: "success",
    pending: "warning",
    rejected: "danger",
  };
  return statusMap[status];
};
export const getTextVariant = (status) => {
  const statusMap = {
    approved: "text-success",
    pending: "text-warning",
    rejected: "text-danger",
  };
  return statusMap[status];
};
export const getStatusLabel = (status) => {
  const statusMap = {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
  };
  return statusMap[status];
};
export const getLeaveStatusIconVariant = (type) => {
  const statusMap = {
    medical: "medical-clinic-solid",
    leave: "accessibility-cognitive-disability-Solid",
    vacation: "sun-solid",
  };
  return statusMap[type];
};
