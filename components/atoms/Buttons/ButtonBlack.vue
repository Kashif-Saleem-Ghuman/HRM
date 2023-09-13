<template>
    <div class="d-flex gap-1">
      <div
        class="d-flex align-center justify-between cursor-pointer text-white bg-black bg-hover-dark-sub1 pl-05 pt-05 pb-05 pr-05  font-md" style="border-radius: 6px;"
        @click.stop="$emit('on-click')"
      >
        <span :class="titleClass" class="pl-05 pr-05">{{ title }}</span>
        <bib-icon
          v-if="icon"
          :icon="icon"
          :variant="variant"
          :scale="scale"
          class="ml-025"
        ></bib-icon>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "ButtonBlack",
    props: {
      title: {
        type: String,
      },
      icon: {
        type: String,
      },
      scale: {
        type: Number,
      },
      variant: {
        type: String,
      },
      className: {
        type: String,
      },
      titleClass: {
        type: String,
      },
    },
    data() {
      return {};
    },
  };
  </script>
  