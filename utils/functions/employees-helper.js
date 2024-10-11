export const getDepartmentsString = (departments) => {
  if (!departments || !departments.length) return "";
  return departments.map((department) => department.DeptName).join(", ");
};
