<template>
  <div>
    <loader :loading="loading"></loader>
    <bib-table
      :fields="tableFields"
      :sections="timesheetList"
      :hide-no-column="true"
      :fixHeader="true"
      @column-header-clicked="headerColumnClick($event.column)"
      @item-clicked="tableItemClick"
    >
      <template #cell(date)="data">
        <div class="d-flex align-center justify-between">
          <div class="d-flex flex-d-column text-left gap-01 cursor-pointer">
            <div class="font-md font-w-700">
              Week {{ getWeekNumber(data.value.start) }}
            </div>
            <div
              class="font-w-400"
              :class="isLightThemeCheck ? 'text-black' : 'text-white'"
            >
              {{ formatIsoDateToYYYYMMDD(data.value.start) }} ->
              {{ formatIsoDateToYYYYMMDD(data.value.end) }}
            </div>
          </div>
          <div v-if="isAdmin">
            <notifications
              v-if="shouldShowTimesheetSubmitReminderIcon(data.value.status)"
              @submit-timesheet-reminder="
                submitTimesheetReminder(data.value.id)
              "
              :timesheetSubmitReminderIcon="
                shouldShowTimesheetSubmitReminderIcon(data.value.status)
              "
              :isLoading="mapLoading[data.value.id]"
              iconName="send-solid"
              customClass="ml-05 mr-1"
          ></notifications>
            </div>
        </div>
      </template>

      <template v-for="day in weekDays" #[`cell(${day.value})`]="data">
        <chips
          :key="day.value"
          :title="getWeekdayValue(data.value.weekData, day)"
          :class="$getWeekdayClassNames(data.value.weekData, day)"
        ></chips>
      </template>

      <template #cell(total)="data">
        <div class="cursor-pointer">
          <span>{{ formatTime(data.value.total, false) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <div v-if="isAdmin">
            <div>
              <leave-status
                :leaveStatusData="data"
                :defaultPointer="true"
              ></leave-status>
              <!-- <chips
                :title="
                  TIMESHEET_STATUS[data.value?.status]?.label ??
                  'unknown-status'
                "
                iconShow="iconShow"
                :icon="getStatusIcon(data.value?.status)"
                :variant="[getStatusVariant(data.value?.status)]"
                :defaultPointer="true"
                :className="['width-auto']"
              ></chips> -->
            </div>
          </div>
          <div v-else>
            <div
              class="cursor-pointer"
              v-if="
                data.value?.status === 'approved' ||
                data.value?.status === 'pending'
              "
            >
              <leave-status
                :leaveStatusData="data"
                :defaultPointer="true"
              ></leave-status>
              <!-- <chips
                :title="
                  TIMESHEET_STATUS[data.value?.status]?.label ??
                  'unknown-status'
                "
                iconShow="iconShow"
                :icon="getStatusIcon(data.value?.status)"
                :defaultPointer="true"
                :className="[
                  'width-auto chip-wrapper-without-bg',
                  getStatusClassName(data.value?.status),
                ]"
              ></chips> -->
            </div>
            <div v-else>
              <leave-status
                :leaveStatusData="data"
                :disabled="isSubmitted"
                :timesheet="true"
                :buttonVarintChange="true"
                @click="buttonClicked(data.value)"
              ></leave-status>
              <!-- <bib-button
                :icon="getSubmitIcon(data.value?.status)"
                :variant="getSubmitVariant(data.value?.status)"
                :scale="$button.pending.scale"
                :label="getSubmitLabel(data.value?.status)"
                @click.native.stop="buttonClicked(data.value)"
                :disabled="isSubmitted"
              ></bib-button> -->
            </div>
          </div>
        </div>
      </template>
    </bib-table>
    <div
      v-if="!isFullYearList && timesheetList.length !== 0 && showTable"
      class="table-footer"
    >
      <div class="footer-items">
        <div class="footer-item-left font-w-600">Month Total</div>
        <div class="footer-item-middle">{{ getMonthTotal() }}</div>
        <div class="footer-item-right"></div>
      </div>
    </div>
    <time-sheet-modal
      @close="timesheetModal = false"
      :timesheetModal="timesheetModal"
      :items="filteredData"
    ></time-sheet-modal>
  </div>
</template>
<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import { sortColumn } from "@/utils/functions/table-sort";
import { mapState } from "vuex";
import {
  TABLE_HEAD,
  MONTH_VIEW_TIMESHEET_STATUS as TIMESHEET_STATUS,
  WEEK_DAY,
  TIMESHEET_STATUSES,
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_LABEL_VALUE,
} from "@/utils/constant/Constant.js";
import { formatHoursToHHMM } from "@/utils/functions/time";
import { DateTime } from "luxon";
import { buttonVariant as TIMESHEET_DELETE_CONFIRMATION_MESSAGE } from "@/utils/constant/DropdownMenu";
import { getStatusIcon, getStatusVariant } from "@/utils/functions/status";
import { submitTimesheet } from "@/utils/functions/functions_lib_api";
import {formatTime} from "../../../utils/functions/clock_functions";
const TIMESHEET_STATUS_TO_SUBMIT = [
  TIMESHEET_STATUSES.NOT_SUBMITTED,
  TIMESHEET_STATUSES.PAST_DUE,
  TIMESHEET_STATUSES.REJECTED,
];
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
    isFullYearList: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadTimesheetListWeekTab,
      timesheetModal: false,
      filteredData: [],
      weekDays: WEEK_DAY.map((day) => ({
        ...day,
        value: day.value.substring(0, 3),
      })),
      sortByField: null,
      timesheetStatusOptions: [
        TIMESHEET_STATUS.approved,
        TIMESHEET_STATUS.rejected,
      ],
      isSubmitted: false,
      mapLoading: {},
    };
  },
  computed: {
    ...mapState("token", ["isAdmin", "isUser", "subr"]),
    isOrganizationAdmin() {
      return (
        this.$store.state.token.hrmRole === USER_ROLES.ADMIN ||
        this.$store.state.token.hrmRole === USER_ROLES.MANAGER
      );
    },
    TIMESHEET_STATUS() {
      return TIMESHEET_STATUS;
    },
    timesheetList() {
      if (!this.sortByField) return this.timesheetsList;
      return sortColumn({
        items: this.timesheetsList,
        field: this.sortByField,
      });
    },
    showTable() {
      return !this.loading && this.timesheetsList?.length;
    },
    showNoData() {
      return (
        !this.loading && (!this.timesheetsList || !this.timesheetsList?.length)
      );
    },
  },
  methods: {
    formatTime,
    getStatusVariant,
    getStatusIcon,
    formatIsoDateToYYYYMMDD,
    formatHoursToHHMM,
    submitTimesheet,
    shouldShowTimesheetSubmitReminderIcon(status) {
      return status !== "approved" && status !== "pending";
    },
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
    },
    async submitTimesheetReminder(requestIds) {
      this.$set(this.mapLoading, employeeId, true);
      try {
        await this.$submitTimesheetReminder({ requestIds: requestIds });
      } catch (errorMessage) {
        console.log(errorMessage);
      } finally {
        this.$set(this.mapLoading, requestIds, false);
      }

    },
    getStatusClassName(status) {
      return status === "pending"
        ? "chip-wrapper-without-bg__bgpending"
        : "chip-wrapper-without-bg__bg_success";
    },
    timesheetIsSubmitable(status) {
      return TIMESHEET_STATUS_TO_SUBMIT.includes(status);
    },
    getSubmitIcon(status) {
      if (this.timesheetIsSubmitable(status)) return "";
      return this.getStatusIcon();
    },
    getSubmitVariant(status) {
      if (this.timesheetIsSubmitable(status))
        return this.$button[TIMESHEET_STATUSES.NOT_SUBMITTED]?.variant;
      return status === "approved" ? "success" : this.$button[status]?.variant;
    },
    getStatusLabel(status) {
      return this.$button[status]?.statusLabel ?? this.$button[status]?.label;
    },
    getSubmitLabel(status) {
      if (status === TIMESHEET_STATUSES.REJECTED) return "Resubmit";
      if (this.timesheetIsSubmitable(status)) return "Submit";
      return this.getStatusLabel(status);
    },
    async buttonClicked({ status, id }) {
      if (this.timesheetIsSubmitable(status)) {
        this.isSubmitted = true;
        const response = await this.submitTimesheet(id);
        if (response) {
          this.$emit("weeklytimesheet-submitted");
        }
        this.isSubmitted = false;
      }
    },
    statusButtonConfig(type) {
      if (!type) return {};
      return this.$button[type];
    },
    deactivateAllColumns() {
      this.tableFields.forEach((field) => {
        if (field.header_icon) {
          field.header_icon.isActive = false;
          field.header_icon.icon = "long-arrow-up";
        }
      });
      this.sortByField = null;
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
    getWeekNumber(start) {
      const startDateTime = DateTime.fromISO(start);
      const weekNumber = startDateTime.weekNumber;
      return weekNumber;
    },
    async enableRefusalModal() {
      this.showRefusalModal = true;
    },
    deleteConfirmation(event, data) {
      this.event = event;
      this.data = data;
      if (event.key === "approved") {
        this.confirmastionMessageModal = true;
        this.showRefusalModal = false;
        this.deleteModalContent =
          TIMESHEET_DELETE_CONFIRMATION_MESSAGE.approved;
        this.variantButton = "success";
        return;
      } else {
        // this.deleteModalContent =
        //   TIMESHEET_DELETE_CONFIRMATION_MESSAGE.rejected;
        this.enableRefusalModal();
      }
    },
    getWeekdayValue(weekData, day) {
      if (!weekData) return "--";
      const data = weekData[day.weekday];
      if (!data) return "--";
      if (typeof data.totalHours === "number") {
        return formatTime(data.totalHours, false);
      }
      for (const [, activity] of Object.entries(ACTIVITY_TYPE)) {
        if (data[activity]) return ACTIVITY_TYPE_LABEL_VALUE[activity];
      }
      return "--";
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
    getMonthTotal() {
      let totalHrs = 0;
      this.timesheetList.forEach((item) => {
        totalHrs += item.total;
      });
      return formatTime(totalHrs, false);
    },
    tableItemClick(event, key, item) {
      this.$emit("week-view", item);
    },
  },
  beforeDestroy() {
    this.$store.dispatch("timeattendance/setIsViewFromTimesheetCard", false);
  },
  watch: {
    timesheetsList(val) {
      this.deactivateAllColumns();
    },
  },
};
</script>

<style scoped lang="scss">
.table-footer {
  border-top: 0;
  border-right: 0;
  font-size: 14px;
  .footer-items {
    display: flex;
    .footer-item-left {
      width: 78.38%;
    }
    .footer-item-middle {
      border-bottom: 1px solid $light;
      display: flex;
      align-items: center;
      padding: 0rem 0.5rem;
      width: 10%;
    }
    .footer-item-right {
      border-bottom: 1px solid $light;
      width: 11.62%;
    }
  }
  .status-text {
    padding: 0.5rem;
  }
}
.dark-theme {
  .table-footer {
    .footer-items {
      .footer-item-middle {
        border-bottom: 1px solid $dark-sub3;
      }
      .footer-item-right {
        border-bottom: 1px solid $dark-sub3;
      }
    }
  }
}
</style>
