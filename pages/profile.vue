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
  