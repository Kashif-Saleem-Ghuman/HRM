// plugins/statusHelper.js

export const getStatusVariantName = (status) => getStatusMapValue(status, {
    approved: "success-light",
    pending: "warning-light",
    rejected: "danger-light",
    past_due: "primary-24",
    not_submitted:"primary-24",
  });
  
  export const getLeaveStatusIconName = (status) => getStatusMapValue(status, {
    approved: "tick",
    pending: "tick",
    rejected: "urgent",
    past_due: "arrowhead-right",
    not_submitted:"arrowhead-right"
  });
  
  export const getStatusLabelName = (status, isDone=false) => {
    if (isDone) return "Done";
    
    return getStatusMapValue(status, {
      approved: "Approved",
      pending: "Pending",
      rejected: "Rejected",
      past_due: "Submit",
      not_submitted: "Submit",
    });
  }
  function getStatusMapValue(status, statusMap, defaultValue) {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');
    return statusMap[normalizedStatus] || defaultValue;
  }
  
  export default (context, inject) => {
    inject('getStatusVariantName', getStatusVariantName);
    inject('getLeaveStatusIconName', getLeaveStatusIconName);
    inject('getStatusLabelName', getStatusLabelName);
  };
  