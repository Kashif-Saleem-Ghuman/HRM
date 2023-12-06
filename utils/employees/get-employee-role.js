import { USER_ROLES } from "../constant/Constant";

export function getEmployeeRole(employee) {
  const { role, hrmRole } = employee;
  return role === USER_ROLES.ADMIN || hrmRole === USER_ROLES.MANAGER
    ? USER_ROLES.ADMIN
    : USER_ROLES.USER;
}
