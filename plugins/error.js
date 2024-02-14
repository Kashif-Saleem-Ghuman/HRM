import Vue from "vue";

const errorMessages = {
  common_message: {
    text: "Something went wrong. Please try again.",
    variant: "danger",
  },
};

export default function errorPlugin({ app }, inject) {
  const error = Vue.observable(errorMessages);
  inject("error", error);
}
