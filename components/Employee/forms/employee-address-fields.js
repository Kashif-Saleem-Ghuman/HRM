import {
  isRequired,
  validatePostalCode,
} from "@/utils/form-validations/string-validations";

import { STATES } from "@/utils/constant/Constant";
import COUNTRIES from "@/utils/constant/countries";
import { generateEmptyOptions } from "./form-helpers";
export default {
  address: {
    country: {
      type: "select",
      label: "Country",
      model: "address.country",
      options: [generateEmptyOptions(), ...COUNTRIES],
      validations: [isRequired],
    },
    state: {
      type: "select",
      label: "State/Province",
      model: "address.state",
      options: [generateEmptyOptions(), ...STATES],
      // validations: [isRequired],
    },
    city: {
      type: "text",
      label: "City",
      model: "address.city",
      options: [generateEmptyOptions(), ...STATES],
      // validations: [isRequired],
    },
    postalCode: {
      type: "text",
      label: "Postal code",
      model: "address.postalCode",
      validations: [validatePostalCode],
    },
  },
};
