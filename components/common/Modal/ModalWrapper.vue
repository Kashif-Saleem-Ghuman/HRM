<template>
  <div>
    <bib-button
      variant="primary"
      label="Modal 3"
      @click="modal3Opened = true"
    ></bib-button>
    <bib-modal-wrapper
      v-if="modal3Opened"
      title="Create file"
      @close="modal3Opened = false"
    >
      <template slot="content">
        <div>
          <bib-input type="text" placeholder="Enter file name..."></bib-input>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex">
          <bib-button
            label="Cancel"
            variant="light"
            pill
            @click="modal3Opened = false"
          ></bib-button>
          <bib-button
            label="Create"
            variant="success"
            class="ml-auto"
            pill
            @click="modal3Opened = false"
          ></bib-button>
        </div>
      </template>
    </bib-modal-wrapper>
  </div>
</template>
<script>
export default {
  name: "ModalWrapper",
  data() {
    return {
      modal3Opened: false,
    };
  },
};
</script>
