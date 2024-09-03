// plugins/statusHelper.js

export const getStatusVariantName = (status) => getStatusMapValue(status, {
    approved: "success-light",
    pending: "warning-light",
    rejected: "danger-light",
    past_due: "primary",
    not_submitted:"primary",
  });
  
  export const getLeaveStatusIconName = (status) => getStatusMapValue(status, {
    approved: "tick",
    pending: "tick",
    rejected: "urgent",
    past_due: "arrowhead-right",
    not_submitted:"arrowhead-right"
  });
  
  export const getStatusLabelName = (status) => getStatusMapValue(status, {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    past_due: "Resubmit",
    not_submitted: "Submit",
  });
  function getStatusMapValue(status, statusMap, defaultValue) {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');
    return statusMap[normalizedStatus] || defaultValue;
  }
  
  export default (context, inject) => {
    inject('getStatusVariantName', getStatusVariantName);
    inject('getLeaveStatusIconName', getLeaveStatusIconName);
    inject('getStatusLabelName', getStatusLabelName);
  };
  