import {
    employeeTime,
  } from "./api_call/timeapi";
  import {
    getTimeAttandance,
    getTimesheet,
  } from "./api_call/timeattandance/time";
  import {
    startTimer,
    stopTimer,
  } from "./api_call/timeattandance/timer";
  import {
    addBenefitsData,
    updateBenefitsData,
    getBenefitsData,
    deleteBenefitsData
  } from "./api_call/benefits/benefits.js";
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
    addBenefitsData,
    updateBenefitsData,
    getBenefitsData,

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
    getTimeAttandance,
    getTimesheet,
    startTimer,
    stopTimer
  };