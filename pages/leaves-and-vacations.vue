<template>
    <div>
      <div v-if="isAdmin">
    <leave-vacation-admin></leave-vacation-admin>
      </div>
      <div v-else-if="isUser">
        <leave-vacation-user></leave-vacation-user>
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
  