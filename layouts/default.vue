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
          :mainAction="accountType"
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
          :userRole="userRole === 'ADMIN' ? 'userRole' : ''"
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
  handleToggleWrapperTheme,
  openAccountPage,
  myProfile,
  logout,
  headerHelpClick,
  headerActionCall,
  openPopupNotification,
  isThemeCheck,
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
      accountType: "",
      token: '',
     };
  },
  fetch() {
    this.token = this.$cookies.get(process.env.SSO_COOKIE_NAME);
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      userRole: "token/getUserRole",
    }),
  },
  // beforeMount() {
  //   localStorage.removeItem("userRole");
  //   localStorage.removeItem("userPhoto");
  // },
  created() {
    if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
      let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
      localStorage.setItem("accessToken", jwt);
      this.token = jwt;
      this.$store.dispatch("token/setToken", jwt);
    } else {
      localStorage.setItem("accessToken", this.token);
      this.$store.dispatch("token/setToken", this.token);
    }
  },
  async mounted() {
    this.loading = true;
    this.openPopupNotification(0);
    let accessToken = localStorage.getItem("accessToken");
    let cookies = this.$cookies.get(process.env.SSO_COOKIE_NAME);
    this.isThemeCheck();
    if (accessToken && cookies) {
      axios
        .post("https://dev-account-api.business-in-a-box.com/v1/user/sso/verify", {
          token: accessToken,
        })
        .then((res) => {
          if (res.data.code == "valid_token") {
            this.token = res.data.jwt;
            var businessId = res?.data?.u?.subb;
            var userRole = res?.data?.u?.subr;
            this.accountType =
              res?.data?.u?.subbs == "FREETRIAL"
                ? "See Plans & Pricing"
                : "Upgrade";
            localStorage.setItem("businessId", businessId);
            localStorage.setItem("userRole", userRole);
            // this.userRole = userRole
            this.$store.dispatch("token/setActiveUserRole", userRole);
            if (userRole === "USER") {
              if(this.$router.history.current.fullPath == '/people'){
                this.$router.push("/myprofile");
              }
              this.$router.push("/myprofile");
            } else {
              if(this.$router.history.current.fullPath == '/myprofile'){
                this.$router.push("/people");
              }
            }
          }
          this.getUser();
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
    handleToggleWrapperTheme,
    openAccountPage,
    myProfile,
    logout,
    headerHelpClick,
    headerActionCall,
    openPopupNotification,
  },
};
</script>
