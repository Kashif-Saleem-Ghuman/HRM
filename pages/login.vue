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
            :avatarLink="userPhoto" @side-menu-expand="collapseNavigation1 = !collapseNavigation1" :isLightTheme="lightThemeChecked">
            <template #avatar_menu>
              <avatar-sub-menu @logout="logout" @openAccountPage="openAccountPage" @myProfile="myProfile"></avatar-sub-menu>
            </template>
          </bib-header>
        </template>
        <template #switcher>
          <bib-app-switcher v-if="!collapseNavigation1" :menuItems="appWrapItems.appItems" :isLightTheme="lightThemeChecked"
            @toggle-theme="handleToggleWrapperTheme">
          </bib-app-switcher>
        </template>
        <template #navigation>
          <app-menu :navItems="appWrapItems.navItems"
            :seprator="lightThemeChecked ? 'bg-secondary-sub3' : 'bg-dark-sub1'"></app-menu>
        </template>
        <template #content>
          <div id="main-section" class="p-1">
            <h1><bib-icon icon="nodes" variant="success" :scale="2"></bib-icon> Welcome to HRM App</h1>
            <modal-wrapper></modal-wrapper><br />
            <bib-notification :popupMessages="popupMessages"></bib-notification>
          </div>
        </template>
      </bib-app-wrapper>
    </div>
  </template>
  
  <script>
  import getJson from "../utils/dataJson/app_wrap_data.js";
  const appWrapItems = getJson();
  import {
    getUser, 
    handleToggleWrapperTheme, 
    openAccountPage,
    myProfile,
    logout, 
    headerHelpClick, 
    headerActionCall, 
    openPopupNotification
  } from "../utils/functions/functions_lib.js"
  export default {
    data() {
      return {
        appWrapItems: appWrapItems,
        collapseNavigation1: false,
        lightThemeChecked: false,
        showNotification: false,
        showPopup:false,
        loading: false,
        popupNotificationMsgs:appWrapItems.popupNotificationMsgs,
        popupMessages: [],
        userPhoto: '',
        token: ""
      };
    },
    
    methods: {
      getUser, handleToggleWrapperTheme, openAccountPage, myProfile, logout, headerHelpClick, headerActionCall, openPopupNotification
    }
  
  }
  </script>
  