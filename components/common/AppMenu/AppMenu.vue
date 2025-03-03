<template>
  <div>
    <!-- Admin Menu  -->
    <div v-if="isAdmin">
      <bib-app-navigation
        :items="appWrapItems.navItemsAdmin.slice(0, 5)"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
        :isLightTheme="isLightThemeCheck"
        class="mt-05"
      ></bib-app-navigation>
      <div
        class="nav-section position-relative cus-menu"
        v-for="(item, index) in appWrapItems.navItemsAdmin.slice(5, 6)"
        @click="menuClick(item)"
      >
        <div
          id=""
          title="Organization Profile"
          class="nav-section__item nav-item mb-0"
          :class="itemClasses(item)"
        >
          <div class="nav-item__icon">
            <div>
              <bib-logo
                :square="true"
                size="18px"
                :isLightTheme="isLightThemeCheck"
                style="margin-top: 3px"
              ></bib-logo>
            </div>
          </div>
          <div class="nav-item__label nav-item__flex">
            <span
              id=""
              :class="[
                isLightThemeCheck && item.selected
                  ? 'nav-item__label--light--selected'
                  : '',
                !isLightThemeCheck && item.selected
                  ? 'nav-item__label--dark--selected'
                  : '',
              ]"
              >{{ item.label }}</span
            >
          </div>
        </div>
      </div>
      <!-- <bib-app-navigation
        :items="appWrapItems.navItemsAdmin.slice(-1)"
        @click="
          ($event, item) => {
            menuClick(item);
          }
        "
        :isLightTheme="isLightThemeCheck"
      ></bib-app-navigation> -->
      <bib-app-navigation
        :items="appWrapItems.navItemsUserSwitch.slice(0, 1)"
        @click="myAccountClick"
        :isLightTheme="isLightThemeCheck"
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
        :isLightTheme="isLightThemeCheck"
      ></bib-app-navigation>
      <div class="section-head" v-if="sectionHead">
        <span class="text-secondary">Shortcuts</span>
      </div>
      <div :class="className">
        <bib-app-navigation
          :items="appWrapItems.navItemsUserShortcuts"
          @click.stop="
            ($event, item) => {
              menuClick(item);
            }
          "
          class="mt-05"
          :isLightTheme="isLightThemeCheck"
        ></bib-app-navigation>
        <bib-app-navigation
          :items="appWrapItems.navItemsUserSwitch.slice(-1)"
          @click.stop="organizationAdminClick"
          isLightTheme
          class="mt-05 custom-menu"
          :isLightTheme="isLightThemeCheck"
          v-if="isOrganizationAdmin"
        ></bib-app-navigation>
      </div>
      <!-- <bib-button v-if="isOrganizationAdmin" label="Organization admin" variant="secondary--outline" class="mt-1 ml-1"  @click="organizationAdminClick"></bib-button> -->
    </div>
    <bib-notification-stateful class="max-z-index"></bib-notification-stateful>
  </div>
</template>
<script>
import { USER_ROLES } from "../../../utils/constant/Constant.js";
import getJson from "../../../utils/dataJson/app_wrap_data.js";
import { mapState } from "vuex";
const appWrapItems = getJson();
import { handleToggleWrapperTheme } from "@/utils/functions/functions_lib.js";
import {
  navigationPaths,
  navigationPathsAdmin,
} from "../../../utils/constant/NavPaths";

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
      lightThemeChecked: JSON.parse(localStorage.getItem("isLightTheme")),
    };
  },

  methods: {
    changeDashboard() {
      this.$router.push("/dashboard");
    },
    handleToggleWrapperTheme,
    itemClasses(item) {
      const itemClass = {
        "nav-item--selected--light nav-item--light":
          this.isLightThemeCheck && item.selected,
        "nav-item--selected--dark nav-item--dark":
          !this.isLightThemeCheck && item.selected,
        "nav-item__label--light": this.isLightThemeCheck && !item.selected,
        "nav-item__label--light": this.isLightThemeCheck && item.selected,
        "nav-item--dark": !this.isLightThemeCheck && !item.selected,
        "nav-item--light": this.isLightThemeCheck && !item.selected,
      };
      return itemClass;
    },
    myAccountClick() {
      this.changeRole(USER_ROLES.USER);
      this.$router.push("/home/");
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
      let path = this.$router.history.current.fullPath;
      const basePath = path.split("?")[0];
      let matchedNavPath = null;
      const navigationPathsRoleBased = this.isAdmin
        ? navigationPathsAdmin
        : navigationPaths;
      for (const navPath of navigationPathsRoleBased) {
        const regexPath = navPath.paths.map((p) =>
          p.replace(/\/:id\//, "/\\d+/")
        );

        if (
          regexPath.some((p) =>
            new RegExp(`^${p}(\\?view=day|\\?view=week|\\?view=month)?$`).test(
              basePath
            )
          )
        ) {
          const id = this.getIdFromPath(basePath);
          path = navPath.defaultPath.replace(/\/:id\//, id ? `/${id}/` : "/");
          matchedNavPath = path;
          break;
        }
      }
      let item = navItems.find((item) => item.url === basePath);

      if (!item && matchedNavPath) {
        item = navItems.find((item) => item.url === matchedNavPath);
      }

      this.resetSelected(navItems);
      if (item) {
        item.selected = true;
      } else {
        console.log("No nav item was selected.");
      }
    },

    getIdFromPath(path) {
      const match = path.match(/\/(\d+)\//);
      return match ? match[1] : "";
    },

    openClockIn() {
      this.$nuxt.$emit("clock-in");
    },

    closeSidebar() {
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("close-sidebar-main");
      this.$nuxt.$emit("close-sidebar-settings");
    },

    openRequestVacation() {
      this.$hideUserMenu();
      this.$nuxt.$emit("open-sidebar-admin", "vacation");
      this.$nuxt.$emit("add-leave");
      this.resetAllSelectedNavItems();
      const leaveNavItem = this.appWrapItems.navItemsUser.find(
        (navItem) => navItem.key === "leave-vacations"
      );
      leaveNavItem.selected = true;
    },

    openRequestLeave() {
      this.$hideUserMenu();
      this.$nuxt.$emit("open-sidebar-admin", "leave");
      this.$nuxt.$emit("add-leave");
      this.resetAllSelectedNavItems();
      const leaveNavItem = this.appWrapItems.navItemsUser.find(
        (navItem) => navItem.key === "leave-vacations"
      );
      leaveNavItem.selected = true;
    },
    openRequestMedical() {
      this.$hideUserMenu();
      this.$nuxt.$emit("open-sidebar-admin", "medical");
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
      if (
        item.key != "requestVacation" &&
        item.key != "requestLeave" &&
        item.key != "requestMedical"
      ) {
        this.closeSidebar();
      }
      if (item.hasOwnProperty("selected")) {
        this.resetAllSelectedNavItems();
        item.selected = true;
      }

      if (item.action && this[item.action]) {
        this[item.action](item);
      }

      if(item.key === 'my-timesheets') {
        this.$router.push(item.url + '?view=month');
        this.$store.dispatch("timeattendance/setIsViewFromTimesheetCard", true);
        return;
      }

      if (item.url) this.$router.push(item.url);
    },
    updateSelectedNavItems() {
      const items = this.isAdmin
        ? this.appWrapItems.navItemsAdmin
        : this.appWrapItems.navItemsUser;
      this.setSelectedNavItem(items);
    },
  },

  mounted() {
    this.updateSelectedNavItems();
    if (!this.isAdmin && !this.isUser) {
      this.$apiError(500);
    }
  },
  watch: {
    $route() {
      this.updateSelectedNavItems();
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
    margin: 0px;
    padding-left: 6px;
  }
  &_light {
    span {
      color: #6d7278;
    }
  }
  &_dark {
    span {
      color: $dark;
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
      color: $white !important;
    }
  }
}
.cus-menu {
  .nav-item {
    &--dark {
      color: $gray5;

      &:hover {
        background: $border-primary;
        color: $text-secondary;
        .nav-item__symbol {
          display: none;
        }
        .nav-item__label {
          color: $text-secondary;
        }
        .nav-item__symbol--hover {
          display: flex;
          z-index: 3;
          align-items: center;
        }
      }
    }
    &--light {
      color: $light;

      &:hover {
        color: $text-secondary;
        background: $gray13;

        .nav-item__label {
          color: $text-secondary;
        }
        .nav-item__symbol {
          display: none;
        }
        .nav-item__symbol--hover {
          display: flex;
          z-index: 3;
          align-items: center;
        }
      }
    }
    transition: 0.2s all ease;
    $self: &;
    position: relative;
    border-radius: 4px;
    margin: 0rem 0.5rem;
    &--last {
      margin-top: 2rem !important;
    }
    &__line {
      margin-left: -1rem;
      width: 1rem;
    }

    &__label {
      height: 2.5rem;
      align-self: stretch;
      place-items: center;
      color: $text-secondary;
      &--dark {
        &:hover {
          color: $text-primary;
          &:deep(svg) {
            fill: $text-primary;
          }

          color: $text-primary;
        }
        &--selected {
          color: $text-primary;
        }
      }
      &--light {
        &:hover {
          color: $text;

          &:deep(svg) {
            fill: $text;
          }
        }
        &--selected {
          color: $text;
        }
      }
      &--sub {
        font-weight: 500;

        &--dark {
          color: $secondary;
          &:hover {
            color: $white;
          }
        }
      }
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__icon {
      align-self: stretch;
      display: grid;
      place-items: center;
      &--sub {
        display: flex;
        align-items: center;
        z-index: 5;
        margin-left: 1rem;
        height: 100%;
        margin-top: 0.15rem;
        width: 1.5rem;
        justify-content: center;
      }
    }
    &__bullet {
      display: grid;
      place-items: center;
      &::before {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        content: "";
        background-color: $secondary;
      }
      &--selected::before {
        background-color: $white;
      }
    }
    &__symbol {
      display: flex;
      z-index: 3;
      align-items: center;
    }
    &__symbol--hover {
      display: none;
      z-index: 3;
    }
    &__symbol--sub--hover {
      display: none;
    }
    &--sub--dark {
      border-radius: 4px;
      &:hover {
        color: $text-primary;
        background: $surface-tertiary;

        .nav-item__label--sub--dark {
          color: $text-primary;
        }
        svg {
          //fill: $text-primary !important;
        }
        &::v-deep {
          * {
            color: $text-primary;
          }
        }
        .nav-item__icon--sub {
          &::v-deep {
            svg {
              fill: $text-primary !important;
            }
          }
        }
      }
      &.sub-selected {
        span {
          color: $text-primary;
        }
        svg {
          fill: $text-primary !important;
        }
      }
    }
    &--sub--light {
      border-radius: 4px;
      color: $text-secondary;

      &:hover {
        background: $text-primary;

        .nav-item__label--sub--light {
          color: $text;
        }
        svg {
        }
        color: $text;
        &::v-deep {
          svg {
            fill: $text;
          }
        }
      }
      &.sub-selected {
        span {
          color: $text;
        }
        svg {
          fill: $text !important;
        }
      }
    }

    &--selected {
      &--dark {
        color: $text-primary;
        svg {
          fill: $text-primary !important;
        }
      }
      &--light {
        color: $text;
        svg {
          fill: $text !important;
        }
      }
    }
    &__right-menu {
      position: absolute;
      right: 0.7rem;
    }
  }
}
</style>
