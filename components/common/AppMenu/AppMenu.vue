<template>
  <div>
    <div  class="mt-1" v-if="userMenu">
      <div class="menu-icon-less bg-light">
        <span>Home</span>
      </div>
      <bib-app-navigation
        :items="appWrapItems.navItemsUser"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
      <div class="menu-icon-less">
        <span style="cursor: pointer; color: #86868a;">Shortcuts</span>
      </div>
      <div class="custom-menu">
      <bib-app-navigation
        :items="appWrapItems.navItemsUserShortcuts"
        style="color: red;"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
    </div>
    </div>
    <!-- Admin Menu  -->
    <div v-if="adminMenu" class="mt-1">
      <div class="menu-icon-less bg-light">
        <span v-on:click="changeDashboard()" style="cursor: pointer; ">Organization admin</span>
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
    console.log*this.appWrapItems.navItemsAdmin, "appWrapItems"
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
      // for (let i = 0; i < this.appWrapItems.navItemsAdmin.length; i++) {
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
.custom-menu{
  .nav-item__label{
    color: #1F42A2  !important;
    span{
    }
  }
}
</style>