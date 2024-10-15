<template>
  <div><server-error :is-server-error="true"></server-error></div>
</template>

<script>
import ServerError from "../../components/common/PageNotFound/ServerError.vue";

export default {
  components: {ServerError}
};
</script>

<style lang="scss" scoped></style>
