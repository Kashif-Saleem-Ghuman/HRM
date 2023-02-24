<template></template>
<script>
export default {
  mounted() {
    var userRole = localStorage.getItem("userRole");
    if (userRole === "USER") {
              if(this.$router.history.current.fullPath === '/people'){
                this.$router.push("/myprofile");
              }
              this.$router.push("/myprofile");
            }
  },
};
</script>
