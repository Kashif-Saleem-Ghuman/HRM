!
<template>
  <div>
    <div v-if="userRole == 'ADMIN'">
      <time-attendance-admin></time-attendance-admin>
    </div>
    <div v-if="userRole == 'USER'">
      <time-attendance-user>
        
      </time-attendance-user>
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
