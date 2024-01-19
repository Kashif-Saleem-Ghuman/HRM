<template>
  <div>
    <loader :loading="loading"></loader>

    <no-record v-if="showNoData"></no-record>

    <custom-table-day-view
      v-else-if="showTable"
      :fields="tableFields"
      class="bg-white"
      :sections="employees"
      :hide-no-column="true"
      :fixHeader="true"
    >
      <!-- Timsheet date range -->
      <template #cell(name)="data">
        <div
          class="d-flex align-center text-left gap-05"
          style="position: relative"
        >
          <div class="info_wrapper" style="padding-left: 8px">
            {{ formatIsoDateToYYYYMMDD(data.value.start) }} ->
            {{ formatIsoDateToYYYYMMDD(data.value.end) }}
          </div>
        </div>
      </template>

      <!-- Weekday cells -->
      <template v-for="day in weekDays" #[`cell(${day})`]="data">
        <chips
          :key="day + random(day)"
          :title="data.value[day] ? formatHoursToHHMM(data.value[day]) : '--'"
          :className="[getDayClassName(data.value[day])]"
        ></chips>
      </template>

      <template #cell(total)="data">
        <chips
          :title="
            data.value.total ? formatHoursToHHMM(data.value.total) : '00:00'
          "
          :className="['padding-0']"
        ></chips>
      </template>

      <template #cell(status)="data">
        <div class="text-dark">
          <dropdown-menu-chip
            :items="timesheetStatusOptions.slice(1)"
            :button-config="statusButtonConfig"
            @on-click="deleteConfirmation($event, data)"
          ></dropdown-menu-chip>
        </div>
      </template>
    </custom-table-day-view>
    <confirmation-modal
      :title="deleteModalContent.title"
      :confirmationMessage="deleteModalContent.message"
      :confirmastionMessageModal="confirmastionMessageModal"
      @delete="onStatusChange()"
      @close="closeconfirmastionMessageModal"
      :variant="variantButton"
    ></confirmation-modal>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>

<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import {
  TABLE_HEAD,
  TIMESHEET_STATUS,
  TIMESHEET_STATUSES,
  WEEK_DAY,
} from "../../../../../utils/constant/Constant.js";
import {
  approveTimesheet,
  getPastDueTimesheets,
  getPendingTimesheets,
  rejectTimesheet,
  approvePastDueTimesheet,
} from "../../../../../utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "../../../../../utils/timesheet-parsers/timesheet-parser";
import { formatHoursToHHMM } from "../../../../../utils/functions/time";
import { openPopupNotification } from "../../../../../utils/functions/functions_lib.js";

import { random } from "lodash";

const PENDING_TYPE = "pending";
const PAST_DUE_TYPE = "past_due";

const fetchTimesheetsFunctionMap = {
  [PENDING_TYPE]: getPendingTimesheets,
  [PAST_DUE_TYPE]: getPastDueTimesheets,
};
const TIMESHEET_DELETE_CONFIRMATION_MESSAGE = {
  approved: {
    title: "Approve Timesheet Request",
    message: "Are you sure you want to approve the selected timesheet?",
  },
  rejected: {
    title: "Reject Timesheet Request",
    message: "Are you sure you want to reject the selected timesheet?",
  },
};
const TIMESHEET_NOTIFICATIN_MESSAGE = {
  approved: {
    text: "Timesheet has been Approve successfully",
    variant: "primary-24",
  },
  rejected: { text: "Timesheet has been rejected", variant: "danger" },
};
export default {
  props: {
    dates: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    searchString: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      WEEK_DAY,
      TIMESHEET_STATUS,
      timesheetStatusOptions: [
        TIMESHEET_STATUS.approved,
        TIMESHEET_STATUS.rejected,
      ],
      weekDays: WEEK_DAY.map((day) => day.value.substring(0, 3)),
      tableFields: TABLE_HEAD.tHeadTimesheet,
      employees: [],
      loading: true,
      deleteModalContent: "",
      confirmastionMessageModal: false,
      variantButton: "",
      popupMessages: [],
    };
  },

  computed: {
    showTable() {
      return !this.loading && this.employees?.length;
    },
    showNoData() {
      return !this.loading && (!this.employees || !this.employees?.length);
    },
    statusButtonConfig() {
      if (!this.type) return {};
      return this.$button[this.type];
    },
  },

  mounted() {
    this.addTypeToTimesheetStatusOptions();
    this.getAndParseTimesheets();
  },
  methods: {
    formatIsoDateToYYYYMMDD,
    formatHoursToHHMM,
    random,
    openPopupNotification,
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    deleteConfirmation(event, data) {
      console.log(event, "event");
      this.event = event;
      this.data = data;
      if (event.key == "approved") {
        this.deleteModalContent =
          TIMESHEET_DELETE_CONFIRMATION_MESSAGE.approved;
        this.variantButton = "success";
      } else {
        this.deleteModalContent =
          TIMESHEET_DELETE_CONFIRMATION_MESSAGE.rejected;
        this.variantButton = "";
      }
      this.confirmastionMessageModal = true;
      return;
    },
    addTypeToTimesheetStatusOptions() {
      this.timesheetStatusOptions = [
        TIMESHEET_STATUS[this.type],
        ...this.timesheetStatusOptions,
      ];
    },
    async onStatusChange() {
      var data = this.data;
      var event = this.event;
      const id = data?.value?.id;
      const status = data?.value?.status;
      event = event?.value ?? event;

      if (event == TIMESHEET_STATUS["approved"].value) {
        if (status == TIMESHEET_STATUSES.PAST_DUE && id == "-1") {
          const date = data?.value?.start;
          await approvePastDueTimesheet({
            id,
            date,
            employeeId: data.value.employeeId,
          });
          this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.approved);
          this.confirmastionMessageModal = false;
        } else {
          await approveTimesheet({ id });
          this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.approved);
          this.confirmastionMessageModal = false;
        }
      } else if (event == TIMESHEET_STATUS["rejected"].value) {
        await rejectTimesheet({ id });
        this.confirmastionMessageModal = false;
        this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
      }

      this.getAndParseTimesheets();
    },

    async getAndParseTimesheets() {
      const { searchString } = this;

      this.loading = true;
      const { from, to } = this.dates;
      if (!from || !to) return;

      const employees = await fetchTimesheetsFunctionMap[this.type]({
        from,
        to,
        searchString,
      });

      employees.forEach((employee) => {
        employee.timesheets.forEach((timesheet) => {
          const parser = new TimesheetParser(timesheet);
          parser.parse("hours");
        });
      });

      this.employees = employees;
      this.loading = false;
    },

    getDayClassName(hours) {
      if (!hours) return "chip-wrapper__bggray";

      if (hours >= "08") return "chip-wrapper__bgsucess";

      if (hours <= "07" && hours >= "05") return "chip-wrapper__bgabsent";

      if (hours <= "05") return "chip-wrapper__bgabsentpink";

      return "";
    },

    getTotalClassName(total) {
      if (total <= "10") return "chip-wrapper__bgabsentpink";

      if (total <= "35") return "chip-wrapper__bgabsent";

      if (total >= "40") return "chip-wrapper__bgsucess";

      return "";
    },

    getStatusIcon(status) {
      const iconStatusMap = {
        [TIMESHEET_STATUS.approved.value]: "check-all",
        [TIMESHEET_STATUS.pending.value]: "eye-open",
        [TIMESHEET_STATUS.past_due.value]: "help",
      };

      return iconStatusMap[status] || "";
    },

    getStatusVariant(status) {
      const variantStatusMap = {
        [TIMESHEET_STATUS.approved.value]: "chip-wrapper__bgsucess",
        [TIMESHEET_STATUS.pending.value]: "chip-wrapper__bgabsent",
        [TIMESHEET_STATUS.past_due.value]: "chip-wrapper__bgabsentpink",
        [TIMESHEET_STATUS.vacation.value]: "chip-wrapper__bgvacation",
      };

      return variantStatusMap[status] || "";
    },

    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/profile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },

    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },

    handleAction_Table(data) {
      console.log(data);
    },
  },

  watch: {
    dates: {
      deep: true,
      handler: function (newVal, oldVal) {
        //To make sure the dates really changed, avoid making useless api calls
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.getAndParseTimesheets();
        }
      },
    },

    searchString(value) {
      this.getAndParseTimesheets();
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 1400px) {
  .info_wrapper {
    font-size: 10px;
  }
}

@media (min-width: 1400px) {
  .info_wrapper {
    font-size: 14px;
  }
}
// .info_wrapper {
//   color: $dark;
//   font-weight: 400;
//   font-size: 14px;
// }

.title {
  font-size: 14px;
  font-weight: 600;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: $black;
}
</style>
