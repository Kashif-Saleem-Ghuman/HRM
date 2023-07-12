!
<template>
  <div>
    <div v-if="userRole == 'ADMIN'">
      <leave-vacation-admin></leave-vacation-admin>
    </div>
    <div v-if="userRole == 'USER'">
      <leave-vacation-user></leave-vacation-user>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userRole: '',
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },
  created() {
    this.userRole = this.getUserRole;
    console.log(this.userRole)
  },
};
</script>

<style lang="scss" scoped></style>
