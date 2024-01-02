<template>
  <div>
    <!-- Admin Menu  -->
    <div v-if="isAdmin">
      <bib-app-navigation
        :items="appWrapItems.navItemsAdmin"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
        isLightTheme
        class="mt-05"
      ></bib-app-navigation>
      <bib-app-navigation
        :items="appWrapItems.navItemsUserSwitch.slice(0, 1)"
        @click="myAccountClick"
        isLightTheme
        class="mt-05 custom-menu"
      ></bib-app-navigation>
      <!-- <bib-button label="My Account" variant="secondary--outline" class="mt-1 ml-1" @click="myAccountClick"></bib-button> -->
    </div>

    <!-- User Menu  -->
    <div v-if="isUser" class="mt-1">
      <bib-app-navigation
        :items="appWrapItems.navItemsUser"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
        class="mt-05"
      ></bib-app-navigation>
      <div class="section-head" v-if="sectionHead">
        <span style="cursor: pointer; color: #86868a">Shortcuts</span>
      </div>
      <div :class="className">
        <bib-app-navigation
          :items="appWrapItems.navItemsUserShortcuts"
          @click="
            ($event, item) => {
              menuClick(item);
            }
          "
          class="mt-05"
        ></bib-app-navigation>
        <bib-app-navigation
          :items="appWrapItems.navItemsUserSwitch.slice(-1)"
          @click="organizationAdminClick"
          isLightTheme
          class="mt-05 custom-menu"
          v-if="isOrganizationAdmin"
        ></bib-app-navigation>
      </div>
      <!-- <bib-button v-if="isOrganizationAdmin" label="Organization admin" variant="secondary--outline" class="mt-1 ml-1"  @click="organizationAdminClick"></bib-button> -->
    </div>
  </div>
</template>
<script>
import { USER_ROLES } from "../../../utils/constant/Constant.js";
import getJson from "../../../utils/dataJson/app_wrap_data.js";
import { mapState } from "vuex";
const appWrapItems = getJson();
export default {
  props: {
    navItems: {
      type: Array,
    },
    seprator: {
      type: String,
    },
    className: {
      type: String,
    },
    sectionHead: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState("token", ["isAdmin", "isUser", "subr"]),
    isOrganizationAdmin() {
      return (
        this.$store.state.token.hrmRole === USER_ROLES.ADMIN ||
        this.$store.state.token.hrmRole === USER_ROLES.MANAGER
      );
    },
  },

  data() {
    return {
      appWrapItems: appWrapItems,
    };
  },
  mounted() {
    // console.log*this.appWrapItems.navItemsAdmin, "appWrapItems"
    if (process.client) {
      for (let i = 0; i < this.appWrapItems.navItemsAdmin.length; i++) {
        if (
          this.appWrapItems.navItemsAdmin[i].url ==
          this.$router.history.current.fullPath
        ) {
          this.appWrapItems.navItemsAdmin[i].selected = true;
        } else {
          this.appWrapItems.navItemsAdmin[i].selected = false;
        }
      }
      for (let i = 0; i < this.appWrapItems.navItemsUser.length; i++) {
        if (
          this.appWrapItems.navItemsUser[i].url ==
          this.$router.history.current.fullPath
        ) {
          this.appWrapItems.navItemsUser[i].selected = true;
        } else {
          this.appWrapItems.navItemsUser[i].selected = false;
        }
      }
    }
  },
  methods: {
    changeDashboard() {
      this.$router.push("/dashboard");
    },

    myAccountClick() {
      this.changeRole(USER_ROLES.USER);
      this.$nuxt.$emit("close-sidebar-main");
      this.$nuxt.$emit("close-sidebar");
    },

    organizationAdminClick() {
      this.changeRole(USER_ROLES.ADMIN);
      this.$nuxt.$emit("close-sidebar-main");
      this.$nuxt.$emit("close-sidebar");
    },

    changeRole(role) {
      this.$store.dispatch("token/setViewRole", { role });
      this.$router.push("/");
    },

    menuClick(item) {
      for (let i = 0; i < this.appWrapItems.navItemsAdmin.length; i++) {
        if (this.appWrapItems.navItemsAdmin[i].key == item.key) {
          this.appWrapItems.navItemsAdmin[i].selected = true;
        } else {
          this.appWrapItems.navItemsAdmin[i].selected = false;
        }
      }
      for (let i = 0; i < this.appWrapItems.navItemsUser.length; i++) {
        if (this.appWrapItems.navItemsUser[i].key == item.key) {
          this.appWrapItems.navItemsUser[i].selected = true;
        } else {
          this.appWrapItems.navItemsUser[i].selected = false;
        }
      }
      if (process.client) {
        // admin menu actions
        // this.$nuxt.$emit('close-sidebar-main')
        // this.$nuxt.$emit('close-sidebar')
        if (item.key == "dashboard") {
          this.$router.push("/dashboard/");
          this.$nuxt.$emit("close-sidebar");
          this.$nuxt.$emit("close-sidebar-main");
          return;
        }
        if (item.key == "inbox") {
          this.$router.push("/inbox/");
          this.$nuxt.$emit("close-sidebar");
          this.$nuxt.$emit("close-sidebar-main");
          return;
        }
        if (item.key == "orgprofile") {
          this.$router.push("/orgprofile/");
          this.$nuxt.$emit("close-sidebar");
          this.$nuxt.$emit("close-sidebar-main");
          return;
        }
        if (item.key == "people") {
          this.$router.push("/people/");
          this.$nuxt.$emit("close-sidebar");
          this.$nuxt.$emit("close-sidebar-main");
          return;
        }
        if (item.key == "time-attendance") {
          this.$router.push("/time-attendance/");
          this.$nuxt.$emit("close-sidebar");
          this.$nuxt.$emit("close-sidebar-main");
          return;
        }
        if (item.key == "leave-vacations") {
          this.$router.push("/leaves-and-vacations/");
          this.$nuxt.$emit("close-sidebar");
          this.$nuxt.$emit("close-sidebar-main");
          return;
        }
        if (item.key == "settings") {
          this.$router.push("/settings/");
          return;
        }

        // user menu actions
        if (item.key == "home") {
          this.$router.push("/dashboard");
          return;
        }
        if (item.key == "requestVacation") {
          if (
            this.$router.history.current.fullPath ===
            "/leaves-and-vacations/dashboard/"
          ) {
            this.$nuxt.$emit("open-sidebar-admin", "vacation");
            this.$nuxt.$emit("add-leave");
            return;
          } else {
            this.$router.push("/leaves-and-vacations/");
            setTimeout(() => {
              this.$nuxt.$emit("open-sidebar-admin", "vacation");
              this.$nuxt.$emit("add-leave");
            }, 2000);
          }
        }
        if (item.key == "requestLeave") {
          if (
            this.$router.history.current.fullPath ===
            "/leaves-and-vacations/dashboard/"
          ) {
            this.$nuxt.$emit("open-sidebar-admin", "leave");
            this.$nuxt.$emit("add-leave");
            return;
          } else {
            this.$router.push("/leaves-and-vacations/");
            setTimeout(() => {
              this.$nuxt.$emit("open-sidebar-admin", "leave");
              this.$nuxt.$emit("add-leave");
            }, 2000);
          }
        }
        if (item.key == "clockIn") {
          this.$nuxt.$emit("clock-in");
          return;
        }
        if (item.key == "sendNotification") {
          window.open(process.env.BIB_CHAT_APP_URL, "_blank");
          return;
        }
        if (item.key == "profile") {
          this.$router.push("/profile");
          return;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.section-head {
  // background-color: black;
  line-height: 36px;
  font-size: 14px;
  font-weight: 500;
  margin: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    // font-size: 30px;
    margin: 0px;
    padding-left: 6px;
  }
  &_light {
    // background-color: #f2f2f5;
    span {
      color: #6d7278;
    }
  }
  &_dark {
    // background-color: #2E2F31;
    span {
      color: #86868a;
    }
  }
}
.custom-menu {
  .nav-item {
    border: 1px solid #999;
  }
  .nav-item__label {
    span {
      font-size: 14px !important;
      font-weight: normal;
    }
  }
  .custom-menu-light {
    .nav-item__label {
      color: #fff !important;
    }
  }
}
</style>
