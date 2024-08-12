<template>
  <div>
    <employee-profile-form :show="isActiveUser()"></employee-profile-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeUserId: null,
      show: false,
      routeUserId:this.$route.params.id,
    };
  },
  mounted() {
    this.setActiveUserId();
    this.isActiveUser();
  },
  methods: {
    setActiveUserId() {
      this.activeUserId = this.getUser?.id;
    },
    isActiveUser() {
      return this.activeUserId != this.routeUserId;
    },
  },
  watch: {
    "$route.params.id"() {
      this.isActiveUser();
    },
    getUser() {
      this.setActiveUserId();
      this.isActiveUser();
    },
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
};
</script>
