import { isRequired } from "@/utils/form-validations/string-validations";

export default {
  bankCountryId: {
    type: "text",
    label: "Country",
    model: "bankCountryId",
    validations: [isRequired],
  },
  bankName: {
    type: "text",
    label: "Bank Name",
    model: "bankName",
    validations: [isRequired],
  },
  accountType: {
    type: "select",
    label: "Account Type",
    model: "accountType",
    validations: [isRequired],
  },
  accountCurrency: {
    type: "select",
    label: "Account Currency",
    model: "accountCurrency",
    validations: [isRequired],
  },
  routingNumber: {
    type: "number",
    label: "Routing Number",
    model: "routingNumber",
    validations: [isRequired],
  },
  accountNumber: {
    type: "number",
    label: "Account Number",
    model: "accountNumber",
    validations: [isRequired],
  },
  branchNumber: {
    type: "number",
    label: "Branch Number",
    model: "branchNumber",
    validations: [isRequired],
  },
};
