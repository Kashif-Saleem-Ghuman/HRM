
<template>
  <div>
   <bib-app-navigation :items="navItems" :isLightTheme="lightThemeChecked"
      @click="menuClick($event)"></bib-app-navigation>
      <div class="mt-05 mb-05" :class="seprator" style="height: 1px">
    </div>
  </div>
</template>
<script>
import getJson from "../utils/dataJson/app_wrap_data.js";
const navData = getJson();
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
    }
  },
  methods: {
    menuClick(event) {
      if (event.key == "home") {
       this.$router.push('/')
        return;
      }
      if (event.key == "employe") {
        this.$router.push('/employe-list')
        return;
      }

    }

  }
}
</script>
