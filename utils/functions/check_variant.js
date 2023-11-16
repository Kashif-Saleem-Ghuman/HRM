export const getStatusIcon = (status) => {
  if (status == "approved") {
    return "check-circle-solid";
  }
  if (status == "pending") {
    return "eye-open";
  }
  if (status == "rejected") {
    return "close";
  }
};
export const getStatusIconVariant = (status) => {
  if (status == "approved") {
    return "success";
  }
  if (status == "pending") {
    return "warning";
  }
  if (status == "rejected") {
    return "danger";
  }
};
export const getTextVariant = (status) => {
  if (status == "approved") {
    return "text-success";
  }
  if (status == "pending") {
    return "text-warning";
  }
  if (status == "rejected") {
    return "text-danger";
  }
};
export const getStatusLabel = (status) => {
  if (status == "approved") {
    return "Approved";
  }
  if (status == "pending") {
    return "pending";
  }
  if (status == "rejected") {
    return "Rejected";
  }
};
export const getLeaveTypeIcon = (type) => {
  if (type == "medical") {
    return "medical-clinic-solid";
  }
  if (type == "leave") {
    return "accessibility-cognitive-disability-Solid";
  }
  if (type == "vacation") {
    return "sun-solid";
  }
};
