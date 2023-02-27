<template></template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userRole: "token/getUserRole",
    }),
  },
  mounted() {
    // var userRole = localStorage.getItem("userRole");
    if (userRole === "USER") {
              if(this.$router.history.current.fullPath === '/people'){
                this.$router.push("/myprofile");
              }
              this.$router.push("/myprofile");
            }
  },
};
</script>
