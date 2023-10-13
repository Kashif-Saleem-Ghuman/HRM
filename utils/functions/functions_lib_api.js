import {
  addFiles,
  getFiles,
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
    getLeaveVacationsAdmin,
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    getRejectLeaveVacationsAdmin,
    getUserLeavesDetail,
  } from "./api_call/leavesvacations/requestadmin";
  import {
    addLeaveVacations,
    getAllowancVacationeDays,
    getAllowancMedicalDays,
    getAllowanceLeaveDays,
    getAllowanceDays,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
  } from "./api_call/leavesvacations/requestuser";
  
  export {
    employeeTime,

    // leave vacations admin functions
    getLeaveVacationsAdmin,
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    getRejectLeaveVacationsAdmin,
    getUserLeavesDetail,

    // leave vacations user functions
    addLeaveVacations,
    getAllowanceDays,
    getAllowancVacationeDays,
    getAllowancMedicalDays,
    getAllowanceLeaveDays,
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
  };