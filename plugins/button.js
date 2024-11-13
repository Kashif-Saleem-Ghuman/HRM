import Vue from "vue";

const buttonConfig = {
  not_submitted: {
    label: "Not submitted",
    value: "not_submitted",
    variant: "primary-24",
    icon: "eye-close",
  },
  pending: {
    label: "Pending",
    value: "pending",
    key: "pending",
    variant: "pending",
    icon: "eye-open",
  },
  vacation: {
    label: "Vacation",
    value: "vacation",
    key: "vacation",
  },
  approved: {
    label: "Approve",
    value: "approved",
    key: "approved",
    variant: "primary-24",
    icon: "check-circle-solid",
    statusLabel: "Approved",
  },
  approved_g: {
    label: "Approve",
    value: "approved",
    key: "approved",
    variant: "success",
    icon: "check-circle-solid",
    statusLabel: "Approved",
  },
  rejected: {
    label: "Reject",
    value: "rejected",
    key: "rejected",
    variant: "danger",
    icon: "close",
    statusLabel: "Rejected",
  },
  past_due: {
    label: "Past Due",
    value: "past_due",
    key: "past_due",
    variant: "warning",
    icon: "eye-open",
  },
  delete: {
    label: "Cancel Request",
    value: "cancel-request",
    key: "cancel-request",
    variant: "danger",
    icon: "close",
  },
  blackButton: {
    variant: "dark",
    icon: "close",
  },
  lightButton: {
    variant: "light",
    icon: "arrow-down",
  },
  PTO: {
    label: "Paid Time-Off",
    buttonLable: "Request Paid Time-Off",
    icon:"airplane-solid"
  },
  MEDICAL: {
    label: "Medical/Sick",
    buttonLable: "Request Medical Leave",
    icon:"medical-clinic-solid"
  },
  UNPAID: {
    label: "Unpaid Leave",
    buttonLable: "Request Unpaid Leave",
    icon:"accessibility-cognitive-disability-solid"
  },
  SETTINGS: {
    label: "Settings",
    buttonLable: "Settings",
    icon:"add",
    variant: "primary-24",
  },
};

export default function buttonPlugin({ app }, inject) {
  const button = Vue.observable(buttonConfig);
  inject("button", button);
}
