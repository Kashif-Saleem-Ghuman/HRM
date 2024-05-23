<template>
  <div>
    <loader :loading="loading"></loader>

    <no-record v-if="showNoData"></no-record>

    <custom-table-day-view
        v-else-if="showTable"
        :fields="tableFields"
        class="bg-white"
        :allChecked="allChecked"
        :type="type"
        @select-all="selectAllItems"
        :sections="employees"
        :hide-no-column="true"
        :fixHeader="true"
    >
      <template v-if="type === PENDING_TYPE || type === PAST_DUE_TYPE" #cell_action="data">
        <div class="d-flex justify-center align-center">
          <bib-checkbox
              size="md"
              :key="data.items.id"
              @change="handleItemChecked(data.items)"
              :checked="data.items.checked"
          ></bib-checkbox>
        </div>
      </template>
      <!-- Timsheet date range -->
      <template #cell(name)="data">
        <div
          class="d-flex align-center text-left gap-05 position-relative"
        >
          <div class="info_wrapper pl-05">
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
            @on-click="actionConfirmation($event, data)"
            :disabled="disableButtonMultiselect"
          ></dropdown-menu-chip>
        </div>
      </template>
    </custom-table-day-view>
  </div>
</template>

<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import {
  PAST_DUE_TYPE,
  PENDING_TYPE,
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
  rejectPastDueTimesheet,
} from "../../../../../utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "../../../../../utils/timesheet-parsers/timesheet-parser";
import { formatHoursToHHMM } from "../../../../../utils/functions/time";
import{ TIMESHEET_NOTIFICATIN_MESSAGE} from "../../../../../utils/constant/Notifications"
import { random } from "lodash";



const fetchTimesheetsFunctionMap = {
  [PAST_DUE_TYPE]: getPastDueTimesheets,
  [PENDING_TYPE]: getPendingTimesheets,
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
    requestData: {
      type: Array,
      required: false,
    },
    isStatusUpdated: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      PAST_DUE_TYPE,
      PENDING_TYPE,
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
      showRefusalModal: false,
      refusalReason: null,
      checked: false,
      allChecked: false,
      disableButtonMultiselect: false, 
      
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
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification })
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    actionConfirmation(event, data) {
      const { id, employeeId, end: date } = data.value;
      switch (event.key) {
        case "approved":
          if (this.type === PENDING_TYPE) {
            this.$emit('approve-item', id);
          } else {
            this.$emit('approve-item', { id, employeeId, date });
          }
          break;
        case "rejected":
          if (this.type === PENDING_TYPE) {
            this.$emit('reject-item', id);
          } else {
            this.$emit('reject-item', { id, employeeId, date });
          }
          break;
        default:
          console.error(`Unhandled event key: ${event.key}`);
      }
    },
    cancelRejectRequest() {
      // this.addIds.pop();
      this.showRefusalModal = false;
    },
    async enableRefusalModal() {
      this.showRefusalModal = true;
    },
    addTypeToTimesheetStatusOptions() {
      this.timesheetStatusOptions = [
        TIMESHEET_STATUS[this.type],
        ...this.timesheetStatusOptions,
      ];
    },
    async onStatusChange(request) {
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
        const refusalReason = request.refusalReason
        if (status == TIMESHEET_STATUSES.PAST_DUE && id == "-1") {
          const date = data?.value?.start;
          await rejectPastDueTimesheet({
            id,
            date,
            refusalReason,
            employeeId: data.value.employeeId,
          });
          this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
          this.showRefusalModal = false;
        }else{
        await rejectTimesheet({ id, refusalReason });
        this.showRefusalModal = false;
        this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
        }
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
      this.$emit("update:requestData", this.employees);
      this.$emit('update:isStatusUpdated', false);
    },

    getDayClassName(hours) {
      if (!hours) return "chip-wrapper__bggray";

      if (hours >= "08") return "chip-wrapper__bgsucess";

      if (hours <= "08" && hours >= "05") return "chip-wrapper__bgabsent";

      if (hours <= "05") return "chip-wrapper__bgabsentpink";

      return "";
    },
    checkCount(){
      const checkedCount = this.employees
        .flatMap((employee) => employee.timesheets)
        .filter((timesheet) => timesheet.checked).length;
      this.disableButtonMultiselect = checkedCount > 1;
    },
    selectAllItems() {
      this.allChecked = !this.allChecked;

      this.employees?.forEach((employee, empIndex) => {
        employee.timesheets.forEach((timesheet, timeSheetIndex) => {
          this.$set(this.employees[empIndex].timesheets[timeSheetIndex], "checked", this.allChecked);
        })
      });
      this.checkCount();
      this.$emit("update:requestData", this.employees);
    },
    handleItemChecked(timesheetEntries) {
      const {employeeId, id, end} = timesheetEntries;
      let timesheetIndex = -1;
      let employeeIndex = -1;

      this.employees.some((employee, index) => {
        const foundTimesheetIndex = employee.timesheets.findIndex((timesheet) => timesheet.id === id &&
          timesheet.end == end &&
          timesheet.employeeId == employeeId);
        if (foundTimesheetIndex !== -1) {
          timesheetIndex = foundTimesheetIndex;
          employeeIndex = index;
          return;
        }
        return;
      });

      if (employeeIndex === -1 || timesheetIndex === -1) {
        console.error(`Timesheet with id ${id} not found`);
        return;
      }

      const timesheet = this.employees[employeeIndex].timesheets[timesheetIndex];
      this.$set(timesheet, "checked", !timesheet.checked);

      this.allChecked = this.employees.every((employee) =>
          employee.timesheets.every((timesheet) => timesheet.checked)
      );
      this.checkCount(timesheetEntries);
      this.$emit("update:requestData", this.employees);
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
    isStatusUpdated(value) {
      this.getAndParseTimesheets();
      this.allChecked = false;
      this.$emit("update:requestData", this.employees);
    }
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

