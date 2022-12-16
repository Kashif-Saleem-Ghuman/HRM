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
        <bib-header hide-search-box
          mainAction="Upgrade" @callToAction="headerActionCall()" @help-click="headerHelpClick()"
          :avatarLink="userPhoto" @side-menu-expand="collapseNavigation1 = !collapseNavigation1"
          :isLightTheme="lightThemeChecked">
          <template #avatar_menu>
            <avatar-sub-menu @logout="logout" @openAccountPage="openAccountPage"
              @myProfile="myProfile"></avatar-sub-menu>
          </template>
        </bib-header>
      </template>
      <template #switcher>
        <bib-app-switcher v-if="!collapseNavigation1" :menuItems="appWrapItems.appItems"
          :isLightTheme="lightThemeChecked" @toggle-theme="handleToggleWrapperTheme">
        </bib-app-switcher>
      </template>
      <template #navigation>
        <app-menu :navItems="appWrapItems.navItems"
          :seprator="lightThemeChecked ? 'bg-secondary-sub3' : 'bg-dark-sub1'"></app-menu>
      </template>
      <template #content>
        <div id="main-content" class="p-1">
          <Nuxt />
        </div>
      </template>
    </bib-app-wrapper>
  </div>
</template>
  
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
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
      lightThemeChecked: this.$cookies.get("isLightTheme") || false,
      showNotification: false,
      showPopup: false,
      loading: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      userPhoto: '',
      token: "",
    };

  },
  fetch() {
    this.token = this.$cookies.get(process.env.SSO_COOKIE_NAME)
  },
  computed: {
    ...mapGetters(['getAccessToken']),
  },
  created() {
      if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
        let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
        console.log("call i item", jwt)
        localStorage.setItem('accessToken', jwt)
        this.token = jwt
        this.$store.dispatch('setToken', jwt)
      } else {
        localStorage.setItem('accessToken', this.token)
        this.$store.dispatch('setToken', this.token)
      }
    
  },
  mounted() {
    this.loading = true;
    this.openPopupNotification(0);
    this.loading = true;
    let accessToken = localStorage.getItem('accessToken');
    let cookies = this.$cookies.get(process.env.SSO_COOKIE_NAME);
    if (accessToken && cookies) {
      axios.post(process.env.SSO_URL, {
        "token": accessToken
      },
      ).then(res => {
        if (res.data.code == 'valid_token') {
          this.token = res.data.jwt;
          var userId = res?.data?.u?.sub
          localStorage.setItem('userID', userId)
        }
        this.getUser();
      }).catch(err => {
        this.loading = false;
        console.log(err)
      })
    } else {
        window.location.href = process.env.AUTH_REDIRECT_URL + "http://dev-hrm.business-in-a-box.com/"
    }

    this.loading = false;
  },
  methods: {
    getUser, handleToggleWrapperTheme, openAccountPage, myProfile, logout, headerHelpClick, headerActionCall, openPopupNotification
  }

}
</script>
  