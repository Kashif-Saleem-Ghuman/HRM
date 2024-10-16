<template>
  <div id="error-404-wrapper" class="shape-rounded" :class="themeClassCommon">
    <h2 id="error-404-heading1">Error loading page</h2>
    <p>It looks like your internet connection is down. Please check it.</p>
    <NuxtLink :to="getUserRole === 'ADMIN' ? '/dashboard/' : '/home/'" :class="isLightThemeCheck ? 'text-dark': 'text-light'">Redirect to Home</NuxtLink>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {

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
