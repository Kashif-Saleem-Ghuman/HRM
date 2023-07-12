<template></template>
<script>
export default {
  async mounted() {
    // this.$router.push("/dashboard");
     if(this.$router.history.current.fullPath === '/'){
      await this.$router.push("/dashboard");
              }
    // var userRole = localStorage.getItem("userRole");
    // if (this.userRole === "USER") {
    //           if(this.$router.history.current.fullPath === '/people'){
    //             this.$router.push("/myprofile");
    //           }
    //           this.$router.push("/people");
    //         }
    // else{
    //   this.$router.push("/people");
    // }
  },
};
</script>
