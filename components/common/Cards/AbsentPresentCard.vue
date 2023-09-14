<template>
    <div class="d-flex">
      <div class="info-card-leave-wrapper" style="width: 100%">
        <div>
          <label>{{ title }}</label>
        </div>
        <div class="info-card-items mt-05">
          <div>
            <div class="subheading">{{ item.numLabel }}</div>
            <span>{{ item.numberData }}</span>
            </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "Card",
    props: {
        title: {
        type: String,
      },
      hashItem: {
        type: String,
      },
      item: {
        type: Object,
      },
      buttonLable: {
        type: String,
      },
      icon: {
        type: String,
      },
      buttonVariant: {
        type: String,
      },
    },
    data() {
      return {
        fill: { gradient: ["#ffb700", "#47b801"] },
      };
    },
    methods: {
      buttonAction(item) {
        alert("Called", item);
      },
    },
  };
  </script>
  