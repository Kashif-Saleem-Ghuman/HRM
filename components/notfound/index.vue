<template>
  <div id="error-404-wrapper" class="shape-rounded">
    <div>	<bib-icon icon="bib-logo" :scale="3"></bib-icon></div>
    <h1 id="error-404-heading1">Page not found</h1>
    <NuxtLink to="/">Redirect to Home</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
#error-404-wrapper {
  max-width: 30rem;
  margin: 50px auto;
  text-align: center;
  padding: 1rem;
  h1{
    font-size: 40px;
    padding: 0;
    margin: 0 0 1rem 0;
    font-weight: 600;
  }
  a{
    text-decoration: none;
    color:#999;
    &:hover{
      text-decoration: underline;
      color: #000;
    }
  }
}
</style>