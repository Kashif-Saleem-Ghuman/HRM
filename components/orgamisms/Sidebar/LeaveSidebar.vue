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
          :usedDays="useDaysDataValue"
          :employeeNameSelect="employeeNameSlectedValue"
          :employeesOptions="employeesOptions"
          :employeeNameSelectShow="employeeNameSelectShow"
          :key="addLeaveKey"
          :startDate="startDate"
          :endDate="endDate"
          :showAllowance="showAllowance"
          :note="form.note"
          inActive="disabled"
          :edit="false"
        ></add-leave>
        <div class="row">
          <div class="col-12">
            <div>
              <info-card-success
                :label="getStatusLabel(leaveStatus.status)"
                :managerAction="getMessage(leaveStatus.status)"
                :icon="getStatusLabel(leaveStatus.status) === 'Rejected' ? 'tick' : getLeaveStatusIcon(leaveStatus.status)"
                :variant="getLeaveTypeIconVariant(leaveStatus.status)"
                :className="getLeaveTypeClassName(leaveStatus.status)"
                :classNameWrapper="getTextVariant(leaveStatus.status)"
                :refusalReason="leaveStatus.refusalReason"
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
                @click="deleteConfirmation(leaveStatus.id)"
              ></bib-button>
            </div>
          </div>
        </div>
      </template>
    </action-sidebar>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <confirmation-modal
      :title="deleteModalContent.title"
      :confirmationMessage="deleteModalContent.message"
      :confirmastionMessageModal="confirmastionMessageModal"
      @close="closeconfirmastionMessageModal"
      @delete="deleteLevaeVacation(leaveStatus.id)"
    ></confirmation-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { DateTime } from "luxon";

import {
  getLeaveStatusIcon,
  getLeaveStatusIconVariant,
  getStatusIconVariant,
  getStatusLabel,
  getTextVariant,
  getLeaveTypeIconVariant,
  getLeaveTypeClassName,
} from "@/utils/functions/status-helpers";
import { getEmployeeFullName } from "@/utils/functions/common_functions";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";
import { DELETE_MESSAGE } from "@/utils/constant/ConfirmationMessage";

import {
  TABLE_HEAD,
  apiKeyUsedValue,
  apiKeyAllowanceValue,
} from "@/utils/constant/Constant";
import { deleteLevaeVacation } from "../../../utils/functions/functions_lib_api";

const OPEN_SIDEBAR_EVENT = "open-sidebar";
const CLOSE_SIDEBAR_EVENT = "close-sidebar";

export default {
  props: {
    leaveData: {
      type: [Array,String],
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
      leaveStatus: "",
      addLeaveKey: 0,
      employeeNameSelectShow: false,
      showAllowance: true,
      popupMessages: [],
      currentDate: fecha.format(new Date(), "YYYY-MM-DD"),
      deleteButtonShowHide: false,
      confirmastionMessageModal: false,
      deleteModalContent: DELETE_MESSAGE[1],
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{ label: "", value: "" }, ...reportTo];
      this.employeeNameSelectShow = true;
    });
    this.$store.dispatch("leavesdata/setLeaveVacationsAllowanceUser");
    this.registerRootListeners()
  },
  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getLeaveAllowance: "leavesdata/getLeaveAllowance",
    }),
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
      const leaveDate = DateTime.fromISO(this.leaveStatus.start).toFormat(
        "yyyy-MM-dd"
      );
      if (this.currentDate > leaveDate) {
        return;
      } else {
        if (this.leaveStatus.status != "rejected") {
          return (this.deleteButtonShowHide = true);
        }
      }
    },
  },
  mounted(){
    this.registerRootListeners()

  },
  methods: {
    getLeaveStatusIcon,
    getLeaveStatusIconVariant,
    getStatusIconVariant,
    getStatusLabel,
    getTextVariant,
    getLeaveTypeIconVariant,
    getLeaveTypeClassName,
    getEmployeeFullName,
    openPopupNotification,
    deleteLevaeVacation,
    deleteConfirmation(id) {
      this.deletedfileId = id;
      this.confirmastionMessageModal = true;
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    getMessage(MESSAGE) {
      const statusChangeDate = DateTime.fromISO(this.form.statusChangeDate).toFormat('dd-MM-yyyy');
      const messageStatus = {
        approved: `Request approved on ${statusChangeDate} by ${getEmployeeFullName(
          this.form.manager
        )}`,
        pending: "Pending",
        rejected: `Request Rejected on ${statusChangeDate} by ${getEmployeeFullName(
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
      this.leaveStatus = item;
      this.form = item;
      this.employeeNameSelect = item.employeeId;
      this.employeeName = this.getEmployeeFullName(item);
      this.startDate = fecha.format(new Date(this.form.start), "YYYY-MM-DD");
      this.endDate = fecha.format(new Date(this.form.end), "YYYY-MM-DD");

      if (this.$isAdmin()) {
        await this.$store
        .dispatch("leavesdata/setLeaveVacationsAllowance", {id:item.employeeId})
        .then((result) => {
          this.allowanceLeavesDetailedData = result;
          this.is_data_fetched = true;
        })
      }

      if (this.$isUser()) {
        await this.$store
        .dispatch("leavesdata/setLeaveVacationsAllowanceUser",)
        .then((result) => {
          this.allowanceLeavesDetailedData = result;
          this.is_data_fetched = true;
        })
      }
      ;
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
      this.$root.$off(CLOSE_SIDEBAR_EVENT)
    },
    registerOpenSideBarRootListener() {
      this.$root.$on(OPEN_SIDEBAR_EVENT, (item) => {
        this.leaveDetail(item);
      });
    },
    unregisterOpenSideBarRootListener() {
      this.$root.$off(OPEN_SIDEBAR_EVENT);
    },
    registerRootListeners() {
      this.registerOpenSideBarRootListener()
      this.registerCloseSideBarRootListener()
    },
    unregisterRootListeners() {
      this.unregisterCloseSideBarRootListener()
      this.unregisterOpenSideBarRootListener()
    }
  },

  beforeDestroy() {
    this.unregisterRootListeners()
  }
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
