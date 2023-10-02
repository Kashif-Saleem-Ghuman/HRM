import {
  isRequired
} from "../../../../utils/form-validations/string-validations";

import { SELECT_OPTIONS } from "@/utils/constant/Constant";
import { generateEmptyOptions } from "./form-helpers";
export default {
  firstName: {
    type: "text",
    label: "First Name",
    model: "firstName",
    validations: [isRequired],
  },
  lastName: {
    type: "text",
    label: "Last Name",
    model: "lastName",
    validations: [isRequired],
  },

  dateOfBirth: {
    type: "date",
    label: "Date Of Birth",
    model: "dateOfBirth",
    validations: [isRequired],
  },
  gender: {
    type: "select",
    label: "Gender",
    model: "gender",
    options: [generateEmptyOptions(), ...SELECT_OPTIONS.genderOptions],
    validations: [isRequired],
  },
  maritalStatus: {
    type: "select",
    label: "Marital Status",
    model: "maritalStatus",
    options: [generateEmptyOptions(), ...SELECT_OPTIONS.maritalStatusOptions],
    validations: [isRequired],
  },
};
