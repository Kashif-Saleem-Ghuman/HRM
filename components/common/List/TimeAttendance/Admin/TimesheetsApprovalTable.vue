<template>
  <div>
    <loader :loading="loading"></loader>

    <no-record v-if="showNoData"></no-record>

    <custom-table-day-view v-else-if="showTable" :fields="tableFields" :allChecked="allChecked" :type="type"
      @select-all="selectAllItems" :sections="employees" :hide-no-column="true" :fixHeader="true">
      <template v-if="type === PENDING_TYPE || type === PAST_DUE_TYPE" #cell_action="data">
        <div class="d-flex justify-center align-center">
          <bib-checkbox
              size="md"
              :key="data.items.id"
              @change="handleItemChecked(data.items)"
              :checked="data.items.checked"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
          ></bib-checkbox>
        </div>
      </template>
      <!-- Timsheet date range -->
      <template #cell(name)="data">
        <div class="d-flex align-center text-left gap-05 position-relative">
          <div class="info_wrapper pl-05" :class="isLightThemeCheck ? 'text-black' : 'text-white'">
            {{ formatIsoDateToYYYYMMDD(data.value.start) }} ->
            {{ formatIsoDateToYYYYMMDD(data.value.end) }}
          </div>
          <div v-if="type === PAST_DUE_TYPE" class="ml-auto">
            <notifications
              v-if="shouldShowDueReminderIcon(data.value?.lastReminderSentAt)"
              @submit-notification="submitPastDueTimesheetReminder(data.value.id, data.value.end, data.value.employeeId)"
              :pastDueTimesheetReminderIcon="shouldShowDueReminderIcon(data.value?.last_reminder_sent_at)"
              iconName="send-solid"
              :isLoading="mapLoading[data.value.id + data.value.end + data.value.employeeId]"
            ></notifications>
          </div>

        </div>
      </template>

      <template v-for="value in weekDays" #[`cell(${value.day})`]="data">
        <template>
          <chips :key="`${value.day}-${Math.random()}`" 
            :title="$getTimesheetDayValue(data.value, value)"
            :leaveTypeHighlighterText="$getLeaveTypeValue(data.value, value)"
            :leaveTypeHighlighterTolltip="$getLeaveTooltipTitle(data.value, value)"
            :className="[$getDayClassName(data.value[value.day], data.value, value)]"
            @on-click="redirectToProfile(data.value.employeeId, data.value, value.index)"
            :leaveHighlighter="$getLeaveTypeValue(data.value, value) ? true : false"
            :notifyClass="[$getHightlighterClass(data.value[value.day], data.value, value)]"></chips>
        </template>
      </template>


      <template #cell(total)="data">
        <chips :title="data.value.total ? formatTime(data.value.total, false) : '00:00'
          " :className="['padding-0']"></chips>
      </template>

      <template #cell(status)="data">
        <div class="text-dark">
          <dropdown-menu-chip :items="timesheetStatusOptions.slice(1)" :button-config="statusButtonConfig"
            @on-click="actionConfirmation($event, data)" :disabled="disableButtonMultiselect"></dropdown-menu-chip>
        </div>
      </template>
    </custom-table-day-view>
  </div>
</template>

<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import {
  PAST_DUE_TYPE,
  PENDING_TYPE, START_YEAR,
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
import { TIMESHEET_NOTIFICATIN_MESSAGE } from "../../../../../utils/constant/Notifications"
import { random } from "lodash";
import fecha from "fecha";
import {DateTime} from "luxon";
import {formatTime} from "../../../../../utils/functions/clock_functions";
import {submitPastDueTimesheetReminder} from "../../../../../utils/functions/api_call/notification-reminder";


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
    isShowAll: {
      type: Boolean,
      default: false,
    }
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
      weekDays: WEEK_DAY.map(day => ({
        day: day.value.substring(0, 3),
        index: day.weekday
      })),
      tableFields: TABLE_HEAD.tHeadTimesheet,
      employees: [],
      loading: false,
      deleteModalContent: "",
      confirmastionMessageModal: false,
      variantButton: "",
      showRefusalModal: false,
      refusalReason: null,
      checked: false,
      allChecked: false,
      disableButtonMultiselect: false,
      showAllDate: {
        from: DateTime.local().startOf("year").toISO(),
        to: DateTime.local().endOf('year').toISO(),
      },
      mapLoading: {},
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

  async mounted() {
    this.addTypeToTimesheetStatusOptions();
    this.loading = true;
    this.employees = await this.getAndParseTimesheets();
    this.loading = false;
  },
  methods: {
    formatTime,
    formatIsoDateToYYYYMMDD,
    formatHoursToHHMM,
    random,

    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    shouldShowDueReminderIcon(reminderSentDate) {
      if(!reminderSentDate) return true;

      const now = DateTime.now();
      const date = DateTime.fromISO(reminderSentDate);

      const differenceInHours = now.diff(date, 'hours').hours;
      return differenceInHours > 24;
    },
    async submitPastDueTimesheetReminder(timesheetId, date, employeeId) {
      try {
        this.$set(this.mapLoading, timesheetId + date + employeeId, true);
        await submitPastDueTimesheetReminder(timesheetId, { employeeId, date });
        this.$openPopupNotification({
          text: "A reminder for past due timesheet submission has been successfully sent to the employee.",
          variant: "primary-24"
        });
      } catch (errorMessage) {
        this.$openPopupNotification({
          text: errorMessage,
          variant: "danger"
        });
      } finally {

        this.employees = await this.getAndParseTimesheets();
        this.$set(this.mapLoading, timesheetId + date + employeeId, false);
      }

    },
    actionConfirmation(event, data) {
      const { id, employeeId, end: date } = data.value;
      switch (event.key) {
        case "approved":
          if (this.type === PENDING_TYPE) {
            // this.$emit('approve-item', {id});
            this.approveSingleTimesheet({ id });
          } else {
            // this.$emit('approve-item', { id, employeeId, date });
            this.approveSingleTimesheet({ id, employeeId, date });
          }
          this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.approved);
          break;
        case "rejected":
          if (this.type === PENDING_TYPE) {
            this.$emit('reject-item', { id });
          } else {
            this.$emit('reject-item', { id, employeeId, date });
          }
          break;
        default:
          console.error(`Unhandled event key: ${event.key}`);
      }
    },

    async approveSingleTimesheet({ id, employeeId, date }) {

      try {
        if (id !== "-1") {
          await approveTimesheet({ id });
        } else {
          await approvePastDueTimesheet({ id, date, employeeId });
        }
      }
      catch (err) {
        this.$openPopupNotification({
          text: err?.response?.data?.message,
          variant: "danger"
        })
      }
      finally {
        this.loading = true;
        this.employees = await this.getAndParseTimesheets();
        this.loading = false;
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


      if (event == TIMESHEET_STATUS["rejected"].value) {
        const refusalReason = request.refusalReason
        if (status == TIMESHEET_STATUSES.PAST_DUE && id == "-1") {
          const date = data?.value?.start;
          await rejectPastDueTimesheet({
            id,
            date,
            refusalReason,
            employeeId: data.value.employeeId,
          });
          this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
          this.showRefusalModal = false;
        } else {
          await rejectTimesheet({ id, refusalReason });
          this.showRefusalModal = false;
          this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
        }
      }

      this.loading = true;
      this.employees = await this.getAndParseTimesheets();
      this.loading = false;
    },

    async getAndParseTimesheets() {

      try {
        const { searchString } = this;
        const { from, to } = this.dates;
        if (!from || !to) return;

        let employees = await fetchTimesheetsFunctionMap[this.type]({
          from,
          to,
          searchString,
        });

        employees.forEach((employee) => {
          const { leavesByDate } = employee
          employee.timesheets.forEach((timesheet) => {
            const parser = new TimesheetParser(timesheet);
            parser.parse("hours");
            const timesheetDate = DateTime.fromISO(timesheet.start, { zone: "utc" }).toISODate();
            const timesheetLeaves = leavesByDate?.[timesheetDate]
            timesheet.leaves = timesheetLeaves
          });
        });

        employees = employees;

        function getWeekdayIndex(dateString) {
          const date = new Date(dateString);
          return date.getDay();
        }

        employees.forEach(employee => {
          employee.timesheets.forEach(timesheet => {
            timesheet.timeEntries.forEach(timeEntry => {
              const weekdayIndex = getWeekdayIndex(timeEntry.start);
              timeEntry.weekdayIndex = weekdayIndex;

              if (weekdayIndex === 0) {
                timeEntry.weekdayIndex = 7;
              }
            });
          });
        });
        this.$emit("update:requestData", this.employees);
        this.$emit('update:isStatusUpdated', false);

        return employees;
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }

    },

    redirectToProfile(userId, value, index) {
      let currentValue = value.timeEntries.find(entry => entry.weekdayIndex === index)
      if (!currentValue) return this.debouncedNotification();

      const parsedDate = new Date(currentValue.start);
      parsedDate.setDate(parsedDate.getDate());
      const newDate = fecha.format(parsedDate, "DD-MMM-YYYY");

      this.$router.push({
        path: `/profile/${userId}/time-attendance-profile-tab`,
        query: { date: newDate }
      });
    },
    debouncedNotification() {
      if (!this.debounced) {
        this.$openPopupNotification({
          text: "Timesheet has no entries",
          variant: "danger"
        });
        this.debounced = true;
        setTimeout(() => {
          this.debounced = false;
        }, 3000);
      }
    },
    checkCount() {
      const checkedCount = this.employees
        .flatMap((employee) => employee.timesheets)
        .filter((timesheet) => timesheet.checked).length;
      this.disableButtonMultiselect = checkedCount > 1 ? true : false;
    },
    selectAllItems() {
      this.allChecked = !this.allChecked;

      this.updateCheckBox(this.allChecked);
    },

    updateCheckBox(isChecked) {
      this.employees?.forEach((employee, empIndex) => {
        employee.timesheets.forEach((timesheet, timeSheetIndex) => {
          this.$set(this.employees[empIndex].timesheets[timeSheetIndex], "checked", isChecked);
        })
      });
      this.checkCount();
      this.$emit("update:requestData", this.employees);
    },
    handleItemChecked(timesheetEntries) {
      const { employeeId, id, end } = timesheetEntries;
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
    resetCheckBox() {
      if(this.employees.length > 0) {
        this.allChecked = false;
        this.updateCheckBox(false);
      }
    },
  },

  watch: {
    dates: {
      deep: true,
      handler: async function (newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.loading = true;
          this.resetCheckBox();
          this.employees = await this.getAndParseTimesheets();
          this.loading = false;
        }
      },
    },

    async searchString(value) {
      this.loading = true;
      this.employees = await this.getAndParseTimesheets();
      this.loading = false;
    },
    async isStatusUpdated(value) {
      this.loading = true;
      this.employees = await this.getAndParseTimesheets();
      this.loading = false;
      this.allChecked = false;
      this.$emit("update:requestData", this.employees);
    },
    employees: {
      deep: true, // Watch for nested changes
      handler() {
        // Call the checkCount function
        this.checkCount();
      }
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
