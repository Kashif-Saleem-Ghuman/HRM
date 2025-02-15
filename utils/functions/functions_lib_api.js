import {
  addFiles,
  getFiles,
  deleteFiles,
  } from "./api_call/myprofile";
  import {
    employeeTime,
  } from "./api_call/timeapi";
  import {
    getTimeAttendance,
    getTimesheet,
    getTimeAttendanceDaily,
    getTimeAttendanceCustomRange,
  } from "./api_call/timeattendance/time";
  import {
    startTimer,
    stopTimer,
  } from "./api_call/timeattendance/timer";
  import {
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
  } from "./api_call/timeattendance/time-entires";
  import {
    submitTimesheet,
  } from "./api_call/timeattendance/timesheets";
  import {
    getPendingLeaveVacationsAdmin,
    multiApproveLeaveRequests,
    approveLeaveRequest
  } from "./api_call/leavesvacations/requestadmin";
  import {
    addLeaveVacations,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
  } from "./api_call/leavesvacations/requestuser";
  import {
    multipleRejectRequest,
    rejectLeaveRequest,
  } from "./api_call/requests";
  export {
    employeeTime,

    // leave vacations admin functions
    getPendingLeaveVacationsAdmin,
    multiApproveLeaveRequests,
    approveLeaveRequest,
    multipleRejectRequest,
    rejectLeaveRequest,
    // leave vacations user functions
    addLeaveVacations,
    deleteLevaeVacation,
    getUserLeavesDetailUser,

    // time and attendance functions
    getTimeAttendance,
    getTimesheet,
    startTimer,
    stopTimer,
    getTimeAttendanceDaily,
    getTimeAttendanceCustomRange,
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
    submitTimesheet,

    // my profile
    addFiles,
    getFiles,
    deleteFiles,
  };