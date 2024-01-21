import Vue from "vue";
export default ({ app }, inject) => {
  inject(
    "error",
    Vue.observable({
      common_message: {
        text: "Something went wrong please try again",
        variant: "danger",
      },
     
    })
  );
};
