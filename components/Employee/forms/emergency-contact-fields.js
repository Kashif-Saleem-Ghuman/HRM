import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from "@/utils/form-validations/string-validations";

export default {
  emergencyContact: {
    name: {
      type: "text",
      label: "Contact name",
      model: "emergencyContact.name",
      validations: [isRequired],
    },
    releationship: {
      type: "text",
      label: "Releationship",
      model: "emergencyContact.releationship",
      validations: [isRequired],
    },
    email: {
      type: "text",
      label: "Email",
      model: "emergencyContact.email",
      validations: [isEmail],
    },
    phone: {
      type: "text",
      label: "Telephone",
      model: "emergencyContact.phone",
      validations: [isPhoneNumber],
    },
  },
};
