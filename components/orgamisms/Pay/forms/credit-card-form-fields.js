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
    validations: [isRequired],
  },
  cardholderName: {
    type: "text",
    label: "Cardholder name",
    model: "cardholderName",
    validations: [isRequired],
  },
  expiryDate: {
    type: "text",
    label: "Expiry date",
    model: "expiryDate",
    validations: [isRequired, validateMonthDay],
  },
  cvv: {
    type: "number",
    label: "CVV/CVC",
    model: "cvv",
    validations: [isRequired, validateCvvCvc],
  },
};
