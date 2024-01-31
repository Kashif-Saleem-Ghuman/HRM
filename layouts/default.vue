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
          @search-enter="$router.push('/search')"
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
        <bib-notification
          :popupMessages="popupMessages"
          style="z-index: 9999999999999"
        ></bib-notification>

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

import { addLeaveVacations } from "../utils/functions/functions_lib_api";
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
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getUserRole: "token/getUserRole",
      getUser: "employee/GET_USER",
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
    this.$root.$on("open-sidebar-admin", (payload, key) => {
      this.id = this.$route.params.id ?? this.getActiveUser?.id;
      if (this.$route.params.id) {
        this.$store.dispatch("employee/setUser", this.getUser.id);
        this.employeeName = getEmployeeFullName(this.getUser);
      } else {
        this.employeeName = getEmployeeFullName(this.getActiveUser);
      }
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
    this.$root.$on("add-leave", () => {
      this.addLeaveKey += 1;
      this.errorMsgEndDate = false;
      this.errorMsgStartDate = false;
    });
  },
  async mounted() {
    this.loading = true;
    this.isThemeCheck();
    this.accountType = this.$store.state.token.accountType;
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{ label: "", value: "" }, ...reportTo];
      this.employeeNameSelectShow = true;
    });
    const user = this.$store.state.employee.activeUser;
    this.employeeNameSelect = user.id;
    this.employeesOptions = this.getReportList;

    this.setDebouncedSearch();
    this.loading = false;
  },
  methods: {
    getEmployeeFullName,
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
