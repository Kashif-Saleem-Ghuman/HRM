export const getAttendanceLabelName = (status) => {
  const [baseStatus, dynamicPart] = status.split(" - ");
  const baseLabel = getStatusMapValue(
    baseStatus,
    {
      present: "Present",
      shiftend: "Shift End",
      absent: "Absent",
      onleave: "On Leave",
      online: "Online",
      offline: "Offline",
    },
    "Unknown"
  );

  return dynamicPart ? `${baseLabel} - ${dynamicPart}` : baseLabel;
};

export const getAttendanceStatusVariantName = (status) => {
  const [baseStatus] = status.split(" - ");
  return getStatusMapValue(
    baseStatus,
    {
      present: "success-light",
      online: "success-light",
      offline: "default-light",
      shiftend: "warning-light",
      absent: "danger-light",
      onleave: "warning-light",
    },
    "default-light"
  );
};

export const getAttendanceLeaveStatusIconName = (status) => {
  const [baseStatus] = status.split(" - ");
  return getStatusMapValue(
    baseStatus,
    {
      present: "tick",
      online: "tick",
      shiftend: "tick",
      absent: "urgent",
      onleave: "urgent",
      offline:"urgent"
    },
    "tick"
  );
};

export const getAttendanceStatus = (data) => {
  const timers = data.timers ?? [];
  const inEntry = data.activityReport?.in;
  const outEntry = data.activityReport?.out;
  const leaveRequest =
    data.requests && data.requests.length > 0 ? data.requests[0].type : null;

  if (leaveRequest) {
    return `On Leave - ${
      leaveRequest.charAt(0).toUpperCase() + leaveRequest.slice(1)
    }`;
  }

  if (timers.length > 0 || inEntry) {
    return "Present";
  }
  if(data.presence === "in"){
    return "Online";
  }
  if(data.presence === "out" && data.currentLeaveType === null){
    return "Offline";
  }
  if(data.currentLeaveType !=null){
    return `On Leave - ${capitalizeFirstLetter(data.currentLeaveType)}`;
  }
  return "Absent";
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getStatusMapValue(status, statusMap, defaultValue) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");
  return statusMap[normalizedStatus] || defaultValue;
}

export default (context, inject) => {
  inject("getAttendanceLabelName", getAttendanceLabelName);
  inject("getAttendanceStatusVariantName", getAttendanceStatusVariantName);
  inject("getAttendanceLeaveStatusIconName", getAttendanceLeaveStatusIconName);
  inject("getAttendanceStatus", getAttendanceStatus);
};
