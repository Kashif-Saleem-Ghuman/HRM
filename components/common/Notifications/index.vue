<template>
  <div>
    <bib-icon
      icon="send-solid"
      class="mr-1 cursor-pointer"
      variant="gray"
      :scale="0.8"
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
