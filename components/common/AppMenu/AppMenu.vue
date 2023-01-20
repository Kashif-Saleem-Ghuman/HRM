
<template>
  <div>
   <bib-app-navigation :items="appWrapItems.navItems.slice(0,2)" @click="menuClick($event)"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px">
    <bib-app-navigation :items="appWrapItems.navItems.slice(2,9)" @click="menuClick($event)"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
    <bib-app-navigation :items="appWrapItems.navItems.slice(9)" @click="menuClick($event)"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
  </div>
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
    
  },
  data() {
    return {
      lightThemeChecked: false,
      appWrapItems:appWrapItems,
    }
  },
  mounted(){
    if (process.client) {
      for (let i = 0; i < this.appWrapItems.navItems.length; i++) {
        if (this.appWrapItems.navItems[i].url == this.$router.history.current.fullPath) {
          this.appWrapItems.navItems[i].selected = true;
        } else {
          this.appWrapItems.navItems[i].selected = false;
        }
      }
      var userRole = localStorage.getItem('userRole')
    if(userRole === 'USER'){
      var check = document.querySelector("[title=\"People\"]");
      check.style = "display: none";
    }}
  },
  methods: {
    menuClick(event) {
    for (let i = 0; i < this.appWrapItems.navItems.length; i++) {
      if (this.appWrapItems.navItems[i].key == event.key) {
        this.appWrapItems.navItems[i].selected = true;
      } else {
        this.appWrapItems.navItems[i].selected = false;
      }
    }
    if (process.client) {
    if (event.key == "dashboard") {
     this.$router.push('/')
      return;
    }
    if (event.key == "inbox") {
      this.$router.push('/inbox')
      return;
    }
    if (event.key == "myprofile") {
     this.$router.push('/myprofile')
      return;
    }
    if (event.key == "people") {
     this.$router.push('/people')
      return;
    }
    if (event.key == "timesheets") {
     this.$router.push('/timesheets')
      return;
    }
    if (event.key == "timesheets") {
     this.$router.push('/timesheets')
      return;
    }
    if (event.key == "timetracker") {
     this.$router.push('/timetracker')
      return;
    }
    if (event.key == "absense") {
     this.$router.push('/absense')
      return;
    }
    if (event.key == "performance") {
     this.$router.push('/performance')
      return;
    }
    if (event.key == "compensation") {
     this.$router.push('/compensation')
      return;
    }
    if (event.key == "files") {
     this.$router.push('/files')
      return;
    }
  }
  }
  }
}
</script>
