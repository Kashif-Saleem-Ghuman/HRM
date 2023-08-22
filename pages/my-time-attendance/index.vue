!
<template>
  <div>
    <div v-if="getUserRole == 'ADMIN'">
      <time-attendance-admin></time-attendance-admin>
    </div>
    <div v-if="getUserRole == 'USER'">
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
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },
 
};
</script>

<style lang="scss" scoped></style>
