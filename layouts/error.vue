<template>
  <div class="nuxt-error">
    <component
      :is="typeof errorPage === 'object' ? errorPage.component : errorPage"
      v-bind="typeof errorPage === 'object' ? errorPage.props : {}"
      :error="error"
    />
  </div>
</template>

<script>
import ApiError from "../components/common/ApiError/index.vue";
import PageNotFound from "../components/common/PageNotFound/index.vue";
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
      if (this.error.statusCode == 404 || this.error.statusCode == 403)
      {
        return {
          component: PageNotFound,
          props: {}
        };
      }
      else if(this.error.statusCode === 500 ||
        this.error.statusCode === 400 ||
        this.error.statusCode === 503  ||
        this.error.statusCode === 'ERR_NETWORK'
      )
      {
        return {
          component: ApiError,
          props: { title: this.error.message, details: this.error.details }
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
