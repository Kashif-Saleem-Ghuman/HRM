<template>
  <div>
     <!-- Admin Menu  -->
     <div v-if="adminMenu" class="mt-1">
      <!-- <div :class="sectionHead" class="section-head">
        <span v-on:click="changeDashboard()" style="cursor: pointer; ">Organization admin</span>
      </div> -->
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

    <!-- User Menu  -->
    <div v-if="userMenu" class="mt-1">
      <div :class="sectionHead" class="section-head">
        <span v-on:click="changeDashboard" style="cursor: pointer; color: #86868a;">Home</span>
      </div>
      <bib-app-navigation
        :items="appWrapItems.navItemsUser"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
      <div class="section-head">
        <span style="cursor: pointer; color: #86868a;">Shortcuts</span>
      </div>
      <div :class="className">
      <bib-app-navigation
        :items="appWrapItems.navItemsUserShortcuts"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
      ></bib-app-navigation>
    </div>
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
    className:{
      type:String
    },
    sectionHead:{
      type:String
    }
  },
  data() {
    return {
      lightThemeChecked: false,
      appWrapItems: appWrapItems,
    };
  },
  mounted() {
    
    // console.log*this.appWrapItems.navItemsAdmin, "appWrapItems"
    if (process.client) {
      
      for (let i = 0; i < this.appWrapItems.navItemsAdmin.length; i++) {
        if (this.appWrapItems.navItemsAdmin[i].url == this.$router.history.current.fullPath) {
          this.appWrapItems.navItemsAdmin[i].selected = true;
        } else {
          this.appWrapItems.navItemsAdmin[i].selected = false;
        }
      }
    }
  },
  methods: {
    changeDashboard(){
      this.$router.push("/dashboard")
    },
    menuClick(item) {
      for (let i = 0; i < this.appWrapItems.navItemsAdmin.length; i++) {
        if (this.appWrapItems.navItemsAdmin[i].key == item.key) {
          this.appWrapItems.navItemsAdmin[i].selected = true;
        } else {
          this.appWrapItems.navItemsAdmin[i].selected = false;
        }
      }
      if (process.client) {
        // admin menu actions
        if (item.key == "dashboard") {
          this.$router.push("/dashboard/");
          return;
        }
        if (item.key == "inbox") {
          this.$router.push("/inbox/");
          return;
        }
        if (item.key == "orgprofile") {
          this.$router.push("/orgprofile/");
          return;
        }
        if (item.key == "people") {
          this.$router.push("/people/");
          return;
        }
        if (item.key == "time-attendance") {
          this.$router.push("/time-attendance/");
          return;
        }
        if (item.key == "leave-vacations") {
          this.$router.push("/leaves-and-vacations/");
          return;
        }
        if (item.key == "settings") {
          this.$router.push("/settings/");
          return;
        }

        // user menu actions
        if (item.key == "requestVacation") {
          this.$nuxt.$emit("open-sidebar", 'vacationUser')
          this.$nuxt.$emit("add-leave");
          return;
        }
        if (item.key == "requestLeave") {
          this.$nuxt.$emit("open-sidebar", 'leaveAdmin')
          this.$nuxt.$emit("add-leave");
          return;
        }
        if (item.key == "clockIn") {
          this.$nuxt.$emit("clock-in")
          return;
        }
        if (item.key == "sendNotification") {
          window.open('https://dev-chat.business-in-a-box.com/', "_blank")
          return;
        }
        if (item.key == "myprofile") {
          this.$router.push("/myprofile");
          return;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.section-head{
  // background-color: black;
  line-height: 36px;
  font-size: 14px;
  font-weight: 500;
  margin: 8px;
  border-radius: 4px;
  span{
    // font-size: 30px;
    margin: 0px;
  }
  &_light{
    // background-color: #f2f2f5;
    span{
      color: #6d7278;
    }
  }
  &_dark{
    // background-color: #2E2F31;
    span{
      color: #86868a;
    }
  }
}
.custom-menu{
  .nav-item__label{
    color: #1F42A2  !important;
  }
 .custom-menu-light{
  .nav-item__label{
    color: #fff  !important;
  }
 } 
}
</style>