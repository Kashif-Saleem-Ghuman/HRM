
<template>
  <div v-if="adminMenu">
   <bib-app-navigation :items="appWrapItems.navItemsUser.slice(0,2)" @click="($event, item) =>{menuClick(item)}"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px;"></div>
    <bib-app-navigation :items="appWrapItems.navItemsAdmin" @click="($event, item) =>{menuClick(item)}"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
    <bib-app-navigation :items="appWrapItems.navItemsUser.slice(2)" @click="($event, item) =>{menuClick(item)}"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
  </div>
</template>
<script>
import getJson from "../../../utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();
export default {
  props: {
    navItems: {
      type: Array,
    },
    seprator: {
      type: String,
    },
    adminMenu:{
      type:String
    }
  },
  data() {
    return {
      lightThemeChecked: false,
      appWrapItems:appWrapItems,
    }
  },
  mounted(){
    
    // if (process.client) {
    //   for (let i = 0; i < this.appWrapItems.navItems.length; i++) {
    //     if (this.appWrapItems.navItems[i].url == this.$router.history.current.fullPath) {
    //       this.appWrapItems.navItems[i].selected = true;
    //     } else {
    //       this.appWrapItems.navItems[i].selected = false;
    //     }
    //   }
    //   var userRole = localStorage.getItem('userRole')
    // }
  },
  methods: {
    menuClick(item) {
    // for (let i = 0; i < this.appWrapItems.navItems.length; i++) {
    //   if (this.appWrapItems.navItems[i].key == item.key) {
    //     this.appWrapItems.navItems[i].selected = true;
    //   } else {
    //     this.appWrapItems.navItems[i].selected = false;
    //   }
    // }
    if (process.client) {
    if (item.key == "dashboard") {
     this.$router.push('/dashboard')
      return;
    }
    if (item.key == "inbox") {
      this.$router.push('/inbox')
      return;
    }
    if (item.key == "myprofile") {
     this.$router.push('/myprofile')
      return;
    }
    if (item.key == "people") {
     this.$router.push('/people')
      return;
    }
    if (item.key == "time-attendance") {
     this.$router.push('/time-attendance')
      return;
    }
    if (item.key == "orgprofile") {
     this.$router.push('/orgprofile')
      return;
    }
    if (item.key == "timeattendance") {
      this.$store.dispatch("token/setActiveTab", item.key)
     this.$router.push('/myprofile')
      return;
    }
    if (item.key == "time-off") {
     this.$router.push('/timeoff')
      return;
    }
    if (item.key == "my-time-off") {
     this.$router.push('/mytimeoff')
      return;
    }
    if (item.key == "pay") {
     this.$router.push('/pay')
      return;
    }
    if (item.key == "benefits") {
     this.$router.push('/benefit')
      return;
    }
    if (item.key == "files") {
      // this.$store.dispatch("token/setActiveTab", item.key)
     this.$router.push('/files')
      return;
    }
    if (item.key == "performance") {
     this.$router.push('/performance')
      return;
    }
    if (item.key == "compensation") {
     this.$router.push('/compensation')
      return;
    }
  }
  }
  }
}
</script>
