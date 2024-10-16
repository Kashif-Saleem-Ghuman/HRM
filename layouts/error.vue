<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import notFound from "../components/common/PageNotFound";
import ServerError from "../components/common/PageNotFound/ServerError.vue";
import NetworkError from "../components/common/PageNotFound/NetworkError.vue";
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
      console.log('errorPage', this.error);
      if (this.error.statusCode == 404 || this.error.statusCode == 403) {
        return notFound;
      }else if(this.error.statusCode === 500 || this.error.statusCode === 400) {
        return ServerError;
      } else if(this.error.statusCode === 503) {
        return NetworkError;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
