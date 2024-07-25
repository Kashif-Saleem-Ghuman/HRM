// plugins/statusHelper.js

export const getStatusVariantName = (status) => getStatusMapValue(status, {
    approved: "success-light",
    pending: "warning-light",
    rejected: "danger-light",
  });
  
  export const getLeaveStatusIconName = (status) => getStatusMapValue(status, {
    approved: "tick",
    pending: "tick",
    rejected: "urgent",
  });
  
  export const getStatusLabelName = (status) => getStatusMapValue(status, {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
  });
  
  export const getAttendanceStatusVariantName = (status) => getStatusMapValue(status, {
    present: "success-light",
    shiftend: "warning-light",
    absent: "danger-light",
    onleave: "danger-light",
  }, "warning-light");
  
  export const getAttendanceLeaveStatusIconName = (status) => getStatusMapValue(status, {
    present: "tick",
    shiftend: "tick",
    absent: "urgent",
    onleave: "urgent",
  }, "tick");
  
  function getStatusMapValue(status, statusMap, defaultValue) {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');
    return statusMap[normalizedStatus] || defaultValue;
  }
  
  export default (context, inject) => {
    inject('getStatusVariantName', getStatusVariantName);
    inject('getLeaveStatusIconName', getLeaveStatusIconName);
    inject('getStatusLabelName', getStatusLabelName);
    inject('getAttendanceStatusVariantName', getAttendanceStatusVariantName);
    inject('getAttendanceLeaveStatusIconName', getAttendanceLeaveStatusIconName);
  };
  