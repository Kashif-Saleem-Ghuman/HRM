<template>
  <div>
    <div v-if="userMenu" class="mt-1">
      <div class="menu-icon-less bg-light">
        <span>My account</span>
      </div>
      <bib-app-navigation
        :items="appWrapItems.navItemsUser"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
      <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
      <bib-app-navigation
        :items="appWrapItems.navItemsAdminSwitch"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
        style="border: solid 5px #000; font-size: 30px !important"
      ></bib-app-navigation>
      <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
    </div>
    <!-- Admin Menu  -->
    <div v-if="adminMenu" class="mt-1">
      <div class="menu-icon-less bg-light">
        <span v-on:click="changeDashboard()" style="cursor: pointer;">Organization admin</span>
      </div>
      <bib-app-navigation
        :items="appWrapItems.navItemsAdmin.slice(0, 1)"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
      <bib-app-navigation
        :items="appWrapItems.navItemsAdmin.slice(1)"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
      <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div>
      <!-- <bib-app-navigation
        :items="appWrapItems.navItemsUserSwitch"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
      <div class="mt-05 mb-05" :class="seprator" style="height: 1px"></div> -->
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
    adminMenu: {
      type: String,
    },
    userMenu: {
      type: String,
    },
  },
  data() {
    return {
      lightThemeChecked: false,
      appWrapItems: appWrapItems,
    };
  },
  mounted() {
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
    changeDashboard(){
      this.$router.push("/dashboard")
    },
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
          this.$router.push("/dashboard");
          return;
        }
        if (item.key == "inbox") {
          this.$router.push("/inbox");
          return;
        }
        if (item.key == "myprofile") {
          this.$router.push("/myprofile");
          return;
        }
        if (item.key == "people") {
          this.$router.push("/people");
          return;
        }
        if (item.key == "time-attendance") {
          this.$router.push("/time-attendance");
          return;
        }
        if (item.key == "orgprofile") {
          this.$router.push("/orgprofile");
          return;
        }
        if (item.key == "timeattendance") {
          this.$router.push("/mytimeattendance");
          return;
        }
        if (item.key == "time-off") {
          this.$router.push("/timeoff");
          return;
        }
        if (item.key == "my-time-off") {
          this.$router.push("/mytimeoff");
          return;
        }
        if (item.key == "pay") {
          this.$router.push("/pay");
          return;
        }
        if (item.key == "benefits") {
          this.$router.push("/benefit");
          return;
        }
        if (item.key == "files") {
          // this.$store.dispatch("token/setActiveTab", item.key)
          this.$router.push("/files");
          return;
        }
        if (item.key == "performance") {
          this.$router.push("/performance");
          return;
        }
        if (item.key == "compensation") {
          this.$router.push("/compensation");
          return;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.menu-icon-less{
  // background-color: black;
  line-height: 36px;
  font-size: 14px;
  font-weight: 500;
  margin: 8px;
  border-radius: 4px;
  span{
    // font-size: 30px;
    margin: 16px;
  }
}
</style>