import { isRequired } from "@/utils/form-validations/string-validations";

export default {
  paymentMethodName: {
    type: "text",
    label: "Payment method name",
    model: "paymentMethodName",
    validations: [isRequired],
  },
};
