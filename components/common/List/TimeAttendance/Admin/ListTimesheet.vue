<template>
  <div>
    <bib-table
      :fields="tableFields"
      :sections="timesheetList"
      :hide-no-column="true"
      :fixHeader="true"
      class="table"
      @column-header-clicked="headerColumnClick($event.column)"
    >
      <template #cell(name)="data">
        <div
          class="d-flex align-center text-left gap-05 py-025 position-relative"
        >
          <div
            class="cursor-pointer"
            v-on:mouseover="$profiletab('id_' + data.value.id)"
            v-on:mouseleave="$profiletab('id_' + data.value.id, true)"
          >
          <div class="avtar-contain">
            <bib-avatar
              variant="secondary-sub3"
              :text="$getEmployeeInitials(data.value)"
              text-variant="primary"
              size="2.3rem"
              v-show="data.value.photo === null"
            ></bib-avatar>
            <bib-avatar
              class="mt-auto mb-auto"
              shape="circle"
              :src="data.value.photo"
              v-show="data.value.photo != null"
              size="2.3rem"
            >
            </bib-avatar>
            </div>
            <div :id="'id_' + data.value.id" class="userCard">
              <user-info-card
                :user="data.value"
                @viewProfile="viewProfile(data.value.id)"
                @sendMeet="makeCall(getUser.userId, data.value.userId)"
                @sendMessage="sendMessage(data.value.userId)"
                :active="data.value.active"
                :contactButtons="$isActiveUser(data.value.id)"
              ></user-info-card>
            </div>
          </div>
          <div
            class="info_wrapper w-100 cursor-pointer"
            @click="handleItemClick_Table(data.value.id, $event)"
          >
            <div
              class="employee-name-label"
              :title="$getEmployeeFullName(data.value)"
            >
              {{
                $getEmployeeFullName(data.value) | truncate(truncateText, "...")
              }}
            </div>
            <div :class="isLightThemeCheck ? 'text-dark' : 'light'">
              {{ data.value.jobTitle }}
            </div>
          </div>
          <notifications
            v-if="shouldShowTimesheetReminderIcon(data.value.timesheets?.[0]?.status, data.value.timesheets?.[0]?.lastReminderSentAt)"
            @submit-notification="submitTimesheetReminder(data.value)"
            :isLoading="mapLoading[data.value.id]"
            iconName="send-solid"
            customClass="ml-05 mr-1"
          ></notifications>
        </div>
      </template>

      <template v-for="value in weekDays" #[`cell(${value.day})`]="data">
        <chips
          :key="`${value.day}-${Math.random()}`"
          :title="$getTimesheetDayValue(data.value, value, true)"
          :leaveTypeHighlighterText="$getLeaveTypeValue(data.value, value, true)"
          :className="[$getDayClassName(data.value.weekData[value.index]?.totalHours, data.value, value, true)]"
          :leaveHighlighter="$getLeaveTypeValue(data.value, value, true) ? true : false"
          :notifyClass="[$getHightlighterClass(data.value.weekData[value.index]?.totalHours, data.value, value, true)]"
          :leaveTypeHighlighterTolltip="$getLeaveTooltipTitle(data.value, value, true)"
        ></chips>
      </template>

      <template #cell(total)="data">
        <div class="d-align font-w-600">
          {{ data.value.refusalReason }}
          <span>{{ formatTime(data.value.total, false) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div>
          <chips
            v-if="!data.value.timesheets?.length"
            :title="TIMESHEET_STATUS[getEmptyTimesheetStatus()].label"
            iconShow="iconShow"
            :icon="getStatusIcon(getEmptyTimesheetStatus())"
            :variant="[getStatusVariant(getEmptyTimesheetStatus())]"
            :defaultPointer="true"
            :className="['width-auto']"
          ></chips>
          <chips
            v-else
            :title="
              setTitle(
                TIMESHEET_STATUS[data.value.timesheets?.[0]?.status]?.label
              )
            "
            iconShow="iconShow"
            :icon="getStatusIcon(data.value.timesheets?.[0]?.status)"
            :variant="[getStatusVariant(data.value.timesheets?.[0]?.status)]"
            :defaultPointer="true"
            :className="['width-auto']"
          ></chips>
        </div>
      </template>
    </bib-table>
    <time-sheet-modal
      @close="timesheetModal = false"
      :timesheetModal="timesheetModal"
      :items="filteredData"
    ></time-sheet-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  makeCall,
  sendMessage,
  meetLink,
  handleItemClick_Table,
} from "../../../../../utils/functions/functions_lib";
import { sortColumn } from "../../../../../utils/functions/table-sort";

import {
  TABLE_HEAD,
  TIMESHEET_STATUS,
  WEEK_DAY,
  TIMESHEET_STATUSES,
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_LABEL_VALUE,
} from "../../../../../utils/constant/Constant.js";

import { formatHoursToHHMM } from "../../../../../utils/functions/time";
import {
  getStatusIcon,
  getStatusVariant,
} from "../../../../../utils/functions/status";
import {formatTime} from "../../../../../utils/functions/clock_functions";
import {shouldShowReminderIcon} from "@/utils/timesheets";
import {DateTime} from "luxon";

export default {
  props: {
    timesheetsList: {
      type: Array,
      default: [],
    },
    startDate: {
      type: Date | String,
    },
    endDate: {
      type: Date | String,
    },
  },
  data() {
    return {
      modal3Opened: false,
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadTimesheetTab,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      filteredData: [],
      TIMESHEET_STATUS,
      weekDays: WEEK_DAY.map((day) => ({
        day: day.value.substring(0, 3),
        index: day.weekday
      })),
      sortByField: null,
      mapLoading: {}
    };
  },
  computed: {
    timesheetList() {
      if (!this.sortByField) return this.timesheetsList;

      return sortColumn({
        items: this.timesheetsList,
        field: this.sortByField,
      });
    },
    truncateText() {
      var screenWidth = window.screen.width;
      if (screenWidth >= "1920") {
        return 40;
      } else {
        return 25;
      }
    },
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  beforeDestroy() {
    this.$resetTableFieldsHeaderIcon(this.tableFields);
  },
  methods: {
    shouldShowReminderIcon,
    formatTime,
    formatHoursToHHMM,
    getStatusIcon,
    getStatusVariant,
    sendMessage,
    makeCall,
    meetLink,
    handleItemClick_Table,
    shouldShowTimesheetSubmitReminderIcon(status) {
      return status !== "approved" && status !== "pending";
    },
    setTitle(title) {
      if (title == "Approve") {
        return "Approved";
      }
      if (title == "Reject") {
        return "Rejected";
      }
      return title;
    },

    getLeaveTypeValue(data, day){
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data?.weekData;
      const dayValue = data.weekData[weekIndex]?.totalHours;
      const formattedTime = this.formatTime(dayValue, false);
      const isValidTime = formattedTime && formattedTime !== "NaN:NaN";
      if (leaves && leaves[weekIndex]) {
        const leave = leaves[weekIndex];
        const leaveType = leave?.type.charAt(0).toUpperCase() +  leave?.type.slice(1);;
        if (isValidTime) {
          return `${leaveType}`;
        }
      }
    },
    getTimesheetDayValue(data, day) {
      const { day: weekDay, index: weekIndex } = day;
      const { leaves } = data.weekData;
      const dayValue = data.weekData[weekIndex]?.totalHours;
      const formattedTime = this.formatTime(dayValue, false);
      const isValidTime = formattedTime && formattedTime !== "NaN:NaN";
      if (leaves && leaves[weekIndex]) {
        const leave = leaves[weekIndex];
        const leaveType = leave?.type.charAt(0).toUpperCase() + leave?.type.slice(1);

        if (isValidTime) {
          return `${formattedTime}`;
        }

        return leaveType;
      }

      if (!dayValue) return '--';

      return isValidTime ? formattedTime : '--';
    },
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
    },
    headerColumnClick(column) {
      this.sortColumn(column);
    },
    getEmptyTimesheetStatus() {
      const endDate = new Date(this.endDate);
      if (new Date() > endDate) {
        return TIMESHEET_STATUS.past_due.value;
      }

      return TIMESHEET_STATUS.not_submitted.value;
    },

    isPastDueTimesheet(timesheetId) {
      return timesheetId == -1;
    },

    async submitTimesheetReminder(employee) {

      const timesheetId = employee.timesheets?.[0]?.id
      const employeeId = employee.id;

      this.$set(this.mapLoading, employeeId, true);
      try {
        if(!this.isPastDueTimesheet(timesheetId)) {
          await this.$submitTimesheetReminder({ timesheetIds: timesheetId });
        }else {
          const date = employee.timesheets?.[0]?.end;
          await this.$submitPastDueTimesheetReminder(timesheetId, {
            employeeId,
            date
          })
          this.$openPopupNotification({
            text: "A reminder for past due timesheet submission has been successfully sent to the employee.",
            variant: "primary-24"
          });
        }

        this.$nuxt.$emit('get-time-attendance');
      } catch (errorMessage) {
        this.$openPopupNotification({
          text: errorMessage,
          variant: "danger",
        });
      } finally {
        this.$set(this.mapLoading, employeeId, false);
      }

    },
    getWeekdayValue(weekData, day) {
      if (!weekData) return "--";

      const data = weekData[day.weekday];
      if (!data) return "--";

      let vacationName = this.getVacationName(data);

      if (typeof data.totalHours === "number") {
        return this.getFormattedHoursWithVacation(data, vacationName);
      }
      return this.$leaveTypeCheck(vacationName);
    },
    getVacationName(data) {
      const activity = Object.values(ACTIVITY_TYPE).find(
        (activity) => data[activity]
      );
      return ACTIVITY_TYPE_LABEL_VALUE[activity] ?? "";
    },

    isTimesheetCurrentWeek(start) {
      const now = DateTime.local().startOf('week').minus({days: 1});
      const startDate = DateTime.fromISO(start);
      return now.hasSame(startDate, 'day');
    },

    shouldShowTimesheetReminderIcon(status, reminderAt) {

      if(
        status === TIMESHEET_STATUSES.PENDING ||
        status === TIMESHEET_STATUSES.APPROVED ||
        status === TIMESHEET_STATUSES.REJECTED
      ) return false;

      if(this.isTimesheetCurrentWeek(this.startDate)) return false;

      return shouldShowReminderIcon(reminderAt);
    },
    getFormattedHoursWithVacation(weekData, vacationName) {
      const formattedHours = formatTime(weekData.totalHours, false);
      return vacationName
        ? `${vacationName} (${formattedHours})`
        : formattedHours;
    },
    close() {
      this.timesheetModal = false;
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    mouseover() {
      this.showTooltip = true;
    },
    mouseleave() {
      this.showTooltip = false;
    },
  },
};
</script>

<style lang="scss">
.d-align {
  display: flex;
  justify-content: center;
}
.td_row_wrapper {
  padding: 4px 8px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  height: 65px !important;
  width: 100%;
  margin: -3px -5px 0 0px;

  &__sucess {
    background-color: #d5e8d4;
    span {
      color: $success;
      font-weight: 500;
      font-size: 14px;
    }
  }

  &__absent {
    background-color: rgba(255, 171, 0, 0.16);
    span {
      color: #ffab00;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__vacation {
    background-color: rgba(31, 66, 162, 0.16);
    span {
      color: $primary;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__absentpink {
    background-color: rgba(230, 0, 14, 0.16);
    span {
      color: #e6000e;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__default {
    background-color: $white;
    span {
      color: $black;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
.info_wrapper {
  color: $black;
  font-weight: normal;
}

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
