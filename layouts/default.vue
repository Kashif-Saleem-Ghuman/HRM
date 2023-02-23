<template>
  <div>
    <bib-app-wrapper
      :navigationCollapsed="collapseNavigation1"
      :isLightTheme="lightThemeChecked"
    >
      <template #notification v-if="showNotification">
        <bib-notification-persistent
          @dismiss="
            () => {
              showNotification = false;
            }
          "
          :label="notificationText"
          :variant="notificationVariant"
        ></bib-notification-persistent>
      </template>
      <template #topbar>
        <bib-header
          mainAction="Upgrade"
          @callToAction="headerActionCall()"
          @callToActions="headerActionCallll()"
          @help-click="headerHelpClick()"
          :avatarLink="userPhoto"
          @side-menu-expand="collapseNavigation1 = !collapseNavigation1"
          :isLightTheme="lightThemeChecked"
          noResultText="No result"
        >
          <template #avatar_menu>
            <avatar-sub-menu
              @logout="logout"
              @openAccountPage="openAccountPage"
              @myProfile="myProfile"
            ></avatar-sub-menu>
          </template>
        </bib-header>
      </template>
      <template #switcher>
        <bib-app-switcher
          v-if="!collapseNavigation1"
          :menuItems="appWrapItems.appItems"
          :isLightTheme="lightThemeChecked"
          @toggle-theme="handleToggleWrapperTheme"
        >
        </bib-app-switcher>
      </template>
      <template #navigation>
        <app-menu
          :seprator="lightThemeChecked ? 'bg-secondary-sub3' : 'bg-dark-sub1'"
        ></app-menu>
      </template>
       <template #content>
        <div id="main-content">
          <Nuxt />
          <loader v-bind:showloader="loading" :text="loaderMessage"></loader>
          <transition name="drawer">
            <!-- <action-sidebar v-show="openSidebar"></action-sidebar> -->
          </transition>
        </div>
      </template>
    </bib-app-wrapper>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import getJson from "../utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();
import {
  getUser,
  getBusinessId,
  handleToggleWrapperTheme,
  openAccountPage,
  myProfile,
  logout,
  headerHelpClick,
  headerActionCall,
  openPopupNotification,
  isThemeCheck,
  getEmployess
} from "../utils/functions/functions_lib.js";
export default {
  data() {
    return {
      openSidebar: false,
      appWrapItems: appWrapItems,
      collapseNavigation1: false,
      lightThemeChecked: this.$cookies.get("isLightTheme") || false,
      showNotification: false,
      showPopup: false,
      loading: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      userPhoto: "",
      token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrNjFZUWRKNko3bGRPR3BKIiwic3ViZSI6ImRocnV2LnNoYXJtYUBxc3N0ZWNobm9zb2Z0LmNvbSIsInN1YnMiOiJBQ1RJVkUiLCJzdWJiIjoiTzNHV3BtYms1ZXpKbjRLUiIsInN1YmJzIjoiQ0xJRU5UIiwic3ViciI6IkFETUlOIiwic3ViYyI6IkNhbmFkYSIsImVudiI6ImRldiIsImlhdCI6MTY3Mjg5MjY3MzA2NiwiZXhwIjoxNjgwNjY4NjczMDY2LCJqdGkiOiIyMzk3NjMyMS1mYWNiLTQzYWQtOTFjOS0wOWQzMzU2NDQ1ZmUifQ.Vuzv8ejSvZMqshraxNek9dfHy4SonAazZJfHO2BN1bY",
      // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQeTdMRGR3cE9xMWUxWUtYIiwic3ViZSI6ImNoYXJhbi5wYWxAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJVU0VSIiwic3ViYyI6IkNhbmFkYSIsImVudiI6ImRldiIsImlhdCI6MTY3NzA2Mjc4NTgwOCwiZXhwIjoxNjg0ODM4Nzg1ODA4LCJqdGkiOiIxNDkxMTcxMi05OGY3LTRhZWEtOWYyYy1iMGUwYjdjZTU2OTEifQ.AC8sfqDv_nuiC0SVq_lM0ZohwhuSht52vs6FkpLd-Dk",
 
    };
  },
  fetch() {
    this.token = this.$cookies.get(process.env.SSO_COOKIE_NAME);
  },
  computed: {
    ...mapGetters(["getAccessToken"]),
  },
  created() {
    if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
      let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
      localStorage.setItem("accessToken", jwt);
      this.token = jwt;
      this.$store.dispatch("setToken", jwt);
    } else {
      localStorage.setItem("accessToken", this.token);
      this.$store.dispatch("setToken", this.token);
    }
    this.$root.$on('close-sidebar', () => {
      this.openSidebar = false
    })
  },
  async mounted() {
    this.loading = true;
    this.openPopupNotification(0);
    let accessToken = localStorage.getItem("accessToken");
    let cookies = this.$cookies.get(process.env.SSO_COOKIE_NAME);
    this.isThemeCheck();
    if (accessToken && cookies) {
      axios
        .post(
          "https://dev-account-api.business-in-a-box.com/v1/user/sso/verify",
          {
            token: accessToken,
          }
        )
        .then((res) => {
          if (res.data.code == "valid_token") {
            this.token = res.data.jwt;
            var userId = res?.data?.u?.sub;
            var businessId = res?.data?.u?.subb
            var userRole = res?.data?.u?.subr
            var userEmail = res?.data?.u?.sube
            localStorage.setItem("userID", userId);
            localStorage.setItem("businessId", businessId);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("userEmail", userEmail);
          }
          this.getUser();

          // this.getEmployess();
          this.getBusinessId();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    } else {
      window.location.href =
        process.env.AUTH_REDIRECT_URL + "http://dev-hrm.business-in-a-box.com/";
    }

    this.loading = false;
  },
  methods: {
    isThemeCheck,
    getUser,
    getBusinessId,
    handleToggleWrapperTheme,
    openAccountPage,
    myProfile,
    logout,
    headerHelpClick,
    headerActionCall,
    openPopupNotification,
    getEmployess
  },
};
</script>
