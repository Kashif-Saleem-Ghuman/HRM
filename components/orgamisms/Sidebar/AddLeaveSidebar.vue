<template>
  <div>
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
            :allowanceDays="getAllownaceDataValue"
            :usedDays="useDaysDataValue"
            :daysUsedCarryOver="allowanceLeavesDetailedData.vacationCarryOver"
            :employeeNameSelect="employeeNameSlectedValue"
            :key="addLeaveKey"
            :activeUserAllowanceData="getAllownaceDataValue"
            :edit="true"
            style="z-index: 999"
          ></add-leave>
        </div>
      </template>
      <template v-slot:sidebar-footer>
        <div>
          <div class="text-right">
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'gray' : 'secondary'"
              size="lg"
              @click="closeSidebar"
            ></bib-button>
            <bib-button
              label="Save"
              variant="primary-24"
              size="lg"
              @click.native.stop="handleSingleClick"
              @dblclick.native.stop="handleDoubleClick"
            ></bib-button>
          </div>
        </div>
      </template>
    </action-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { getEmployeeFullName } from "@/utils/functions/common_functions";
import { addLeaveVacations } from "@/utils/functions/functions_lib_api";

import {
  SELECT_OPTIONS,
  REQUEST_TYPE_OPTIONS,
  apiKeyUsedValue,
  apiKeyAllowanceValue,
} from "@/utils/constant/Constant";
import {
  addHandleInput,
  selectUserHandle,
  selectLeaveTypeHandle,
} from "@/utils/functions/functions_lib";
const OPEN_SIDEBAR_EVENT = "open-sidebar-admin";
const CLOSE_SIDEBAR_EVENT = "close-sidebar-main";
const ADD_LEAVE_KEY = "add-leave";

export default {
  props: {
    leaveData: {
      type: [Array, String],
      default: "",
    },
  },
  data() {
    return {
      openSidebar: false,
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
        isHalfDay: null,
      },
      allowanceDays: "",
      sidebarHeading: "",
      sidebarHeadingIcon: "",
      addLeaveKey: 0,
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
      isHalfday: false,
      clickTimeout: null,
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = reportTo;
      this.employeeNameSelectShow = true;
    });
    this.$store.dispatch("leavesdata/setLeaveVacationsAllowanceUser");
    this.registerRootListeners();
  },
  computed: {
    ...mapGetters({
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
      this.leaveType = this.leaveRequestTypes[this.leaveTypeActiveValue].type;
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
  mounted() {
    this.registerRootListeners();
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = reportTo;
      this.employeeNameSelectShow = true;
    });

    const user = this.$store.state.employee.activeUser;
    this.employeeNameSelect = user.id;
    this.employeesOptions = this.getReportList;
  },
  methods: {
    getEmployeeFullName,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    addHandleInput,
    selectUserHandle,
    selectLeaveTypeHandle,
    addLeaveVacations,
    closeSidebarFun() {
      this.openSidebar = false;
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(this.closeSidebarFun, 700);
    },
    async addLeave(payload, key) {
      this.id = this.$route.params.id ?? this.getActiveUser?.id;
      if (this.$route.params.id) {
        this.$store.dispatch("employee/setUser", this.id).then((result) =>{
          this.employeeName = getEmployeeFullName(result);
        });
        this.$store.dispatch("employee/setUser", this.id);
        await this.$store
          .dispatch("leavesdata/setLeaveVacationsAllowance", {
            id: this.id,
          })
          .then((result) => {
            this.allowanceLeavesDetailedData = result;
            this.is_data_fetched = true;
          });
      } else {
        this.employeeName = getEmployeeFullName(this.getActiveUser);
        await this.$store
          .dispatch("leavesdata/setLeaveVacationsAllowanceUser")
          .then((result) => {
            this.allowanceLeavesDetailedData = result;
            this.is_data_fetched = true;
          });
      }
      this.slideClass = "slide-in";
      if (payload === this.leaveRequestTypes[payload].type) {
        if (key == "employeeDropdownKey") {
          (this.leaveTypeActiveValue = payload),
            (this.employeeNameInput = false);
          this.employeeNameSelectShow = true;
          this.leaveTypeSelect = true;
          this.openSidebar = true;
          this.leaveType = this.leaveRequestTypes.leave.type;
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
    },
    registerCloseSideBarRootListener() {
      this.$root.$on(CLOSE_SIDEBAR_EVENT, () => {
        this.slideClass = "slide-out";
        setTimeout(this.closeSidebarFun, 700);
      });
    },
    unregisterCloseSideBarRootListener() {
      this.$root.$off(CLOSE_SIDEBAR_EVENT);
    },
    registerOpenSideBarRootListener() {
      this.$root.$on(OPEN_SIDEBAR_EVENT, (payload, key) => {
        this.addLeave(payload, key);
      });
    },
    unregisterOpenSideBarRootListener() {
      this.$root.$off(OPEN_SIDEBAR_EVENT);
    },
    registerAddLeaveRootListener() {
      this.$root.$on(ADD_LEAVE_KEY, () => {
        this.addLeaveKey += 1;
      });
    },
    unregisterAddLeaveRootListener() {
      this.$root.$off(ADD_LEAVE_KEY);
    },
    registerRootListeners() {
      this.registerOpenSideBarRootListener();
      this.registerCloseSideBarRootListener();
      this.registerAddLeaveRootListener();
    },
    unregisterRootListeners() {
      this.unregisterCloseSideBarRootListener();
      this.unregisterOpenSideBarRootListener();
      this.unregisterAddLeaveRootListener();
    },
    handleSingleClick() {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = setTimeout(() => {
        this.addLeaveVacations();
      }, 300);
    },
    handleDoubleClick() {
      clearTimeout(this.clickTimeout);
      this.addLeaveVacations();
    },
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },
};
</script>

<style lang="scss">
.minus-ml {
  margin-left: -8px;
}
.upper-case {
  text-transform: capitalize;
}
</style>
