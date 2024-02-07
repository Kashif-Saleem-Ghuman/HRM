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
    getApproveLeaveVacationsAdmin,
  } from "./api_call/leavesvacations/requestadmin";
  import {
    addLeaveVacations,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
  } from "./api_call/leavesvacations/requestuser";
  
  export {
    employeeTime,

    // leave vacations admin functions
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,

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