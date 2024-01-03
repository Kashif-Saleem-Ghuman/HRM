<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
export default {
  name: "error",
  layout: "default", // optional
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    errorPageValue() {
      if (
        this.error.statusCode === 404 ||
        this.error.statusCode == 503 ||
        this.error.statusCode == 500
      ) {
        this.$router.push("/not-found");
        return;
      }
    },
  },
  computed: {
    errorPage() {
      this.errorPageValue();
    },
  },
};
</script>

<style lang="scss" scoped></style>
