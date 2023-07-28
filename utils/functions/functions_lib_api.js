import {
    employeeTime,
  } from "./api_call/timeapi";
  import {
    getTimeAttandance,
    getTimesheet,
  } from "./api_call/timeattandance/time";
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
  } from "./api_call/leavesvacations/requestadmin";
  import {
    addLeaveVacations,
    getAllowancVacationeDays,
    getAllowancMedicalDays,
    getAllowanceLeaveDays,
    getAllowanceDays,
    deleteLevaeVacation
  } from "./api_call/leavesvacations/requestuser";
  
  export {
    employeeTime,
    getTimeAttandance,
    getTimesheet,
    addBenefitsData,
    updateBenefitsData,
    getBenefitsData,

    // leave vacations admin functions
    getLeaveVacationsAdmin,
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    getRejectLeaveVacationsAdmin,

    // leave vacations user functions
    addLeaveVacations,
    getAllowanceDays,
    getAllowancVacationeDays,
    getAllowancMedicalDays,
    getAllowanceLeaveDays,
    deleteLevaeVacation
  };