<template>
  <div>
    <bib-modal-wrapper
      v-if="payMethodsModal"
      @close="$emit('close')"
      :title="modalTitle"
      class="text-gray6 font-w-600 font-md"
      :class="isLightThemeCheck ? '' : 'modal__wrapper--dark'"
      :icon="headerIcon"
    >
      <template v-slot:content>
        <slot></slot>
      </template>
      <template slot="footer">
        <div class="d-flex">
          <slot name="footer"></slot>
        </div>
      </template>
    </bib-modal-wrapper>
  </div>
</template>

<script>
export default {
  name: "AddDepartment",
  props: {
    payMethodsModal: {
      type: Boolean,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
    headerIcon: {
      type: String,
    },
  },
};
</script>

<style>
.modal__wrapper__content {
  padding: 0.5rem !important;
}
</style>
