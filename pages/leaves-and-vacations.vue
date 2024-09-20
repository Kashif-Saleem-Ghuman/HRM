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
import { USER_ROLES } from "@/utils/constant/Constant";
import {
  LEAVE_REQUEST_VIEW_PATH,
  LEAVE_REQUEST_VIEW_PATH_USER,
} from "@/utils/constant/routes";
import { mapGetters } from "vuex";
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
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },
  created() {
    const path = this.$router.history.current.fullPath;
    const userRole = localStorage.getItem("userRole");

    if (userRole === "ADMIN") {
      if (
        path.startsWith(LEAVE_REQUEST_VIEW_PATH) ||
        path.startsWith(LEAVE_REQUEST_VIEW_PATH_USER)
      ) {
        this.changeRole(USER_ROLES.ADMIN);
      }
    } else {
      if (
        path.startsWith(LEAVE_REQUEST_VIEW_PATH) ||
        path.startsWith(LEAVE_REQUEST_VIEW_PATH_USER)
      ) {
        this.changeRole(USER_ROLES.USER);
      }
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
