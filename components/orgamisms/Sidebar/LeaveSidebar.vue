<template>
  <div>
    <action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      classMain="heightEdit"
      heading="Leave Details"
      icon="pencil"
      v-show="openSidebar"
    >
      <template v-slot:sidebar-body>
        <add-leave
          :employeeName="employeeName"
          :allowanceDays="getAllownaceDataValue"
          :daysUsedCarryOver="getLeaveAllowance.vacationCarryOver"
          :leaveType="leaveTypeActiveValue"
          :usedDays="useDaysDataValue"
          :employeeNameSelect="employeeNameSlectedValue"
          :employeesOptions="formattedEmployeesOptions"
          :employeeNameSelectShow="employeeNameSelectShow"
          :key="addLeaveKey"
          :startDate="startDate"
          :endDate="endDate"
          :showAllowance="showAllowance"
          :note="form.note"
          inActive="disabled"
          :isHalfDay="isHalfDay"
          :totalDays="totalDays"
          :shouldShowHalfDayCheckbox="isHalfDay"
          :edit="false"
        ></add-leave>
        <div class="row">
          <div class="col-12">
            <div>
              <info-card-success
                :label="$getStatusLabel(leaveStatus.status, isDone)"
                :managerAction="getMessage(leaveStatus.status)"
                :icon="
                  $getStatusLabel(leave.status) === 'Rejected'
                    ? 'tick'
                    : $getLeaveStatusIcon(leave.status)
                "
                :variant="$getLeaveTypeIconVariant(leave.status)"
                :className="$getLeaveTypeClassName(leave.status)"
                :classNameWrapper="$getTextVariant(leave.status)"
                :refusalReason="getReason(leave)"
              ></info-card-success>
            </div>
            <div class="d-flex justify-end text-dark py-1" v-if="showDelButton">
              <bib-button
                :icon="$button.delete.icon"
                :variant="$button.delete.variant"
                :scale="$button.delete.scale"
                :label="$button.delete.label"
                class="mr-05"
                pill
                @click="deleteConfirmation(leave.id)"
              ></bib-button>
            </div>
          </div>
        </div>
      </template>
    </action-sidebar>
    <confirmation-modal
      :title="deleteModalContent.title"
      :confirmationMessage="deleteModalContent.message"
      :confirmastionMessageModal="confirmastionMessageModal"
      @close="closeconfirmastionMessageModal"
      @on-click="deleteLevaeVacation(leave.id)"
    ></confirmation-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { DateTime } from "luxon";
import { DELETE_MESSAGE } from "@/utils/constant/ConfirmationMessage";

import {
  TABLE_HEAD,
  apiKeyUsedValue,
  apiKeyAllowanceValue,
} from "@/utils/constant/Constant";
import { deleteLevaeVacation } from "../../../utils/functions/functions_lib_api";
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";
import {calculateTotalDays} from '../../../utils/functions/common_functions'
import { DATEPICKER_FORMAT } from "../../../utils/functions/datetime-input";
import { formatLeaveDate, formatLeaveDurationDaysString } from "../../../utils/functions/leave-request-helper";

const OPEN_SIDEBAR_EVENT = "open-sidebar";
const CLOSE_SIDEBAR_EVENT = "close-sidebar";

export default {
  props: {
    leaveData: {
      type: [Array, String],
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      openSidebar: false,
      form: {},
      slideClass: "slide-in",
      startDate: "",
      endDate: "",
      employeeNameSelect: "",
      employeeName: "",
      employeesOptions: [],
      apiUsedValue: apiKeyUsedValue,
      apiAllowanceValue: apiKeyAllowanceValue,
      leave: "",
      addLeaveKey: 0,
      employeeNameSelectShow: false,
      showAllowance: true,
      currentDate: fecha.format(new Date(), "YYYY-MM-DD"),
      deleteButtonShowHide: false,
      confirmastionMessageModal: false,
      deleteModalContent: DELETE_MESSAGE[1],
      isHalfDay: null,
      leaveTypeActiveValue: "",
      totalDays:0,
      isDone: false,
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{ label: "", value: "" }, ...reportTo];
      this.employeeNameSelectShow = true;
    });
    this.registerRootListeners();
  },
  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getLeaveAllowance: "leavesdata/getLeaveAllowance",
    }),
    formattedEmployeesOptions() {
    if (Array.isArray(this.employeesOptions)) {
      return this.employeesOptions.map((employee) => {
        const truncatedLabel = this.$options.filters.truncate(employee.label, 80, "...");
        return {
          ...employee,
          label: truncatedLabel,
          title: employee.label,
        };
      });
    }
  },
    useDaysDataValue() {
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
    showDelButton() {
      const leaveDate = DateTime.fromISO(this.leave.start).toFormat(
        "yyyy-MM-dd"
      );
      if (this.currentDate > leaveDate) {
        return;
      } else {
        if (this.leave.status != "rejected") {
          return (this.deleteButtonShowHide = true);
        }
      }
    },
  },
  mounted() {
    this.registerRootListeners();
  },
  methods: {
    calculateTotalDays,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    deleteLevaeVacation,
    deleteConfirmation(id) {
      this.deletedfileId = id;
      this.confirmastionMessageModal = true;
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    getReason(leave){
      if(leave.status === 'approved'){
        return leave.approvalComment
      }
      return leave.refusalReason
    },
    getMessage(MESSAGE) {
      const statusChangeDate = DateTime.fromISO(
        this.form.statusChangeDate
      ).toFormat(DATETIME_FORMAT);
      const messageStatus = {
        approved: this.form.statusChangeDate === null
            ? "Request approved"
            : `Request approved on ${statusChangeDate} by ${this.$getEmployeeFullName(
                this.form.manager
              )}`,
        pending: "",
        rejected: `Request Rejected on ${statusChangeDate} by ${this.$getEmployeeFullName(
          this.form.manager
        )}`,
      };
      return (MESSAGE = messageStatus[MESSAGE]);
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    },
    async leaveDetail(item) {
      if (item.type === "other" || item.type === "approved") {
        this.showAllowance = false;
      } else {
        this.showAllowance = true;
      }
      this.slideClass = "slide-in";
      this.employeeNameSelectShow = true;
      this.addLeaveKey += 1;
      this.leaveTypeActiveValue = item.type;
      this.openSidebar = true;
      this.leave = item;
      this.form = item;
      this.employeeNameSelect = item.employeeId;
      this.employeeName = this.$getEmployeeFullName(item);
      this.startDate = formatLeaveDate(this.form.start, DATEPICKER_FORMAT);
      this.endDate = formatLeaveDate(this.form.end, DATEPICKER_FORMAT);

      this.isDone = item.isDone || false;
      // this.startDate = DateTime.fromISO(this.form.start, { zone: 'utc' }).toFormat(DATEPICKER_FORMAT);
      // this.endDate = DateTime.fromISO(this.form.end, { zone: 'utc' }).toFormat(DATEPICKER_FORMAT);
      //TODO This function is calculating calculateTotalDays but its not needed since we already have item.duration
      this.setIsHalfDay(item);
      this.totalDays = formatLeaveDurationDaysString(item.duration)
      // this.calculateTotalDays(this.startDate, this.endDate);
      if (this.$isAdmin()) {
        await this.$store
          .dispatch("leavesdata/setLeaveVacationsAllowance", {
            id: item.employeeId,
          })
          .then((result) => {
            this.allowanceLeavesDetailedData = result;
            this.is_data_fetched = true;
          });
      }

      if (this.$isUser()) {
        await this.$store
          .dispatch("leavesdata/setLeaveVacationsAllowanceUser")
          .then((result) => {
            this.allowanceLeavesDetailedData = result;
            this.is_data_fetched = true;
          });
      }
    },
    setIsHalfDay(item) {
        this.isHalfDay = item.isHalfDay
        this.calculateTotalDays(this.startDate, this.endDate)
    },
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
    registerCloseSideBarRootListener() {
      this.$root.$on(CLOSE_SIDEBAR_EVENT, () => {
        this.slideClass = "slide-out";
        setTimeout(() => {
          this.openSidebar = false;
        }, 700);
      });
    },
    unregisterCloseSideBarRootListener() {
      this.$root.$off(CLOSE_SIDEBAR_EVENT);
    },
    registerOpenSideBarRootListener() {
      this.$root.$on(OPEN_SIDEBAR_EVENT, (item) => {
        event.stopPropagation();
        this.$hideUserMenu();
        this.leaveDetail(item);
      });
    },
    unregisterOpenSideBarRootListener() {
      this.$root.$off(OPEN_SIDEBAR_EVENT);
    },
    registerRootListeners() {
      this.registerOpenSideBarRootListener();
      this.registerCloseSideBarRootListener();
    },
    unregisterRootListeners() {
      this.unregisterCloseSideBarRootListener();
      this.unregisterOpenSideBarRootListener();
    },
  },
  handleClickOutside() {
    this.$nuxt.$emit("close-sidebar");
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
