<template>
    <div class="tab_title">
  <h3 class="d-flex align-center text-left">
    {{ title }}
    <bib-icon
      :icon="icon"
      :scale="scale"
      :variant="variant"
      class="ml-05 icon"
    ></bib-icon>
  </h3>
</div>
</template>

<script>
export default {
  name: "TabsTitle",
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
  },
};
</script>

<style lang="scss">
.tab_title{
    h3 {
      font-size: 14px;
      color: #85858f;
      font-weight: 600;
      margin: 0;
      padding: 0;
    }
    .icon {
      margin-top: 2px;
    }
}
</style>
