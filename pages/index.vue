<template></template>
<script>
export default {
  mounted() {
    this.$router.push("/myprofile");
    console.log(this.$router.history.current.fullPath, "skdnakjdnaksdkasdjkasdkj")
    // var userRole = localStorage.getItem("userRole");
    // if (userRole === "USER") {
    //   this.$router.push("/myprofile");
      
    // } else {
    //   this.$router.push("/people");
    // }
  },
};
</script>
