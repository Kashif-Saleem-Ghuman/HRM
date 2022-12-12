<template>
  <div>
    <bib-app-wrapper :navigationCollapsed="collapseNavigation1" :isLightTheme="lightThemeChecked">
      <template #notification v-if="showNotification">
        <bib-notification-persistent @dismiss="
          () => {
            showNotification = false;
          }
        " :label="notificationText" :variant="notificationVariant"></bib-notification-persistent>
      </template>
      <template #topbar>
        <bib-header logo="https://templates.biztree.com/static/brand/bib-symbol-2019--white.svg" hide-search-box
          mainAction="Upgrade" @callToAction="headerActionCall()" @help-click="headerHelpClick()"
          @side-menu-expand="collapseNavigation1 = !collapseNavigation1" :isLightTheme="lightThemeChecked">
        </bib-header>
      </template>
      <template #switcher>
        <bib-app-switcher v-if="!collapseNavigation1" :menuItems="navData.appItems" :isLightTheme="lightThemeChecked"
          @toggle-theme="handleToggleWrapperTheme">
        </bib-app-switcher>
      </template>
      <template #navigation>
        <nav-items :navItems="navData.navItems" :seprator="lightThemeChecked ? 'bg-secondary-sub3' : 'bg-dark-sub1'"></nav-items>
      </template>
      <template #content>
        <div id="main-section" class="p-1">
          <h1>Content Goes Here</h1>
        </div>
      </template>
    </bib-app-wrapper>
  </div>
</template>

<script>
import getJson from "../utils/dataJson/data.js";
const navData = getJson();
export default {
  
  data() {
    return {
      navData: navData,
      collapseNavigation1: false,
      lightThemeChecked: false,
      showNotification: false,
    };

  },
  mounted(){
  },
  methods: {
    handleToggleWrapperTheme(value) {
      this.lightThemeChecked = value;
    },

  }

}
</script>
