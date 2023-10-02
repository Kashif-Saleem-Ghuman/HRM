import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from "../../../../utils/form-validations/string-validations";

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
  workTelephone: {
    model: "workTelephone",
    validations: [isPhoneNumber],
  },
  workExtenstion: {
    model: "workExtenstion",
    validations: [],
  },
};
