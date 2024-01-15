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
export const getLeaveTypeIconVariant = (status) => {
  const statusMap = {
    approved: "success",
    pending: "gray3",
    rejected: "white",
  };
  return statusMap[status];
};
export const getLeaveTypeClassName = (status) => {
  const statusMap = {
    approved: "text-success bg-success-sub6",
    pending: "text-warning bg-warning",
    rejected: "text-danger bg-danger",
    other:"text-warning bg-warning"
  };
  return statusMap[status];
};
export const getLeaveStatusIconVariant = (type) => {
  const statusMap = {
    medical: "medical-clinic-solid",
    leave: "accessibility-cognitive-disability-Solid",
    vacation: "sun-solid",
    other:'add'
  };
  return statusMap[type];
};
export const getFileExtension = (icon) => {
  const statusMap = {
    pdf: "pdf",
    jpg: "jpg",
    jpeg: "jpg",
    webp: "jpg",
    png: "png",
    docx: "docx",
    doc: "docx",
    csv:'excel',
    xls:'excel',
    xlsx:'excel',
    ppt:'powerpoint',
  };
  return statusMap[icon];
};
