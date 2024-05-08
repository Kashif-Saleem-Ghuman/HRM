import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from "@/utils/form-validations/string-validations";

export default {
  workTitle: {
    type: "text",
    model: "workTitle",
    validations: [],
  },
  reportsTo: {
    model: "reportsTo",
    validations: [isRequired],
  },
  workEmail: {
    model: "workEmail",
    validations: [isEmail],
  },
  phone: {
    model: "phone",
    validations: [],
  },
  workExtenstion: {
    model: "workExtenstion",
    validations: [],
  },
};
