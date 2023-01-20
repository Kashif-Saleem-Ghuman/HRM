<template> </template>

<script>
export default {
  mounted() {
    var userRole = localStorage.getItem('userRole')
    if(userRole === 'ADMIN'){
    this.$router.push("/people");
    }else{this.$router.push("/myprofile");}
  }
};
</script>
