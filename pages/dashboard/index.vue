!
<template>
  <div>
    <template v-if="getUserRole === 'ADMIN'">
      <dashboard-admin></dashboard-admin>
    </template>
    <template v-if="getUserRole === 'USER'">
      <dashboard-user></dashboard-user>
    </template>
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
