<template>
  <div class="align-wrapper"> 
    <bib-table
      :fields="tableFields"
      class="table table-week"
      :class="{
      'table--light': isLightThemeCheck,
      'table--dark': !isLightThemeCheck,
    }"
      :sections="activityReportsList"
      :hide-no-column="true"
      :showTotal="true"
      :fixHeader="true"
      v-if="id >= 0"
      
      @item-clicked="tableItemClick"
    >
      <template #cell(name)="data">
        <div class="font-md text-left font-w-500 cursor-pointer" :class="isLightThemeCheck ? 'text-gray1' : 'text-gray5'" @click="redirectDayView(data)">
          <div :class="getClassName(data.value.date)">
            {{ getWeekDay(data.value.weekDayLabel) }}
          </div>
          <div :class="getClassName(data.value.date)">
            {{ dateFormat(data.value.date) }}
          </div>
        </div>
      </template>
      <template #cell(in)="data">
        <div class="week-list">
          <timesheet-field
          :timeEntry="data.value.timeEntryIn"
          :value="data.value.in"
          :date="data.value.date"
          :activity="activityIn"
          :data="data.value"
          :status="status"
        ></timesheet-field>
        </div>
      </template>
      <template #cell(break)="data">
        <div class="cursor-pointer" @click="redirectDayView(data)">
          <chips
            :defaultPointer="true"
            :title="getInOut(data.value.break)"
            :className="getInOutClass(data.value.entryExists)"
            class="d-align text-center"
            centerAlign="d-align"
          ></chips>
        </div>
      </template>
      <template #cell(out)="data">
        <div class="week-list">
        <timesheet-field
          :timeEntry="data.value.timeEntryIn"
          :value="data.value.out"
          :date="data.value.date"
          :activity="activityOut"
          :data="data.value"
          :status="status"
        ></timesheet-field>
      </div>
      </template>
      <template #cell(total)="data">
        <div
          :class="[
            'd-flex',
            'align-center',
            data.value.entryExists ? 'text-bold' : 'disabled',
          ]"
          class="cursor-pointer"
        >
          <span>{{ getDayTotalHour(data.value) }}</span>
        </div>
      </template>
    </bib-table>
    <timesheet-table-footer
      v-if="id >= 0"
      :status="status"
      :refusalReasonData="refusalReasonData"
      :totalValue="totalValue"
      @button-clicked="submitButtonClicked"
    ></timesheet-table-footer>
    <time-sheet-modal
      @close="timesheetModal = false"
      :timesheetModal="timesheetModal"
      :items="filteredData"
    ></time-sheet-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
import {
  ACTIVITY_TYPE,
  TABLE_HEAD,
  WEEK_DAY,
  TIMESHEET_STATUS, FILL_WEEKLY_ENTRY_EVENT,
} from "@/utils/constant/Constant.js";
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";
import { formatTime } from "@/utils/functions/clock_functions";
import { submitTimesheet } from "@/utils/functions/functions_lib_api";

export default {
  props: {
    activityReports: {
      type: Array,
      default() {
        return [];
      },
    },
    totalWork: {
      type: String,
      default: "--:--",
    },
    status: {
      type: String,
      default: "",
    },
    refusalReasonData: {
      type: Object,
      default: null,
    },
    id: {
      type: Number,
      default: -1,
    },
    startOfWeek: {
      type: String,
      default: DateTime.now().startOf("week").toISODate(),
    },
  },
  data() {
    return {
      modal3Opened: false,
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadWeekView,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      filteredData: [],
      submitTimesheet,
      TIMESHEET_STATUS,
      WEEK_DAY,
      todayDate: DateTime.now().toFormat(DATETIME_FORMAT),
      activityIn: ACTIVITY_TYPE.IN,
      activityOut: ACTIVITY_TYPE.OUT,
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
      getTimerData: "timeattendance/getTimerData"
    }),
    activityReportsList() {
      return WEEK_DAY.map(({ label, value }, index) => {
        const report = this.activityReports.find(
          (ar) => this.getWeekdayString(ar.date) === value
        )?.activityReport;
        return {
          weekDayLabel: label,
          in: report?.in || "00:00",
          out: report?.out || "00:00",
          break: report?.break || "00:00",
          total: report?.total || 0,
          entryExists: Boolean(report),
          date: DateTime.fromISO(this.startOfWeek)
            .plus({ days: index })
            .toFormat("yyyy-MM-dd"),
          timeEntryIn: report?.timeEntryIn[0],
          timeEntryBreak: report?.timeEntryBreak[0],
        };
      });
    },
    totalValue() {
      return this.totalWork || "--:--";
    },
    statusValue() {
      return this.status;
    },
    isTimerActive() {
      return this.getTimerData?.active
    },
    isSelectedDateCurrentWeek() {
      const startWeek = DateTime.fromISO(this.startOfWeek).plus({days: 1});
      const now = DateTime.now();
      return startWeek.weekNumber === now.weekNumber && startWeek.year === now.year;
    },
  },
  methods: {
    formatTime,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    // TODO could be in in utils to reuse in other components
    getWeekdayString(date) {
      return WEEK_DAY[
        DateTime.fromJSDate(new Date(date + " 00:00")).weekday % 7
      ].value;
    },

    getDayTotalHour(timeEntry) {
      if(timeEntry.out === "00:00"){
        return "00:00";
      }
      return formatTime(timeEntry.total * 60, false);
    },
    getTodayDate() {
      this.todayDate;
    },
    tableItemClick(event, key, item) {
      this.$emit("day-view", item);
    },
    redirectDayView(item) {
      this.$emit("redirect-dayview", item.value);
    },
    dateFormat(item) {
      return item == null
        ? "---"
        : DateTime.fromISO(item).toFormat(DATETIME_FORMAT);
    },
    getClassName(value) {
      return this.todayDate === this.dateFormat(value) ? (this.isLightThemeCheck ? "text-bold text-black" : "text-bold text-white") : "";
    },
    getWeekDay(day) {
      return day;
    },
    getInOut(inOut) {
      return inOut;
    },
    getInOutClass(value) {
      return value
        ? "chip-wrapper__bggray text-bold"
        : "chip-wrapper__bggray disabled";
    },

    async submitButtonClicked() {

      if(this.isTimerActive && this.isSelectedDateCurrentWeek) {
        this.$openPopupNotification({
          text: "Please clock out to submit the timesheet",
          variant: "danger"
        })
        return;
      }
      const response = await this.submitTimesheet(this.id);
      if (response) {
        this.$emit("timesheet-submitted");
        this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
      }
    },
  },
  async mounted() {
    await this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
  }
};
</script>
<style lang="scss">
.table-week{
  td{
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  .chip-wrapper__bggray{
    height: 40px !important;
    border-radius: 4px !important;
  }
  
}
.align-wrapper {
  tr.table__hrow {
    th {
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        span {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
