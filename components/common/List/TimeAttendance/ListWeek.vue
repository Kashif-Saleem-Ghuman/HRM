<template>
  <div>
    <bib-table
      :fields="tableFields"
      class="bg-white"
      :sections="activityReportsList"
      :hide-no-column="true"
      :showTotal="true"
      :fixHeader="true"
      v-if="id >= 0"
    >
      <template #cell(name)="data">
          <div class="text-gray1 font-md text-left font-w-500">
            <div :class="getClassName(data.value.date)">
              {{ getWeekDay(data.value.weekDayLabel) }}
            </div>
            <div :class="getClassName(data.value.date)">
              {{ dateFormat(data.value.date) }}
            </div>
          </div>
      </template>
      <template #cell(in)="data">
        <chips
          :defaultPointer="true"
          :title="getInOut(data.value.in)"
          :className="getInOutClass(data.value.entryExists)"
        ></chips>
      </template>
      <template #cell(break)="data">
        <chips
          :defaultPointer="true"
          :title="getInOut(data.value.break)"
          :className="getInOutClass(data.value.entryExists)"
        ></chips>
      </template>
      <template #cell(out)="data">
        <chips
          :defaultPointer="true"
          :title="getInOut(data.value.out)"
          :className="getInOutClass(data.value.entryExists)"
        ></chips>
      </template>
      <template #cell(total)="data">
        <div
          :class="[
            'd-flex',
            'align-center',
            data.value.entryExists ? 'text-bold' : 'disabled',
          ]"
        >
          <span>{{ formatTime(data.value.total * 60, false) }}</span>
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
    <bib-notification
      :popupMessages="popupMessages"
      class="max-z-index"
    ></bib-notification>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
import fecha, { format } from "fecha";
import {
  TABLE_HEAD,
  WEEK_DAY,
  TIMESHEET_STATUS,
} from "@/utils/constant/Constant.js";
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";
import { formatTime } from "@/utils/functions/clock_functions";
import { submitTimesheet } from "@/utils/functions/functions_lib_api";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";

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
      type: [Array, Object],
      default: "--:--",
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
      popupMessages: [],
      submitTimesheet,
      TIMESHEET_STATUS,
      WEEK_DAY,
      todayDate: DateTime.now().toFormat(DATETIME_FORMAT),
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
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
        };
      });
    },
    totalValue() {
      return this.totalWork || "--:--";
    },
    statusValue() {
      return this.status;
    },
  },
  methods: {
    formatTime,
    openPopupNotification,
    // TODO could be in in utils to reuse in other components
    getWeekdayString(date) {
      return WEEK_DAY[
        DateTime.fromJSDate(new Date(date + " 00:00")).weekday % 7
      ].value;
    },
    getTodayDate() {
      this.todayDate;
    },

    dateFormat(item) {
      return item == null ? "---" : fecha.format(new Date(item), "DD-MMM-YYYY");
    },
    getClassName(value) {
      return this.todayDate === this.dateFormat(value) ? "text-bold" : "";
    },
    getWeekDay(day) {
      return day;
    },
    getInOut(inOut) {
      return inOut;
    },
    getInOutClass(value) {
      return value
        ? "chip-wrapper__bgsucess text-bold"
        : "chip-wrapper__bggray disabled";
    },
    async submitButtonClicked() {
      const response = await this.submitTimesheet(this.id);
      if (response) {
        this.$emit("timesheet-submitted");
      }
    },
  },
};
</script>
