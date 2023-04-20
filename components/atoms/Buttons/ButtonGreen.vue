<template>
  <div class="d-flex gap-1">
    <div
      class="d-flex align-center cursor-pointer text-success bg-success-sub6 bg-hover-success-sub3 shape-rounded pl-05 pt-025 pb-025 pr-075 mr-05 font-md"
      @click.stop="$emit('on-click')"
    >
      <bib-icon
        v-if="icon"
        :icon="icon"
        :variant="variant"
        :scale="scale"
        :class="className"
      ></bib-icon>
      <span :class="titleClass" class="pl-025">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ButtonDefault",
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
