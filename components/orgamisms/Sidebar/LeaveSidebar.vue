<template>
  <div>
    <action-sidebar
      @close="closeSidebar"
      :className="slideClass"
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
                :message="getMessage(leaveStatus.status)"
                :icon="getLeaveStatusIcon(leaveStatus.status)"
                :variant="getLeaveTypeIconVariant(leaveStatus.status)"
                :className="getLeaveTypeClassName(leaveStatus.status)"
                :classNameWrapper="getTextVariant(leaveStatus.status)"
              ></info-card-success>
            </div>
            <div
              class="d-flex justify-end text-dark py-1"
              v-if="leaveStatus.status == 'pending'"
            >
              <bib-button
                :icon="$button.delete.icon"
                :variant="$button.delete.variant"
                :scale="$button.delete.scale"
                :label="$button.delete.label"
                class="mr-05"
                pill
                @click="deleteLevaeVacation(leaveStatus.id)"
              ></bib-button>
            </div>
          </div>
        </div>
      </template>
    </action-sidebar>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
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
import { popupNotificationMsgs } from "@/utils/constant/Notifications";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";
import {
  TABLE_HEAD,
  apiKeyUsedValue,
  apiKeyAllowanceValue,
} from "@/utils/constant/Constant";
import {
  deleteLevaeVacation,
} from "../../../utils/functions/functions_lib_api";
export default {
  props: {
    leaveData: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
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
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{ label: "", value: "" }, ...reportTo];
      this.employeeNameSelectShow = true;
    });
    this.$root.$on("open-sidebar", (item) => {
      this.leaveDetail(item);
    });
    this.$root.$on("close-sidebar", () => {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    });
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
    getMessage(MESSAGE) {
      const messageStatus = {
        approved: `Request approved by ${getEmployeeFullName(
          this.form.manager
        )}`,
        pending: "Pending",
        rejected: this.form.refusalReason,
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
      if (item.type === "other") {
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
      await this.$store
        .dispatch("leavesdata/setLeaveVacationsAllowance", item.employeeId)
        .then((result) => {
          this.allowanceLeavesDetailedData = result;
          this.is_data_fetched = true;
        });
    },

    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
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
