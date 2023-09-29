import Vue from "vue";
export default ({ app }, inject) => {
  inject(
    "button",
    Vue.observable({
      approve: {
        label: "Approved",
        key: "approved",
        variant: "success",
        icon: "check-circle-solid",
        scale: "1",
      },
      pending: {
        label: "Pending",
        key: "pending",
        variant: "warning",
        icon: "eye-open",
        scale: "1",
      },
      reject: {
        label: "Rejected",
        key: "rejected",
        variant: "danger",
        icon: "close",
        scale: "1",
      },
    }),
  );
};
