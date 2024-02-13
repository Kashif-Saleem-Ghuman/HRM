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
        <span class="text-secondary">Shortcuts</span>
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

  methods: {
    changeDashboard() {
      this.$router.push("/dashboard");
    },

    myAccountClick() {
      this.changeRole(USER_ROLES.USER);
      this.$router.push("/time-attendance/attendance/");
      this.$nuxt.$emit("close-sidebar-main");
      this.$nuxt.$emit("close-sidebar");
      this.setUserActiveTab();
    },

    organizationAdminClick() {
      this.changeRole(USER_ROLES.ADMIN);
      this.$router.push("/");
      this.$nuxt.$emit("close-sidebar-main");
      this.$nuxt.$emit("close-sidebar");
      this.setAdminActiveTab();
    },

    resetSelectedNavItems(navItems) {
      return navItems.map((item) => ({ ...item, selected: false }));
    },

    setUserActiveTab() {
      this.appWrapItems.navItemsAdmin = this.resetSelectedNavItems(
        this.appWrapItems.navItemsAdmin
      );
      this.appWrapItems.navItemsUser = this.resetSelectedNavItems(
        this.appWrapItems.navItemsUser
      );
      this.appWrapItems.navItemsUser[0].selected = true;
    },

    setAdminActiveTab() {
      this.appWrapItems.navItemsAdmin = this.resetSelectedNavItems(
        this.appWrapItems.navItemsAdmin
      );
      this.appWrapItems.navItemsUser = this.resetSelectedNavItems(
        this.appWrapItems.navItemsUser
      );
      this.appWrapItems.navItemsAdmin[0].selected = true;
    },

    changeRole(role) {
      localStorage.setItem("userRole", role);
      this.$store.dispatch("token/setViewRole", { role });
    },

    setSelectedNavItem(navItems) {
      const path = this.$router.history.current.fullPath;
      const item = navItems.find((item) => item.url === path);
      this.resetSelected(navItems);
      if (item) item.selected = true;
    },

    openClockIn() {
      this.$nuxt.$emit("clock-in");
    },

    openRequestVacation() {
      this.$nuxt.$emit("open-sidebar-admin", "vacation");
      this.$nuxt.$emit("add-leave");
      this.resetAllSelectedNavItems();
      const leaveNavItem = this.appWrapItems.navItemsUser.find(
        (navItem) => navItem.key === "leave-vacations"
      );
      leaveNavItem.selected = true;
    },

    openRequestLeave() {
      this.$nuxt.$emit("open-sidebar-admin", "leave");
      this.$nuxt.$emit("add-leave");
      this.resetAllSelectedNavItems();
      const leaveNavItem = this.appWrapItems.navItemsUser.find(
        (navItem) => navItem.key === "leave-vacations"
      );
      leaveNavItem.selected = true;
    },

    resetSelected(navItems) {
      navItems.forEach((item) => {
        if (item.hasOwnProperty("selected")) {
          item.selected = false;
        }
      });
    },

    resetAllSelectedNavItems() {
      [
        this.appWrapItems.navItemsUser,
        this.appWrapItems.navItemsAdmin,
        this.appWrapItems.navItemsUserShortcuts,
      ].forEach(this.resetSelected);
    },

    menuClick(item) {
      if (item.hasOwnProperty("selected")) {
        this.resetAllSelectedNavItems();
        item.selected = true;
      }

      if (item.action && this[item.action]) {
        this[item.action](item);
        
      }

      if (item.url) {
        this.$router.push(item.url);}
      
    },
  },

  mounted() {
    this.setSelectedNavItem(this.appWrapItems.navItemsAdmin);
    this.setSelectedNavItem(this.appWrapItems.navItemsUser);
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
