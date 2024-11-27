<template>
  <div class="d-flex justify-between">
    <div class="px-05 py-05">
      <label
        class="font-sm"
        :class="isLightThemeCheck ? 'text-gray6' : 'text-secondary'"
        v-if="primaryButton.filterLabel"
        >{{ primaryButton.filterLabel }} :
      </label>
      <bib-button
        :label="primaryButton.label"
        :variant="computedVariant"
        :class="primaryButton.class"
        :icon="primaryButton.icon"
        @click="primaryButton.onClick"
      ></bib-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primaryButton: {
      type: Object,
    },
  },
  computed: {
    computedVariant() {
      return (
        this.primaryButton.variant ||
        (this.isLightThemeCheck ? "light" : "dark")
      );
    },
  },
};
</script>
<style lang="scss">
.increase-button-size {
  height: 75px;
  width: 150px;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  padding-top: 30px !important;
}
</style>
