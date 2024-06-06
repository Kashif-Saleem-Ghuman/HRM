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
          @side-menu-expand="collapseNavigation1 = !collapseNavigation1"
          :isLightTheme="isLightTheme"
          noResultText="No result"
          placeholderSearchbox="Search employee by name"
          @search-change="handleSearchChange"
          :search-data="$store.state.app.searchResults || []"
          @search-enter="$router.push('/search')"
          :hideSearchBox="$store.state.token.isUser"
          class="app-wrapper--collapsed2"
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
        <app-menu :sectionHead="!collapseNavigation1" ></app-menu>
      </template>
      <template #content>
        <div id="main-content" :class="themeClassWrapper">
          <Nuxt />
          <add-leave-sidebar></add-leave-sidebar>
        </div>
        <div>
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
import { getEmployeeFullName } from "../utils/functions/common_functions";
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
      isLightTheme:this.$cookies.get('isLightTheme')
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
    }),
    
  },
  async mounted() {
    this.loading = true;
    this.accountType = this.$store.state.token.accountType;
    this.setDebouncedSearch();
    this.loading = false;
    await this.$isThemeCheck();
    this.isLightTheme = this.$cookies.get('isLightTheme')
  },
  methods: {
    getEmployeeFullName,
    handleToggleWrapperTheme,
    myProfile,
    openTeamPage,
    openBillingPage,
    headerHelpClick,
    headerActionCall,
    ...mapActions('theme', ['initializeTheme']),

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
