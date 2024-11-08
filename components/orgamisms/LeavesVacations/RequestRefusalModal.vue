<template>
  <div>
    <bib-modal-wrapper :title="title" @close="$emit('close')" :class="isLightThemeCheck ? '' : 'modal__wrapper--dark'">
      <template slot="content">
        <div>
          <bib-input
            v-model="refusalReason"
            type="textarea"
            placeholder="Enter the reason for rejection"
            :variant="themeInputVariant"
          ></bib-input>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex">
          <bib-button
            label="Cancel"
            pill
            @click="$emit('cancel')"
            :variant="isLightThemeCheck ? 'light' : 'secondary'"
          ></bib-button>
          <bib-button
            label="Reject Request"
            :variant="$button.rejected.variant"
            class="ml-auto"
            :disabled="loader"
            pill
            @click="handleConfirmClick"
          ></bib-button>
        </div>
      </template>
    </bib-modal-wrapper>
    <loader v-if="!hasParentLoader" :loading="loader"></loader>
  </div>
</template>

<script>
import { type } from "jquery";

export default {
  props: {
    title: {
      type: String,
      default: "Reject Request",
    },
    loader: {
      type: Boolean,
      default: false,
    },
    hasParentLoader: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      refusalReason: null,
    };
  },

  methods: {
    handleConfirmClick() {
      const { refusalReason } = this;
      this.$emit("confirm", { refusalReason });
    },
  },
};
</script>
