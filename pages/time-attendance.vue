<template>
  <div>
    <div v-if="isAdmin">
      <time-attendance-admin></time-attendance-admin>
    </div>
    <div v-else>
      <time-attendance-user></time-attendance-user>
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
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },
  
};
</script>

<style lang="scss" scoped></style>
