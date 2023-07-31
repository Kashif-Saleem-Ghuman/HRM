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
          @support-link="headerHelpClick()"
          @my-account-link="myProfile"
          :avatarLink="userPhoto"
          @logout="logout"
          @side-menu-expand="collapseNavigation1 = !collapseNavigation1"
          :isLightTheme="lightThemeChecked"
          noResultText="No result"
        >
          <!-- <template #avatar_menu>
            <avatar-sub-menu
              @logout="logout"
              @openAccountPage="openAccountPage"
              @myProfile="myProfile"
            ></avatar-sub-menu>
          </template> -->
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
          :className="lightThemeChecked ? 'custom-menu' : 'custom-menu-light'"
          :sectionHead="
            lightThemeChecked ? 'section-head_light' : 'section-head_dark'
          "
          :adminMenu="userRole === 'ADMIN' ? 'adminMenu' : ''"
          :userMenu="userRole === 'USER' ? 'userMenu' : ''"
        ></app-menu>
      </template>
      <template #content>
        <div id="main-content">
          <Nuxt />
          <loader v-bind:showloader="loading"></loader>
          <action-sidebar
            @close="closeSidebar"
            :className="slideClass"
            :heading="sidebarHeading"
            v-show="openSidebar"
          >
            <template v-slot:sidebar-body>
              <add-leave
              :employeeName="employeeName"
                :leaveTypeOptions="leaveTypeOptions"
                @input="addHandleInput"
                @change="addHandleInput"
                style="z-index: 100000"
                :allowanceDays="allowanceDays"
                :usedDays="allowanceData?.daysUsed"
                :key="addLeaveKey"
                :errorMsgSelect="errorMsgSelect"
                :errorMsgStartDate="errorMsgStartDate"
                :errorMsgEndDate="errorMsgEndDate"
              ></add-leave>
            </template>
            <template v-slot:sidebar-footer>
              <div class="">
                <div style="text-align: right">
                  <bib-button
                    label="Cancle"
                    variant="gray"
                    size="lg"
                    v-on:click="closeSidebar"
                  ></bib-button>
                  <bib-button
                    label="Save"
                    variant="success"
                    size="lg"
                    v-on:click="addLeaveVacations()"
                  ></bib-button>
                </div>
              </div>
            </template>
          </action-sidebar>
        </div>
        <bib-notification :popupMessages="popupMessages"></bib-notification>
      </template>
    </bib-app-wrapper>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import {
  addLeaveVacations,
  getAllowanceDays,
} from "../utils/functions/functions_lib_api";
import { addHandleInput } from "../utils/functions/functions_lib";
import { SELECT_OPTIONS } from "../utils/constant/Constant";
import getJson from "../utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();
import {
  // getUser,
  handleToggleWrapperTheme,
  openAccountPage,
  myProfile,
  logout,
  headerHelpClick,
  headerActionCall,
  openPopupNotification,
  isThemeCheck,
  getBusinessId,
} from "../utils/functions/functions_lib.js";

import routesCheck from "../middleware/routes.client";
export default {
  data() {
    return {
      openSidebar: false,
      openSidebar2: false,
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
      userRole: "",
      addVacationSidebar: true,
      slideClass: "slide-in",
      allowanceData: "",
      leaveType: "vacation",
      employeeName: "",
      leaveTypeOptions: SELECT_OPTIONS.leaveType,
      addForm: {
        type:'',
        start:'',
        end:'',
      },
      allowanceDays:"",
      sidebarHeading: "",
      addLeaveKey:0,
      errorMsgSelect:false,
      errorMsgStartDate:false,
      errorMsgEndDate:false,
      popupMessages: [],
      token: "",
      // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQeTdMRGR3cE9xMWUxWUtYIiwic3ViZSI6ImNoYXJhbi5wYWxAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJBRE1JTiIsInN1YmMiOiJDYW5hZGEiLCJlbnYiOiJkZXYiLCJpYXQiOjE2ODc3NjcxMTE4MDQsImV4cCI6MTY5NTU0MzExMTgwNCwianRpIjoiZmQzOGViMGMtNzZkMS00ZDM1LWI0ZjEtZjQ3ZTdkOGE2YTg0In0.3GlavEBOTcxMq7UqdwiPy0bbTpLLw6WBVUeemfSQF6s"
    };
  },
  fetch() {
    this.token = this.$cookies.get(process.env.SSO_COOKIE_NAME);
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getUserRole: "token/getUserRole",
      getUserId: "token/getUserId",
      getActiveUser: "employee/GET_USER",
      getformToDate:"leavevacation/getformToDate"
    }),
  },
  async created() {
    
    // this.routesCheck();
    if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
      let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
      localStorage.setItem("accessToken", jwt);
      this.token = jwt;
      this.$store.dispatch("token/setToken", jwt);
      console.log(this.getAccessToken, "getAccessToken")
    } else {
      localStorage.setItem("accessToken", this.token);
      this.$store.dispatch("token/setToken", this.token);
    }
     await this.$store.dispatch("employee/setActiveUser");
    this.activeUserData = this.getActiveUser;
    this.employeeName =
      this.activeUserData.firstName +
      " " +
      this.activeUserData.lastName
    this.$root.$on("open-sidebar", (payload) => {
      this.slideClass = "slide-in";
     
      if (payload == "leave") {
        this.sidebarHeading = "Request leave";
        this.addForm.type = "leave"
        this.allowanceDays = 6
        this.openSidebar = true;
      }
      if (payload == "vacation") {
        this.sidebarHeading = "Request vacation";
        this.addForm.type = "vacation"
        this.allowanceDays = 30
        this.openSidebar = true;
      }
      if (payload == "medical") {
        this.sidebarHeading = "Request medical/sick";
        this.addForm.type = "medical"
        this.allowanceDays = 10
        this.openSidebar = true;
      }
      if (payload == "requestLeave") {
        this.sidebarHeading = "Request leave";
        this.openSidebar = true;
      }
      console.log(this.addForm.type, "this.addForm.type")
    });
    this.$root.$on("close-sidebar", () => {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    });
    this.$root.$on("add-leave", () => {
      this.addLeaveKey +=1;
      this.errorMsgSelect = false
      this.errorMsgStartDate = false
      this.errorMsgEndDate = false
    });
  },
  async mounted() {
    this.loading = true;
    let accessToken = localStorage.getItem("accessToken");
    let cookies = this.$cookies.get(process.env.SSO_COOKIE_NAME);
    this.isThemeCheck();
    if (accessToken && cookies) {
      axios
        .post(process.env.USER_AUTH_API_ENDPOINT, {
          ssojwt: accessToken,
        })
        .then((res) => {
          if (res) {
            this.token = res.data.jwt;
            var businessId = res?.data?.u?.subb;
            var userRole = res?.data?.u?.subr;
            var userId = res?.data?.u?.sub;
            console.log(userId, "userIduserIduserIduserId")
            this.accountType =
              res?.data?.u?.subbs == "FREETRAIL"
                ? "See Plans & Pricing"
                : "Upgrade";
            localStorage.setItem("businessId", businessId);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("userId", userId);
            this.userRole = userRole;
            this.$store.dispatch("token/setActiveUserRole", userRole);
            
          }
          // this.getUser();
          this.getBusinessId();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    } else {
      // window.location.href =
      //   process.env.AUTH_REDIRECT_URL + "http://dev-hrm.business-in-a-box.com/";
    }
    this.getAllowanceDays().then((result) => {
          this.allowanceData = result;
          // this.temKey += 1;
        });
    this.loading = false;
  },
  methods: {
    isThemeCheck,
    getBusinessId,
    handleToggleWrapperTheme,
    getAllowanceDays,
    addLeaveVacations,
    addHandleInput,
    openAccountPage,
    myProfile,
    logout,
    headerHelpClick,
    headerActionCall,
    openPopupNotification,
    routesCheck,
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
        this.openSidebar2 = false;
      }, 700);
    },
  },
};
</script>
