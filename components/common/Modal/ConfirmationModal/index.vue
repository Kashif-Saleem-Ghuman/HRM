<template>
  <div>
    <bib-button
    variant="primary"
    label="Modal 1"
    v-if="confirmastionMessageModal"
    @close="$emit('close')"
  ></bib-button>
  <bib-modal-wrapper v-if="confirmastionMessageModal"
    @close="$emit('close')" :title="title">
    <template slot="content">
      <div class="text-center p-2">
        <p class="font-w-600">{{confirmationMessage}}</p>
      </div>
    </template>
    <template slot="footer">
      <div class="d-flex justify-center">
        <bib-button
          label="Cancle"
          variant="light"
          class="mr-1"
          @click="$emit('close')"
          pill
        ></bib-button>
        <bib-button
          label="Delete"
          variant="danger"
          class="mr-1"
          @click="$emit('deleteLeave')"
          pill
        ></bib-button>
      </div>
    </template>
  </bib-modal-wrapper>
  </div>
</template>
<script>
export default {
  name: "AddDepartment",
  props: {
    confirmastionMessageModal: {
      type: Boolean,
    },
    confirmationMessage:{
        type:String
    },
    title:{
        type:String
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
<style lang="scss"></style>
