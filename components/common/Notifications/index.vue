<template>
  <div class="d-flex align-center">
    <bib-icon
      icon="time-alarm-solid"
      class="cursor-pointer"
      variant="gray"
      :scale="1"
      @click.native.stop="pushNotification"
    ></bib-icon>
    <bib-icon
      icon="send-solid"
      class="ml-05 mr-1 cursor-pointer"
      variant="gray"
      :scale="1"
      @click.native.stop="pushNotification"
    ></bib-icon>
  </div>
</template>

<script>
export default {
  methods: {
    pushNotification() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped></style>
