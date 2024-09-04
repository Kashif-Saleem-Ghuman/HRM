<template>
  <div v-if="isPlainStatus" class="button-override">
    <chips
      :title="getStatusLabel(resolvedStatus)"
      iconShow="iconShow"
      :icon="getStatusIcon(resolvedStatus)"
      :variant="[getStatusVariant(resolvedStatus)]"
      :defaultPointer="true"
      :className="['width-auto']"
      class="d-align"
    ></chips>
  </div>
  <div v-else class="button-override">
    <bib-button
      :label="getButtonLabel(timesheet, resolvedStatus)"
      :variant="$getStatusVariantName(resolvedStatus)"
      :icon-right="setIconVisibility(resolvedStatus)"
      @click.native.stop="$emit('click')"
      :disabled="disabled"
      pill
      :style="minWidth"
      class="d-align"
      :class="[defaultPointer ? 'cursor-default' : 'cursor-pointer']"
    ></bib-button>
  </div>
</template>

<script>
import {
  getStatusIcon,
  getStatusVariant,
  getStatusLabel,
} from "@/utils/functions/status";

export default {
  props: {
    leaveStatusData: {
      type: [Object, String],
      required: true,
    },
    minWidth: {
      type: String,
      default: "min-width: 115px !important;",
    },
    disabled: {
      type: Boolean,
    },
    defaultPointer: {
      type: Boolean,
      default: false,
    },
    isPlainStatus: {
      type: Boolean,
      default: false,
    },
    timesheet:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {};
  },
  computed: {
    resolvedStatus() {
      if (
        typeof this.leaveStatusData === "object" &&
        this.leaveStatusData !== null
      ) {
        return this.leaveStatusData.value.status ?? this.leaveStatusData;
      }
      return this.leaveStatusData;
    },
  },
  methods: {
    getStatusVariant,
    getStatusIcon,
    getStatusLabel,
    getButtonLabel(timesheet, resolvedStatus) {
      const statusLabel = this.$getStatusLabelName(resolvedStatus);
      
      if (timesheet && statusLabel === 'Rejected') {
        return 'Resubmit';
      } else {
        return statusLabel;
      }
    },
    setIconVisibility(resolvedStatus) {
      const status = this.$getStatusLabelName(resolvedStatus);
      const normalizedStatus = status?.toLowerCase();

      if (normalizedStatus === "approved") {
        return this.$getLeaveStatusIconName(normalizedStatus);
      }
      if (normalizedStatus === "rejected") {
        return this.$getLeaveStatusIconName(normalizedStatus);
      }
      return ""; // Return an empty string if neither approved nor rejected
    },
  },
};
</script>

<style lang="scss">
.button-override {
  .button {
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
    &--default-light {
      background-color: $gray4;
      color: $dark;
      border: 1px solid $dark;
      svg {
        fill: $dark !important;
      }
    }
    &--primary {
      background-color: $primary-24;
      color: $white;
      border: 1px solid $primary-24;
      svg {
        fill: $white !important;
      }
    }
  }
  .cursor-default {
    cursor: default !important;
  }
}
</style>
