<template>
  <div id="error-404-wrapper" class="shape-rounded bg-light">
    <bib-icon icon="bib-logo" :scale="3"></bib-icon>
    <h2 id="error-404-heading1">This Page does'n exist</h2>
    <NuxtLink to="/people">Redirect to Home</NuxtLink>
  </div>
</template>

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
      color: #000;
    }
  }
}
</style>
