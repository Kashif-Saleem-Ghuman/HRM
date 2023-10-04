import {
  isEmail,
  isPhoneNumber,
} from "@/utils/form-validations/string-validations";

export default {
  employeeStatus: {
    type: "select",
    label: "Employee Status",
    model: "employeeStatus",
    validations: [],
  },
  employeeNumber: {
    type: "text",
    label: "Employee number",
    model: "employeeNumber",
    validations: [],
  },
  sin: {
    type: "sin",
    label: "Social Insurance Number",
    model: "sin",
    validations: [],
  },
  hireDate: {
    type: "date",
    label: "Hire Date",
    model: "hireDate",
    validations: [],
  },
  employmentType: {
    type: "text",
    label: "Employment Type",
    model: "employmentType",
    validations: [],
  },
};
