<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import notFound from "../components/common/PageNotFound";
import ServerError from "../pages/server-error/index.vue";
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
      if (this.error.statusCode == 404 || this.error.statusCode == 403) {
        return notFound;
      }else if(this.error.statusCode === 500) {
        return ServerError;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
