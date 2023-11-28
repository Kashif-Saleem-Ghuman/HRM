<template>
  <bib-modal-wrapper title="Reject Request" @close="$emit('close')">
    <template slot="content">
      <div>
        <bib-input
          v-model="refusalReason"
          type="textarea"
          placeholder="Enter request refusal reason"
        ></bib-input>
      </div>
    </template>
    <template slot="footer">
      <div class="d-flex">
        <bib-button
          label="Cancel"
          variant="light"
          pill
          @click="$emit('cancel')"
        ></bib-button>
        <bib-button
          label="Reject Request"
          :variant="$button.rejected.variant"
          class="ml-auto"
          pill
          @click="handleConfirmClick"
        ></bib-button>
      </div>
    </template>
  </bib-modal-wrapper>
</template>

<script>
export default {
  data() {
    return {
      refusalReason: null,
    };
  },

  methods: {
    handleConfirmClick() {
      const { refusalReason } = this
      this.$emit("confirm", { refusalReason })
    }
  }
};
</script>
