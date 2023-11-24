import Vue from "vue";
export default ({ app }, inject) => {
  inject(
    "button",
    Vue.observable({
      not_submitted: {
        label: "Not submitted",
        value: "not_submitted",
      },
      pending: {
        label: "Pending",
        value: "pending",
        key: "pending",
        variant: "warning",
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
        variant: "primary",
        icon: "check-circle-solid",
      },
      rejected: {
        label: "Reject",
        value: "rejected",
        key: "rejected",
        variant: "danger",
        icon: "close",
      },
      past_due: {
        label: "Past Due",
        value: "past_due",
        key: "past_due",
        variant: "warning",
        icon: "eye-open",
      },
    })
  );
};
