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
          <h1>Content Goes Here</h1>
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
import { mapGetters } from 'vuex';
import axios from 'axios';
import {getUser, handleToggleWrapperTheme, headerHelpClick, headerActionCall, openPopupNotification} from "../utils/functions/functions_lib.js"
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
      myProfile: process.env.USER_PROFILE_URL,
      userPhoto: '',
      token: ""
    };

  },
  fetch() {
    this.token = this.$cookies.get(process.env.SSO_COOKIE_NAME);
  },
  computed: {
    ...mapGetters(["getAccessToken"]),
  },
  created() {
    if (process.browser) {
      if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
        let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
        localStorage.setItem("accessToken", jwt);
        this.token = jwt;
        this.$store.dispatch("setToken", jwt);
      }
      else {
        localStorage.setItem("accessToken", this.token);
        this.$store.dispatch("setToken", this.token);
      }
    }
  },
  mounted() {
    this.loading = true;
    this.openPopupNotification(1);
    let accessToken = localStorage.getItem("accessToken");
    let cookies = this.$cookies.get(process.env.SSO_COOKIE_NAME);
    if (accessToken && cookies) {
            axios.post(process.env.VUE_APP_CONVERT_API_URL + "backend-api-goes-here", {}, {
                headers: {
                    "Authorization": accessToken
                }
            }).then(response => {
                if (response.data.code == "valid_token") {
                    this.token = response.data.jwt;
                    var userId = response?.data?.u?.sub;
                    localStorage.setItem("userID", userId);
                }
                this.getUser();
            }).catch(err => {
                this.loading = false;
                alert(err);
            });
        }else {
          // window.location.href = process.env.AUTH_REDIRECT_URL + process.env.HRM_APP_URL;
          console.log("redirect ok")
        }
  },
  methods: {
    getUser, handleToggleWrapperTheme, headerHelpClick, headerActionCall, openPopupNotification
  }

}
</script>
