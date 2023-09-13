<template>
  <div class="d-flex gap-1">
    <div
      class="d-flex align-center cursor-pointer text-gray1 bg-light bg-hover-gray2 pl-05 pt-05 pb-05 pr-05 font-md" style="border-radius: 6px;"
      @click="$emit('on-click')"
    >
      <bib-icon
        v-if="icon"
        :icon="icon"
        :variant="variant"
        :scale="scale"
        :class="className"
      ></bib-icon>
      <span :class="titleClass" class="p-025">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ButtonGray",
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
