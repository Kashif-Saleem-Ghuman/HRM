!
<template>
  <div>
    <div v-if="getUserRole == 'ADMIN'">
      <leave-vacation-admin></leave-vacation-admin>
    </div>
    <div v-if="getUserRole == 'USER'">
      <leave-vacation-user></leave-vacation-user>
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
