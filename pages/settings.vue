<template>
    <div>
      <div v-if="isUser">
        <page-not-found></page-not-found>
      </div>
      <div v-else>
        <setting-file></setting-file>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    computed: {
      isAdmin() {
        return this.$store.state.token.isAdmin;
      },
      isUser() {
        return this.$store.state.token.isUser;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  