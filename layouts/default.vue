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
          @logout="$signOut"
          @side-menu-expand="collapseNavigation1 = !collapseNavigation1"
          :isLightTheme="lightThemeChecked"
          noResultText="No result"
        >
          <!-- <template #avatar_menu>
            <avatar-sub-menu
              @logout="$logout"
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
              <div>
                <add-leave
                  :employeeName="employeeName"
                  :leaveTypeOptions="leaveTypeOptions"
                  :leaveType="leaveType"
                  @input="addHandleInput"
                  @change="addHandleInput"
                  @selectLeaveType="selectLeaveTypeHandle"
                  @selectUser="selectUserHandle"
                  :employeeNameInput="employeeNameInput"
                  :employeeNameSelectShow="employeeNameSelectShow"
                  :employeesOptions="employeesOptions"
                  :leaveTypeSelect="leaveTypeSelect"
                  style="z-index: 100000"
                  :allowanceDays="allowanceDays"
                  :usedDays="useDaysDataValue"
                  :employeeNameSelect="employeeNameSlectedValue"
                  :key="addLeaveKey"
                  :errorMsgSelect="errorMsgSelect"
                  :errorMsgStartDate="errorMsgStartDate"
                  :errorMsgEndDate="errorMsgEndDate"
                ></add-leave>
              </div>
            </template>
            <template v-slot:sidebar-footer>
              <div class="">
                <div style="text-align: right">
                  <bib-button
                    label="Cancel"
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

        <div>
          <bib-clock-wrapper
            @close="close()"
            @click:outside="close()"
            title="Business in box / Timer"
            :clockModal="clockModal"
            v-if="clockModal"
          >
          </bib-clock-wrapper>
        </div>
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
  getUserLeavesDetail,
  getUserLeavesDetailUser,
} from "../utils/functions/functions_lib_api";
import {
  addHandleInput,
  selectUserHandle,
  selectLeaveTypeHandle,
} from "../utils/functions/functions_lib";
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
      clockModal: false,
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
      useDaysData: "",
      leaveType: "vacation",
      employeeName: "",
      leaveTypeOptions: SELECT_OPTIONS.leaveType,
      leaveType: "",
      addForm: {
        employeeId: "",
        type: "",
        start: "",
        end: "",
      },
      allowanceDays: "",
      sidebarHeading: "",
      addLeaveKey: 0,
      errorMsgSelect: false,
      errorMsgStartDate: false,
      errorMsgEndDate: false,
      popupMessages: [],
      employeeNameInput: false,
      leaveTypeSelect: false,
      employeeNameSelect: "",
      employeeNameSelectShow: false,
      employeesOptions: [],
      userId: "",
      allowanceLeavesDetailedData: [],
      activeUserData: [],
      activeUserAllowanceData: [],
      is_leave_data_fetched: false,
      apiCall: true,
      token: "",
      // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJES2dsOWF2Mk53bmFHMXZ6Iiwic3ViZSI6InZpc2h3YWplZXQubWFuZGFsQHFzc3RlY2hub3NvZnQuY29tIiwic3VicyI6IkFDVElWRSIsInN1YmIiOiJPM0dXcG1iazVlekpuNEtSIiwic3ViYnMiOiJDTElFTlQiLCJzdWJyIjoiVVNFUiIsInN1YmMiOiJDYW5hZGEiLCJlbnYiOiJkZXYiLCJpYXQiOjE2ODg0NDk2Nzg2NzUsImV4cCI6MTY5NjIyNTY3ODY3NSwianRpIjoiNjA0OTU1ZTEtZjc2OC00YmUzLTkxYzgtYmI0ZGM2NWM5NzBhIn0.kiUQRmE4VSwFx3augkQtUAEdpuzGkmV7GVBKt7VDifg",
      // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQeTdMRGR3cE9xMWUxWUtYIiwic3ViZSI6ImNoYXJhbi5wYWxAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJBRE1JTiIsInN1YmMiOiJDYW5hZGEiLCJlbnYiOiJkZXYiLCJpYXQiOjE2OTI4NTE5NDE2NzIsImV4cCI6MTcwMDYyNzk0MTY3MiwianRpIjoiMzU2YmM4OTUtNjE3Mi00NjE3LTk2NzEtNWI5NmU0OWIzMGEwIn0.0zMvHg45zgJ6L51qGICZRa31xzA3t9OzyKPXp5YuqTs",
      // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQeTdMRGR3cE9xMWUxWUtYIiwic3ViZSI6ImNoYXJhbi5wYWxAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJBRE1JTiIsInN1YmMiOiJDYW5hZGEiLCJlbnYiOiJkZXYiLCJpYXQiOjE2OTU3MTEwMzUzMjIsImV4cCI6MTcwMzQ4NzAzNTMyMiwianRpIjoiMzdjZDBiMTgtNTM3Ny00YmE5LWJlMjYtN2E4NGMyYzljNmE0In0.3kurbz7bgxglx68szCzKarrdKZDy_uUytwQNX-hMot4",
      // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnRUxZcWFRV1FHOWRuamsyIiwic3ViZSI6InJhamVldi5zaGFybWFAcXNzdGVjaG5vc29mdC5jb20iLCJzdWJzIjoiQUNUSVZFIiwic3ViYiI6Ik8zR1dwbWJrNWV6Sm40S1IiLCJzdWJicyI6IkNMSUVOVCIsInN1YnIiOiJVU0VSIiwic3ViYyI6IkNhbmFkYSIsImVudiI6ImRldiIsImlhdCI6MTY5MjI4NTc0MDgwNiwiZXhwIjoxNzAwMDYxNzQwODA2LCJqdGkiOiI3NzkwMWFiMy1hMTlhLTRhMjItYjA4My1lZmIyODlkZTk5ZGQifQ.RlizfkgCHRqfHMf0PzIgBPxdqcL0pz3TA8PrnBdJXFk"
    };
  },
  fetch() {
    this.token = this.$cookies.get(process.env.SSO_COOKIE_NAME);
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getUserRole: "token/getUserRole",
      getUser: "token/GET_USER",
      getActiveUser: "employee/GET_USER",
      getformToDate: "leavevacation/getformToDate",
      getReportList: "employee/GET_REPORTS_LIST",
      getLeaveAllowance: "leavesdata/getLeaveAllowance",
    }),
    useDaysDataValue(){
      return this.useDaysData
    },
    employeeNameSlectedValue(){
      return this.employeeNameSelect
    }
  },
  async created() {
    // this.routesCheck();
    if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
      let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
      localStorage.setItem("accessToken", jwt);
      this.token = jwt;
      this.$store.dispatch("token/setToken", jwt);
    } else {
      localStorage.setItem("accessToken", this.token);
      this.$store.dispatch("token/setToken", this.token);
    }
    this.$root.$on("open-sidebar", (payload) => {
      this.employeeNameSelectShow = false;
      this.slideClass = "slide-in";

      if (payload === "leave") {
        this.useDaysData = this.activeUserAllowanceData.otherLeavesUsed;
        this.sidebarHeading = "Request Leave";
        this.addForm.type = "leave";
        this.allowanceDays = 12;
        this.openSidebar = true;
        this.employeeNameInput = true;
        this.employeeNameSelectShow = false;
      }
      if (payload == "vacation") {
        this.sidebarHeading = "Request Vacation";
        this.addForm.type = "vacation";
        this.allowanceDays = 30;
        this.openSidebar = true;
        this.employeeNameInput = true;
        setTimeout(() => {
          this.useDaysData = this.activeUserAllowanceData.vacationsUsed;
        }, 1000);
      }

      if (payload == "medical") {
        this.sidebarHeading = "Request Medical/sick";
        this.addForm.type = "medical";
        this.allowanceDays = 10;
        this.openSidebar = true;
        this.employeeNameInput = true;

        setTimeout(() => {
          this.useDaysData = this.activeUserAllowanceData.medicalLeavesUsed;
        }, 1000);
      }
      this.employeeName =
        this.activeUserData.firstName + " " + this.activeUserData.lastName;
    });
    this.$root.$on("open-sidebar-admin", (payload) => {
      var userId = this.$route.params.id;
      // this.employeeNameSelect = this.activeUserData.id;
      // use case people page
      this.useDaysData = "";
      this.leaveTypeSelect = false;
      this.employeeNameInput = false;
      this.employeeName =
        this.getActiveUser.firstName + " " + this.getActiveUser.lastName;
      this.slideClass = "slide-in";
      if (payload === "leave") {
        this.sidebarHeading = "Request Leave";
        this.addForm.employeeId = userId;
        this.addForm.type = "leave";
        this.allowanceDays = 12;
        this.openSidebar = true;
        this.employeeNameInput = true;
        this.employeeNameSelectShow = false;
        setTimeout(() => {
          this.useDaysData = this.getLeaveAllowance?.otherLeavesUsed;
        }, 1000);
        return true;
      }
      if (payload == "vacation") {
        this.sidebarHeading = "Request Vacation";
        this.addForm.type = "vacation";
        this.allowanceDays = 30;
        this.openSidebar = true;
        this.employeeNameInput = true;
        this.employeeNameSelectShow = false;
        this.addLeaveKey += 1;
        setTimeout(() => {
          this.useDaysData = this.getLeaveAllowance?.vacationsUsed;
        }, 1000);
        return true;
      }

      if (payload == "medical") {
        this.sidebarHeading = "Request Medical/sick";
        this.addForm.type = "medical";
        this.allowanceDays = 10;
        this.openSidebar = true;
        this.employeeNameInput = true;
        this.employeeNameSelectShow = false;
        setTimeout(() => {
          this.useDaysData = this.getLeaveAllowance?.medicalLeavesUsed;
        }, 1000);
        return true;
      }
      if (payload == "leaveAdmin") {
        this.$store.dispatch("employee/setActiveUser").then((user) => {
          var activeId = user.id;
          this.activeUserData = user;
          this.employeeNameSelect = activeId;
          console.log(this.activeUserData, "getActiveUser");
        });
        this.getUserLeavesDetail(this.getActiveUser.id).then((result) => {
          this.activeUserAllowanceData = result;
          // this.employeeNameSelect = result.id;
        });
        this.addLeaveKey += 1;
        this.sidebarHeading = "Request Leave";
        this.openSidebar = true;
        this.addForm.type = "leave";
        this.leaveTypeSelect = true;
        this.leaveType = "leave";
        this.allowanceDays = 12;
        this.employeeNameSelectShow = true;
        this.$nuxt.$emit("add-leave");
        setTimeout(() => {
          this.useDaysData = this.activeUserAllowanceData?.otherLeavesUsed;
        }, 1000);

        return true;
      }
      if (payload == "vacationAdmin") {
        this.$store.dispatch("employee/setActiveUser").then((user) => {
          var activeId = user.id;
          this.activeUserData = user;
          this.employeeNameSelect = activeId;
          console.log(this.activeUserData, "getActiveUser");
        });
        this.employeeNameSelect = this.getActiveUser.id;
        this.sidebarHeading = "Request Vacation";
        this.allowanceDays = 30;
        this.openSidebar = true;
        this.addForm.type = "vacation";
        this.leaveTypeSelect = true;
        this.leaveType = "vacation";
        this.employeeNameSelectShow = true;
        this.$nuxt.$emit("add-leave");
        this.useDaysData = this.activeUserAllowanceData?.vacationsUsed;
        return true;
      }
    });
    this.$root.$on("close-sidebar", () => {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    });
    this.$root.$on("clock-in", () => {
      this.clockModal = true;
    });
    this.$root.$on("add-leave", () => {
      this.addLeaveKey += 1;
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
          this.$store.dispatch("employee/setReportsToList");
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    } else {
      window.location.href =
        process.env.AUTH_REDIRECT_URL + "http://dev-hrm.business-in-a-box.com/";
    }
    await this.$store.dispatch("employee/setActiveUser").then((user) => {
      var activeId = user.id;
      this.activeUserData = user;
      this.employeeNameSelect = activeId;
      console.log(this.activeUserData, "getActiveUser");
    });
    if (this.getUserRole == "ADMIN") {
      if (this.$route.params.id) {
        await this.getUserLeavesDetail(this.$route.params.id).then((result) => {
          this.activeUserAllowanceData = result;
          // this.employeeNameSelect = result.id;
        });
      } else {
        await this.getUserLeavesDetail(this.getActiveUser.id).then((result) => {
          this.activeUserAllowanceData = result;
          // this.employeeNameSelect = result.id;
        });
      }
    } else {
      await this.getUserLeavesDetailUser(this.getActiveUser.id).then(
        (result) => {
          this.activeUserAllowanceData = result;
          // this.employeeNameSelect = result.id;
          console.log(this.activeUserAllowanceData, "data");
          this.addForm.employeeId = this.getActiveUser.id;
        }
      );
    }
    this.employeesOptions = this.getReportList;
    this.loading = false;
  },
  methods: {
    isThemeCheck,
    getBusinessId,
    handleToggleWrapperTheme,
    getAllowanceDays,
    addLeaveVacations,
    addHandleInput,
    getUserLeavesDetail,
    openAccountPage,
    myProfile,
    logout,
    headerHelpClick,
    headerActionCall,
    openPopupNotification,
    routesCheck,
    selectUserHandle,
    selectLeaveTypeHandle,
    getUserLeavesDetailUser,
    close() {
      this.clockModal = false;
    },
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
