<template>
    <bib-modal-wrapper title="Approve Leave" @close="$emit('close')">
      <template slot="content">
        <div>
          <bib-input
            v-model="approvalComment"
            type="textarea"
            placeholder="Enter the comment"
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
          ></bib-button>
          <bib-button
            label="Approve Request"
            :variant="$button.approved_g.variant"
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
        approvalComment: null,
      };
    },
  
    methods: {
      handleConfirmClick() {
        const { approvalComment } = this
        this.$emit("confirm", { approvalComment })
      }
    }
  };
  </script>
  