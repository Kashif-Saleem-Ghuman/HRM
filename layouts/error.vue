<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import notFound from '../components/common/pagenotfound/index.vue'
export default {
  name: "error",
  layout: "default", // optional
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (
        this.error.statusCode == 404
      ) {
        // this.$router.push("/not-found");
        return notFound;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
