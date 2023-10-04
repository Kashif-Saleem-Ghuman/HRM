import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from "@/utils/form-validations/string-validations";

export default {
  CompanyName: {
    validations: [isRequired],
  },
  Industry: {
    validations: [isRequired],
  },
  Website: {
    validations: [isRequired],
  },
  ContactEmail: {
    validations: [isEmail],
  },
  ContactPhone: {
    validations: [isPhoneNumber],
  },
  AddressL1: {
    validations: [isRequired],
  },
  AddressL2: {
    validations: [isRequired],
  },
  State: {
    validations: [isRequired],
  },
  Country: {
    validations: [isRequired],
  },
  PostalCode: {
    validations: [isRequired],
  },
};
