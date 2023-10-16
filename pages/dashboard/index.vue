!
<template>
  <div>
    <template v-if="$store.state.token.isAdmin">
      <dashboard-admin></dashboard-admin>
    </template>
    <template v-if="$store.state.token.isUser">
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
