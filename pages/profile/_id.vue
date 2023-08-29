!
<template>
  <div>
    <div v-if="getUserRole == 'USER'">
      <user-profile></user-profile>
    </div>
    <div v-if="getUserRole == 'ADMIN'">
      <my-profile></my-profile>
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
