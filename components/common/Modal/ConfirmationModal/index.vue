<template>
  <div>
    <bib-modal-wrapper
      v-if="confirmastionMessageModal"
      @close="$emit('close')"
      :title="title"
      class="text-gray6 font-w-600 font-md"
      :class="isLightThemeCheck ? '' : 'modal__wrapper--dark'"
    >
      <template slot="content">
        <div class="text-center p-2">
          <p class="text-gray6 font-w-600 font-md">{{ confirmationMessage }}</p>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex justify-center">
          <bib-button
            label="Cancel"
            :variant="isLightThemeCheck ? 'light' : 'secondary'"
            class="mr-1"
            @click.native.stop="$emit('close')"
            pill
          ></bib-button>
          <bib-button
            label="Confirm"
            :variant="variant || 'danger'"
            class="mr-1"
            :disabled="loader"
            @click="$emit('on-click')"
            pill
          ></bib-button>
        </div>
      </template>
    </bib-modal-wrapper>
    <loader v-if="!hasParentLoader" :loading="loader"></loader>
  </div>
</template>
<script>
export default {
  name: "AddDepartment",
  props: {
    confirmastionMessageModal: {
      type: Boolean,
    },
    confirmationMessage: {
      type: String,
    },
    title: {
      type: String,
    },
    variant: {
      type: String,
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
      // modal3Opened: false,
    };
  },
  methods: {},
};
</script>
<style lang="scss">
.dark-theme {
  .modal {
    &__mask {
      background: transparentize(#000, 0.2) !important;
      z-index: 9999999 !important;
    }
  }
}
</style>
