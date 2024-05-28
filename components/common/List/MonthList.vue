<template>
  <div>
    <loader :loading="loading"></loader>
    <no-record v-if="showNoData"></no-record>

    <bib-table
      v-else-if="showTable"
      :fields="tableFields"
      :sections="timesheetList"
      :hide-no-column="true"
      :fixHeader="true"
      @column-header-clicked="headerColumnClick($event.column)"
      @item-clicked="tableItemClick"
    >
      <template #cell(date)="data">
        <div
          class="d-flex flex-d-column text-left gap-01 cursor-pointer"
        >
          <div class="font-md font-w-700">Week {{ getWeekNumber(data.value.end) }}</div>
          <div class="font-w-400 text-black">
            {{ formatIsoDateToYYYYMMDD(data.value.start) }} ->
            {{ formatIsoDateToYYYYMMDD(data.value.end) }}
          </div>
        </div>
      </template>

      <template v-for="day in weekDays" #[`cell(${day.value})`]="data">
        <chips
          :key="day.value"
          :title="getWeekdayValue(data.value.weekData, day)"
          :class="getWeekdayClassNames(data.value.weekData, day)"
        ></chips>
      </template>

      <template #cell(total)="data">
        <div>
          <span>{{ formatHoursToHHMM(data.value.total) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <div v-if="data.value?.status=== 'approved' || data.value?.status === 'pending'">
            <chips
              :title="TIMESHEET_STATUS[data.value?.status]?.label ?? 'unknown-status'"
              iconShow="iconShow"
              :icon="getStatusIcon(data.value?.status)"
              :variant="[getStatusVariant(data.value?.status)]"
              :defaultPointer="true"
              :className="['width-auto chip-wrapper-without-bg']"
            ></chips>
          </div>
          <div @click.native.stop class="ml-2" v-else>
            <bib-button
              :icon="getSubmitIcon(data.value?.status)"
              :variant="getSubmitVariant(data.value?.status)"
              :scale="$button.pending.scale"
              :label="getSubmitLabel(data.value?.status)"
              @click.native.stop="buttonClicked(data.value)"
            ></bib-button>
          </div>
        </div>
      </template>
    </bib-table>
    <div v-if="!isFullYearList && timesheetList.length !== 0 && showTable" class="table-footer">
      <div class="footer-items">
        <div class="footer-item-left font-w-600">Month Total</div>
        <div class="footer-item-middle">{{ getMonthTotal() }}</div>
        <div class="footer-item-right">
        </div>
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
import {
  TABLE_HEAD,
  MONTH_VIEW_TIMESHEET_STATUS as TIMESHEET_STATUS,
  WEEK_DAY,
  TIMESHEET_STATUSES,
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_LABEL_VALUE,
} from "@/utils/constant/Constant.js";
import { formatHoursToHHMM } from "@/utils/functions/time";
import {DateTime} from "luxon";
import {buttonVariant as TIMESHEET_DELETE_CONFIRMATION_MESSAGE} from "@/utils/constant/DropdownMenu";
import {getStatusIcon, getStatusVariant} from "@/utils/functions/status";
import {submitTimesheet} from "@/utils/functions/functions_lib_api";
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
    }
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
    };
  },
  computed: {
    TIMESHEET_STATUS() {
      return TIMESHEET_STATUS
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
      return !this.loading && (!this.timesheetsList || !this.timesheetsList?.length);
    },
  },
  methods: {
    getStatusVariant,
    getStatusIcon,
    formatIsoDateToYYYYMMDD,
    formatHoursToHHMM,
    submitTimesheet,
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
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
      return status === "approved"
        ? "success"
        : this.$button[status]?.variant;
    },
    getStatusLabel(status) {
      return (
        this.$button[status]?.statusLabel ??
        this.$button[status]?.label
      );
    },
    getSubmitLabel(status) {
      if (status === TIMESHEET_STATUSES.REJECTED) return "Resubmit";
      if (this.timesheetIsSubmitable(status)) return "Submit";
      return this.getStatusLabel(status);
    },
    async buttonClicked({status, id}) {
      if (this.timesheetIsSubmitable(status)) {
        const response = await this.submitTimesheet(id);
        if (response) {
          this.$emit("weeklytimesheet-submitted");
        }
      }
    },
    statusButtonConfig(type) {
      if (!type) return {};
      return this.$button[type];
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
        this.enableRefusalModal()
      }
    },
    getWeekdayValue(weekData, day) {
      if (!weekData) return "--";
      const data = weekData[day.weekday];
      if (!data) return "--";
      if (typeof data.totalHours === "number") {
        return formatHoursToHHMM(data.totalHours);
      }
      for (const [, activity] of Object.entries(ACTIVITY_TYPE)) {
        if (data[activity]) return ACTIVITY_TYPE_LABEL_VALUE[activity];
      }
      return "--";
    },
    getWeekdayClassNames(weekData, day) {
      if (!weekData) return "chip-wrapper__bggray";
      const data = weekData[day.weekday];
      if (!data) {
        return "chip-wrapper__bggray";
      }
      if (data.vacation) {
        return "chip-wrapper__bgvacation chip-wrapper__border-radius";
      }
      const totalHours = Number(data.totalHours);
      if (totalHours >= 8) {
        return "chip-wrapper__bgsucess chip-wrapper__border-radius";
      } else if (totalHours >= 5 && totalHours < 8) {
        return "chip-wrapper__bgabsent chip-wrapper__border-radius";
      } else if (totalHours <= 3) {
        return "chip-wrapper__bgabsentpink chip-wrapper__border-radius";
      } else {
        return "chip-wrapper__bgdefault chip-wrapper__border-radius";
      }
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
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },
    getMonthTotal() {
      let totalHrs = 0;
      this.timesheetList.forEach((item) => {
        totalHrs += item.total;
      })
      return formatHoursToHHMM(totalHrs);
    },
    tableItemClick(event, key, item) {
      console.log('tableItemClick_item', item);
      this.$emit("week-view", item);
    },
  },
};
</script>

<style scoped lang="scss">
.table-footer {
  //   border: 1px solid $light;
  border-top: 0;
  border-right: 0;
  font-size: 14px;
  .footer-items {
    display: flex;
    .footer-item-left {
      width: 78.38%;
      border-right: 1px solid $light;
      border-bottom: 1px solid $light;
      padding: 1rem 0.5rem;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: end;
    }
    .footer-item-middle {
      border-bottom: 1px solid $light;
      padding: 1rem 0 1rem 0.5rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: start;
    }
    .footer-item-right {
      border-bottom: 1px solid $light;
      padding: 1rem 0 1rem 0.5rem;
      font-weight: 600;
    }
  }
  .status-text {
    padding: 0.5rem;
  }
}
</style>
