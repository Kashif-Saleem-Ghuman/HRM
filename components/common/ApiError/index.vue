<template>
  <div id="error-404-wrapper" class="shape-rounded" :class="themeClassCommon">
    <h2 id="error-404-heading1">{{ title }}</h2>
    <p>{{ details }}</p>
    <a href="." :class="isLightThemeCheck ? 'text-dark': 'text-light'">Refresh</a>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ApiError",
  props: {
    title: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },
};
</script>

<style scoped lang="scss">
#error-404-wrapper {
  max-width: 35rem;
  margin: 6rem auto 0rem auto;
  text-align: center;
  padding: 3rem;
  // height: 100vh;
  h2 {
    font-size: 1.5rem;
    padding: 0;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }
  a {
    text-decoration: none;
    color: #999;
    font-size: 0.8rem;
    &:hover {
      text-decoration: underline;
      color: $black;
    }
  }
}
</style>
