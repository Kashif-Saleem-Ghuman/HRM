import {
  isEmail,
  isPhoneNumber,
} from "@/utils/form-validations/string-validations";

export default {
  primaryEmail: {
    type: "email",
    label: "Primary email",
    model: "primaryEmail",
    validations: [isEmail],
  },
  secondaryEmail: {
    type: "email",
    label: "Secondary email",
    model: "secondaryEmail",
    optional: true,
    validations: [isEmail],
  },
  homePhone: {
    type: "text",
    label: "Home Phone",
    model: "homePhone",
    optional: true,
    validations: [isPhoneNumber],
  },
  cellPhone: {
    type: "text",
    label: "Cell Phone",
    model: "cellPhone",
    optional: true,
    validations: [isPhoneNumber],
  },
};
