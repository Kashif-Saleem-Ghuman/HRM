
<template>
  <div>
   <bib-app-navigation :items="appWrapItems.navItems" :isLightTheme="lightThemeChecked" @click="menuClick($event)"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px">
   <bib-app-navigation :items="appWrapItems.navItems2" :isLightTheme="lightThemeChecked" @click="menuClick($event)"></bib-app-navigation>    
  </div>
  </div>
</template>
<script>
import getJson from "../utils/dataJson/app_wrap_data.js";
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
    }
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
    for (let i = 0; i < this.appWrapItems.navItems2.length; i++) {
      if (this.appWrapItems.navItems2[i].key == event.key) {
        this.appWrapItems.navItems2[i].selected = true;
      } else {
        this.appWrapItems.navItems2[i].selected = false;
      }
    }
    if (process.client) {
    if (event.key == "dashboard") {
     this.$router.push('/')
      return;
    }
    if (event.key == "employees") {
      this.$router.push('/employees/employe-list')
      return;
    }
    if (event.key == "hiring") {
     this.$router.push('/hiring')
      return;
    }
    if (event.key == "onboarding") {
     this.$router.push('/onboarding')
      return;
    }
  }
  }
  }
}
</script>
