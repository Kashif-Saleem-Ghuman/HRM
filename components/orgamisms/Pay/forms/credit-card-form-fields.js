import {
  isRequired,
  validateMonthDay,
  validateCvvCvc,
} from "@/utils/form-validations/string-validations";

export default {
  cardNumber: {
    type: "text",
    label: "Card Number",
    model: "cardNumber",
    validations: [],
  },
  cardHolderName: {
    type: "text",
    label: "Cardholder name",
    model: "cardHolderName",
    validations: [],
  },
  expiryDate: {
    type: "text",
    label: "Expiry date",
    model: "expiryDate",
    validations: [],
  },
  cvv: {
    type: "number",
    label: "CVV/CVC",
    model: "cvv",
    validations: [],
  },
};
