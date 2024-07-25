!
<template>
  <div class="button-override">
    <bib-button
      :label="$getStatusLabelName(leaveStatusData.value.status)"
      :variant="$getStatusVariantName(leaveStatusData.value.status)"
      :icon-right="$getLeaveStatusIconName(leaveStatusData.value.status)"
      @click="$emit('click')"
      pill
    ></bib-button>
  </div>
</template>

<script>
export default {
  props: {
    leaveStatusData: {
      type: Object,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.button-override {
  .button {
    min-width: 115px !important;
    display: flex;
    justify-content: space-between;
    &--success-light {
      background-color: #ddf0dc;
      color: $success;
      border: 1px solid $success;
      svg {
        fill: $success !important;
      }
    }
    &--warning-light {
      background-color: #fff2d6;
      color: #ffab00;
      border: 1px solid #ffab00;
      svg {
        fill: #ffab00 !important;
      }
    }
    &--danger-light {
      background-color: #fbd6d8;
      color: $danger;
      border: 1px solid $danger;
      svg {
        fill: $danger !important;
      }
    }
  }
}
</style>
