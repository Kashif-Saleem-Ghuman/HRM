import { isRequired } from "@/utils/form-validations/string-validations";

export default {
  country: {
    type: "text",
    label: "Country",
    model: "country",
    validations: [isRequired],
  },
  address1: {
    type: "text",
    label: "Address 1",
    model: "address1",
    validations: [isRequired],
  },
  address2: {
    type: "text",
    label: "Address 2",
    model: "address2",
    validations: [],
  },
  city: {
    type: "text",
    label: "City",
    model: "city",
    validations: [isRequired],
  },
  state: {
    type: "text",
    label: "State/Province",
    model: "state",
    validations: [isRequired],
  },
  postalCode: {
    type: "text",
    label: "ZIP/Postal code",
    model: "postalCode",
    validations: [isRequired],
  },
};
