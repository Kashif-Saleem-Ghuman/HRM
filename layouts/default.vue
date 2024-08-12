<template>
  <div :class="isLightTheme ? '' : 'app-wrapper-dark-theme bg-black'">
    <bib-app-wrapper
      :navigationCollapsed="collapseNavigation1"
      :isLightTheme="isLightTheme"
    >
      <template #topbar>
        <bib-header
          :mainAction="
            accountType === 'CLIENT'
              ? $i18n.t('inviteUsers')
              : $i18n.t('seePlansPricing')
          "
          @callToAction="headerActionCall()"
          @support-link="headerHelpClick()"
          @my-account-link="myProfile"
          @team-link="openTeamPage"
          @billing-link="openBillingPage"
          :avatarLink="userPhoto"
          @logout="$signOut()"
          @side-menu-expand="collapseMenu"
          :isLightTheme="isLightThemeCheck"
          noResultText="No results, type a employee name to begin search."
          placeholderSearchbox="Search employee by name"
          @search-change="handleSearchChange"
          :search-data="$store.state.app.searchResults || []"
          @search-enter="$router.push('/search')"
          :hideSearchBox="$store.state.token.isUser"
          class="app-wrapper--collapsed2"
          :key="updateHeader"
        >
          <template>
            <div class="py-05 ml-minus-5">
              <search-content></search-content>
            </div>
          </template>
        </bib-header>
      </template>
      <template #switcher>
        <bib-app-switcher
          v-if="!collapseNavigation1"
          :menuItems="appWrapItems.appItems"
          :isLightTheme="isLightTheme"
          @toggle-theme="toggleTheme"
        >
        </bib-app-switcher>
      </template>
      <template #navigation>
        <app-menu :sectionHead="!collapseNavigation1"></app-menu>
      </template>
      <template #content>
        <div id="main-content" :class="themeClassWrapper">
          <Nuxt />
          <add-leave-sidebar></add-leave-sidebar>
        </div>
        <loader :loading="loading"></loader>
      </template>
    </bib-app-wrapper>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { debounce } from "lodash";
import getJson from "@/utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();
import {
  handleToggleWrapperTheme,
  myProfile,
  openBillingPage,
  openTeamPage,
  headerHelpClick,
  headerActionCall,
} from "@/utils/functions/functions_lib.js";

import routesCheck from "../middleware/routes.client";
export default {
  data() {
    return {
      debouncedSearch: null,
      appWrapItems: appWrapItems,
      collapseNavigation1: false,
      showNotification: false,
      showPopup: false,
      loading: false,
      userPhoto: "",
      accountType: "",
      userRole: "",
      addLeaveKey: 0,
      flag: false,
      isLightTheme: this.$cookies.get("isLightTheme"),
      updateHeader: 0,
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
    }),
  },
  created() {
    this.$root.$on("update-header-photo", () => {
      this.updateHeader += 1;
    });
  },
  async mounted() {
    this.loading = true;
    this.accountType = this.$store.state.token.accountType;
    this.setDebouncedSearch();
    this.loading = false;
    await this.$isThemeCheck();
    this.isLightTheme = this.$cookies.get("isLightTheme");
    this.setHeightBasedOnEnvironment();
  },
  methods: {
    handleToggleWrapperTheme,
    myProfile,
    openTeamPage,
    openBillingPage,
    headerHelpClick,
    headerActionCall,
    setHeightBasedOnEnvironment() {
      const element = document.querySelector(".app-wrapper__content");
      const appSwitcher = document.querySelector(".app-switcher__theme-switch");
      if (navigator.userAgent.includes("Electron")) {
        element.style.paddingBottom = "46px";
        appSwitcher.style.marginBottom = "46px";
      } else {
        element.style.paddingBottom = "0px";
        appSwitcher.style.marginBottom = "1rem";
      }
    },
    ...mapActions("theme", ["initializeTheme"]),
    collapseMenu() {
      this.collapseNavigation1 = !this.collapseNavigation1;
      if (this.$route.path === "/leaves-and-vacations/dashboard/") {
        this.$nuxt.$emit("update-calendar");
      }
    },
    toggleTheme(flag) {
      this.isLightTheme = flag;
      this.$handleToggleWrapperTheme(flag);
    },
    routesCheck,
    setDebouncedSearch() {
      if (!this.debouncedSearch) {
        this.debouncedSearch = debounce((event) => {
          this.performSearch(event);
        }, 300);
      }
    },
    performSearch(event) {
      const search = event;
      this.$store.dispatch("app/performSearch", { search });
    },
    handleSearchChange(event) {
      if (this.debouncedSearch) this.debouncedSearch(event);
    },
    logout() {
      this.$signOut;
    },
  },
};
</script>
<style lang="scss">
.ml-minus-5 {
  margin-left: -5px;
}
</style>
