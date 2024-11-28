<template>
    <div>
      <div v-if="isAdmin">
        <pay></pay>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
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
      ...mapGetters({
        getUserRole: "token/getUserRole",
      }),
    },
    
  };
  </script>
  
  <style lang="scss" scoped></style>
  