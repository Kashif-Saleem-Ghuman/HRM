import {
  isEmail,
  isPhoneNumber,
  isRequired,
  isValidUrl,
  validatePostalCode
} from "@/utils/form-validations/string-validations";

export default {
  companyName: {
    validations: [isRequired],
  },
  industry: {
    validations: [isRequired],
  },
  website: {
    validations: [isValidUrl],
  },
  contactEmail: {
    validations: [isEmail],
  },
  contactPhone: {
    // validations: [isPhoneNumber],
  },
  addressL1: {
    validations: [isRequired],
  },
  addressL2: {
    validations: [isRequired],
  },
  state: {
    validations: [isRequired],
  },
  country: {
    validations: [isRequired],
  },
  postalCode: {
    validations: [validatePostalCode],
  },
};
