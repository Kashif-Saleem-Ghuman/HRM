import {
    employeeTime,
  } from "./api_call/timeapi";
  import {
    getTimeAttendance,
    getTimesheet,
    getTimeAttendanceDaily,
    getTimeAttendanceWeek,
    getTimeAttendanceMonth
  } from "./api_call/timeattendance/time";
  import {
    startTimer,
    stopTimer,
  } from "./api_call/timeattendance/timer";
  
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
    getTimeAttendanceWeek,
    getTimeAttendanceMonth,
  };