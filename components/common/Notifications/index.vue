<template>
  <div class="d-flex align-center">
    <bib-spinner v-if="isLoading" :scale="2" :variant="!isLightThemeCheck ? 'light' : 'dark'" :class="customClass"></bib-spinner>
    <bib-icon
      v-else
      :icon="iconName"
      :class="['cursor-pointer', customClass]"
      variant="gray"
      :scale="1"
      @click.native.stop="pushNotification"
    ></bib-icon>
  </div>
</template>

<script>
export default {
  props:{
    iconName: {
      type: String,
    },
    customClass: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    pushNotification() {
      this.$emit('submit-notification');
    },
  },
};
</script>

<style scoped></style>
