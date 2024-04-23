<template>
    <div>
      <div v-if="isAdmin">
    <download-file></download-file>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    
    data() {
      return {
      };
    },
    computed: {
      isAdmin() {
        return this.$store.state.token.isAdmin
      },
      isUser() {
        return this.$store.state.token.isUser
      },
    },
    
  };
  </script>
  
  <style lang="scss" scoped></style>
  