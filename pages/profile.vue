<template>
<div>
  <div v-if="isAdmin">
    <user-profile></user-profile>
  </div>
  <div v-if="isUser">
    <my-profile></my-profile>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { USER_ROLES } from "../utils/constant/Constant";
import { NY_PROFILE_VIEW_PATH } from "@/utils/constant/routes";

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
  created() {
    const path = this.$router.history.current.fullPath;
    if (path.endsWith(NY_PROFILE_VIEW_PATH)) {
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
  