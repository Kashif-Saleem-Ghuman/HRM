<template>
  <div>
    <div>
      <time-attendance-user></time-attendance-user>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { USER_ROLES } from "../utils/constant/Constant";
import { USER_HOME_PATH, USER_HOMEVIEW_DAY_PATH, USER_HOMEVIEW_WEEK_PATH, USER_HOMEVIEW_MONTH_PATH } from "@/utils/constant/routes";
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
    if (
      path.includes(USER_HOME_PATH) ||
    path.includes(USER_HOMEVIEW_DAY_PATH.split('?')[0]) ||
    path.includes(USER_HOMEVIEW_WEEK_PATH.split('?')[0]) ||
    path.includes(USER_HOMEVIEW_MONTH_PATH.split('?')[0])
    ) {
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
