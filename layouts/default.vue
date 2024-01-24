<template>
  <div>
    <bib-app-wrapper
      :navigationCollapsed="collapseNavigation1"
      :isLightTheme="lightThemeChecked"
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
          :isLightTheme="lightThemeChecked"
          noResultText="No result"
          placeholderSearchbox="Search employee by name"
          @search-change="handleSearchChange"
          :search-data="$store.state.app.searchResults || []"
          :hideSearchBox="$store.state.token.isUser"
          class="app-wrapper--collapsed2"
        >
          <template>
            <search-content></search-content>
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
        <app-menu :sectionHead="!collapseNavigation1"></app-menu>
      </template>
      <template #content>
        <div id="main-content">
          <Nuxt />
          <!-- <loader :loading="loading"></loader> -->
          <action-sidebar
            @close="closeSidebar"
            :className="slideClass"
            classMain="height"
            :icon="sidebarHeadingIcon"
            :heading="sidebarHeading"
            v-if="openSidebar"
            show="true"
          >
            <template v-slot:sidebar-body>
              <div>
                <!-- TODO cleanup props -->
                <add-leave
                  :request="addForm"
                  :form="addForm"
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
                  :allowanceDays="getAllownaceDataValue"
                  :usedDays="useDaysDataValue"
                  :employeeNameSelect="employeeNameSlectedValue"
                  :key="addLeaveKey"
                  :errorMsgSelect="errorMsgSelect"
                  :errorMsgStartDate="errorMsgStartDate"
                  :errorMsgEndDate="errorMsgEndDate"
                  :errorMsgEndDateGreater="errorMsgEndDateGreater"
                  :addForm="addForm"
                  :activeUserAllowanceData="getAllownaceDataValue"
                  :edit="true"
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
                    @click="closeSidebar"
                  ></bib-button>
                  <bib-button
                    label="Save"
                    variant="primary-24"
                    size="lg"
                    @click="addLeaveVacations"
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
        <loader :loading="loading"></loader>
      </template>
    </bib-app-wrapper>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { debounce } from "lodash";

import {
  addLeaveVacations,
  getAllowanceDays,
} from "../utils/functions/functions_lib_api";
import {
  addHandleInput,
  selectUserHandle,
  selectLeaveTypeHandle,
} from "../utils/functions/functions_lib";
import {
  SELECT_OPTIONS,
  REQUEST_TYPE_OPTIONS,
  apiKeyUsedValue,
  apiKeyAllowanceValue,
} from "../utils/constant/Constant";
import getJson from "../utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();

import {
  handleToggleWrapperTheme,
  openAccountPage,
  myProfile,
  openBillingPage,
  openTeamPage,
  headerHelpClick,
  headerActionCall,
  openPopupNotification,
  isThemeCheck,
} from "../utils/functions/functions_lib.js";

import routesCheck from "../middleware/routes.client";
import { getEmployeeFullName } from "../utils/functions/common_functions";
export default {
  data() {
    return {
      debouncedSearch: null,
      openSidebar: false,
      openSidebar2: false,
      clockModal: false,
      appWrapItems: appWrapItems,
      collapseNavigation1: false,
      lightThemeChecked: this.$cookies.get("isLightTheme"),
      showNotification: false,
      showPopup: false,
      loading: false,
      popupMessages: [],
      userPhoto: "",
      accountType: "",
      userRole: "",
      slideClass: "slide-in",
      useDaysData: "",
      employeeName: "",
      leaveTypeOptions: SELECT_OPTIONS.leaveType,
      leaveType: "",
      addForm: {
        employeeId: null,
        type: null,
        start: null,
        end: null,
      },
      allowanceDays: "",
      sidebarHeading: "",
      sidebarHeadingIcon: "",
      addLeaveKey: 0,
      errorMsgSelect: false,
      errorMsgStartDate: false,
      errorMsgEndDate: false,
      errorMsgEndDateGreater: false,
      popupMessages: [],
      employeeNameInput: false,
      leaveTypeSelect: false,
      employeeNameSelect: "",
      employeeNameSelectShow: false,
      employeesOptions: [],
      activeUserData: [],
      activeUserAllowanceData: [],
      id: "",
      leaveRequestTypes: REQUEST_TYPE_OPTIONS,
      leaveTypeActiveValue: "",
      flag: false,
      apiUsedValue: apiKeyUsedValue,
      apiAllowanceValue: apiKeyAllowanceValue,
      token: "",
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
      getActiveUser: "employee/GET_ACTIVE_USER",
      getformToDate: "leavevacation/getformToDate",
      getReportList: "employee/GET_REPORTS_LIST",
      getLeaveAllowance: "leavesdata/getLeaveAllowance",
    }),
    useDaysDataValue() {
      this.sidebarHeading =
        this.leaveRequestTypes[this.leaveTypeActiveValue].label;
      this.sidebarHeadingIcon =
        this.leaveRequestTypes[this.leaveTypeActiveValue].icon;
      this.addForm.employeeId = this.id;
      this.addForm.type =
        this.leaveRequestTypes[this.leaveTypeActiveValue].type;
      const keyValue = this.apiUsedValue[this.leaveTypeActiveValue];
      return this.getLeaveAllowance[keyValue];
    },
    getAllownaceDataValue() {
      const keyValueAllowance =
        this.apiAllowanceValue[this.leaveTypeActiveValue];
      return this.getLeaveAllowance[keyValueAllowance];
    },
    employeeNameSlectedValue() {
      return this.employeeNameSelect;
    },
  },
  async created() {
    if (this.$cookies.get(process.env.SSO_COOKIE_NAME)) {
      let jwt = this.$cookies.get(process.env.SSO_COOKIE_NAME);
      localStorage.setItem("accessToken", jwt);
      this.token = jwt;
      this.$store.dispatch("token/setToken", jwt);
    } else {
      localStorage.setItem("accessToken", this.token);
      this.$store.dispatch("token/setToken", this.token);
    }
    this.$root.$on("open-sidebar-admin", (payload, key) => {
      this.id = this.$route.params.id ?? this.getActiveUser?.id;
      this.employeeName = getEmployeeFullName(this.getActiveUser);
      this.slideClass = "slide-in";
      if (payload === this.leaveRequestTypes[payload].type) {
        if (key == "employeeDropdownKey") {
          (this.leaveTypeActiveValue = payload),
            (this.employeeNameInput = false);
          this.employeeNameSelectShow = true;
          this.leaveTypeSelect = true;
          this.openSidebar = true;
          this.addForm.type = this.leaveRequestTypes.leave.type;
          this.addForm.employeeId = this.getActiveUser.id;
          this.addLeaveKey += 1;
          return true;
        } else {
          this.leaveTypeActiveValue = payload;
          this.openSidebar = true;
          this.employeeNameInput = true;
          this.employeeNameSelectShow = false;
          this.leaveTypeSelect = false;
          this.addForm.employeeId = this.id;
          this.addLeaveKey += 1;
          return true;
        }
      }
    });
    this.$root.$on("close-sidebar-main", () => {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    });
    this.$root.$on("clock-in", () => {
      this.clockModal = true;
    });
    this.$root.$on("notification", () => {
      alert("callled")
    });
    this.$root.$on("add-leave", () => {
      this.addLeaveKey += 1;
      this.errorMsgEndDate = false;
      this.errorMsgStartDate = false;
    });
  },
  async mounted() {
    this.loading = true
    if (!this.getJwtToken()) {
      this.redirectToLogin();
    }
    await this.loadUser();
    this.isThemeCheck();
    this.$store.dispatch("employee/setReportsToList");
    await this.$store.dispatch("employee/setActiveUser").then(async (user) => {
      await this.$store.dispatch("token/setActiveUserRole", { employee: user });
      var activeId = user.id;
      this.activeUserData = user;
      this.employeeNameSelect = activeId;
    });
    this.employeesOptions = this.getReportList;

    this.setDebouncedSearch();
    this.loading= false
  },
  methods: {
    getEmployeeFullName,
    redirectToLogin() {
      window.location.href =
        process.env.AUTH_REDIRECT_URL + process.env.HRM_APP_URL;
    },
    getJwtToken() {
      const accessToken = localStorage.getItem("accessToken");
      const cookies = this.$cookies.get(process.env.SSO_COOKIE_NAME);
      return accessToken ?? cookies;
    },
    async loadUser() {
      const token = this.getJwtToken();
      return this.$store
        .dispatch("token/validateJwtToken", { token })
        .then((res) => {
          if (res) {
            this.accountType = res.accountType;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    isThemeCheck,
    handleToggleWrapperTheme,
    getAllowanceDays,
    addLeaveVacations,
    addHandleInput,
    openAccountPage,
    myProfile,
    openTeamPage,
    openBillingPage,
    headerHelpClick,
    headerActionCall,
    openPopupNotification,
    routesCheck,
    selectUserHandle,
    selectLeaveTypeHandle,
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
