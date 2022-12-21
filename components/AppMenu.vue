
<template>
  <div>
   <bib-app-navigation :items="appWrapItems.navItems" :isLightTheme="lightThemeChecked" @click="menuClick($event)"></bib-app-navigation>
   <div class="mt-05 mb-05" :class="seprator" style="height: 1px">
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
    if (process.client) {
    if (event.key == "home") {
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
