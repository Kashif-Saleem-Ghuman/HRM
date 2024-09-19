<template>
    <div>
      <div v-if="isAdmin">
        <page-not-found></page-not-found>
      </div>
      <div v-else>
        <employee-directory></employee-directory>
      </div>
    </div>
  </template>
  
  <script>
import { mapGetters } from "vuex";
import { USER_ROLES } from "../utils/constant/Constant";
import { EMPLOYEE_DIRECTORY_VIEW_LIST_PATH, EMPLOYEE_DIRECTORY_BOARD_VIEW_PATH } from "@/utils/constant/routes";
  export default {
    data() {
      return {};
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
  created() {
    const path = this.$router.history.current.fullPath;
    if (path.endsWith(EMPLOYEE_DIRECTORY_VIEW_LIST_PATH || EMPLOYEE_DIRECTORY_BOARD_VIEW_PATH)) {
      this.changeRole(USER_ROLES.USER);
    }
  },
  methods: {
    changeRole(role) {
      localStorage.setItem("userRole", role);
      this.$store.dispatch("token/setViewRole", { role });
    },
  },
  };
  </script>
  
  <style lang="scss" scoped></style>
  