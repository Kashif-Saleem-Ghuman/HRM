<template>
    <div>
      <div v-if="isAdmin">
        <time-attendance-admin></time-attendance-admin>
      </div>
      <div v-else-if="isUser">
        <time-attendance-user></time-attendance-user>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import {USER_ROLES} from "@/utils/constant/Constant";
  import {TIMESHEET_VIEW_PATH} from "@/utils/constant/routes";
  
  export default {
    
    data() {
      return {
      };
    },
    methods: {
      changeRole(role) {
        localStorage.setItem("userRole", role);
        this.$store.dispatch("token/setViewRole", { role });
      },
    },
  
    created() {
      const path = this.$router.history.current.fullPath;
      if(path.startsWith(TIMESHEET_VIEW_PATH)){
        this.changeRole(USER_ROLES.USER);
      }
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
  