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
  import { mapGetters } from "vuex";
  import { USER_ROLES } from "../utils/constant/Constant";
  export default {
    
    data() {
      return {
      };
    },
    computed: {
      isAdmin() {
        return this.getUserRole == USER_ROLES.ADMIN
      },
      isUser() {
        return this.getUserRole == USER_ROLES.USER
      },
      ...mapGetters({
        getUserRole: "token/getUserRole",
      }),
    },
    
  };
  </script>
  
  <style lang="scss" scoped></style>
  