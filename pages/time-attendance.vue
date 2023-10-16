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
