import { isRequired } from "@/utils/form-validations/string-validations";

export default {
  bankCountryId: {
    type: "text",
    label: "Country",
    model: "bankCountryId",
    validations: [],
  },
  bankName: {
    type: "text",
    label: "Bank Name",
    model: "bankName",
    validations: [],
  },
  accountType: {
    type: "select",
    label: "Account Type",
    model: "accountType",
    validations: [],
  },
  accountCurrency: {
    type: "select",
    label: "Account Currency",
    model: "accountCurrency",
    validations: [],
  },
  routingNumber: {
    type: "number",
    label: "Routing Number",
    model: "routingNumber",
    validations: [],
  },
  accountNumber: {
    type: "number",
    label: "Account Number",
    model: "accountNumber",
    validations: [],
  },
  branchNumber: {
    type: "number",
    label: "Branch Number",
    model: "branchNumber",
    validations: [],
  },
};
