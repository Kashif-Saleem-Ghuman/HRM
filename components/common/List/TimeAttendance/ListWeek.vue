<template>
    <div class="remove-pad">
      <custom-table
        :fields="tableFields"
        class="border-gray4 bg-white"
        :sections="activityReportsList"
        :hide-no-column="true"
        :showTotal=true
        :colspan="4"
        :totalValue="totalValue"
        :status="status"
        :buttonDisabled="this.status !== 'not_submitted'"
        @button-clicked="submitButtonClicked"
        v-if="id >= 0"
      >
        <template #cell(name)="data">
          <div class="d-flex mx-05 my-025 align-center text-left justify-left">
            <div class="text-black font-md text-left font-w-500">
              {{ data.value.weekDayLabel }}
            </div>
          </div>
          <div class="d-flex mx-05 my-025 align-left text-left justify-left">
            <div class="text-left text-gray1 font-w-400">
              {{ data.value.date }}
            </div>
          </div>
        </template>
        <template #cell(in)="data">
          <div class="d-flex w-100 m-0 align-center text-center justify-center">
            <chips
              :defaultPointer="true"
              :title="data.value.in"
              :class="['w-100', 'm-0', 'align-center', 'text-center', 'justify-center']"
              :className="[data.value.entryExists ? 'chip-wrapper__bgsucess text-bold' : 'chip-wrapper__bggray disabled', 'd-align']"
            ></chips>
          </div>
        </template>
        <template #cell(break)="data">
          <div class="d-flex m-0 align-center text-center justify-center">
            <chips
              :defaultPointer="true"
              :title="data.value.break"
              :class="['w-100', 'm-0', 'align-center', 'text-center', 'justify-center']"
              :className="[data.value.entryExists ? 'chip-wrapper__bgsucess text-bold' : 'chip-wrapper__bggray disabled', 'd-align']"
            ></chips>
          </div>
        </template>
        <template #cell(out)="data">
          <div class="d-flex m-0 align-center text-center justify-center">
            <chips
              :defaultPointer="true"
              :title="data.value.out"
              :class="['w-100', 'm-0', 'align-center', 'text-center', 'justify-center']"
              :className="[data.value.entryExists ? 'chip-wrapper__bgsucess text-bold' : 'chip-wrapper__bggray disabled', 'd-align']"
            ></chips>
          </div>
        </template>
        <template #cell(total)="data">
          <div
            :class="[
              'd-flex',
              'm-0',
              'px-1',
              'align-center',
              'text-center',
              'justify-center',
              data.value.entryExists ? 'text-bold' : 'disabled'
            ]"
          >
            <span>{{ formatTime(data.value.total * 60, false) }}</span>
          </div>
        </template>
      </custom-table>
      <time-sheet-modal
        @close="timesheetModal = false"
        :timesheetModal="timesheetModal"
        :items="filteredData"
      ></time-sheet-modal>
    </div>
  </template>
  
<script>
import { mapGetters } from "vuex"
import { DateTime } from "luxon";
import { TABLE_HEAD, WEEK_DAY, TIMESHEET_STATUS } from "@/utils/constant/Constant.js";
import { TIMESHEET_DATA } from "@/utils/constant/TimesheetData";
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
    id: {
      type: Number,
      default: -1,
    },
    startOfWeek: {
      type: String,
      default: DateTime.now().startOf('week').toISODate(),
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
      localData: TIMESHEET_DATA,
      filteredData: [],
      submitTimesheet,
      TIMESHEET_STATUS,
      WEEK_DAY,
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
    activityReportsList() {
      return WEEK_DAY.map(({ label, value }, index) => {
        const report = this.activityReports
          .find((ar) => this.getWeekdayString(ar.date) === value)
          ?.activityReport;
        return {
          weekDayLabel: label,
          in: report?.in || "00:00",
          out: report?.out || "00:00",
          break: report?.break || "00:00",
          total: report?.total || 0,
          entryExists: Boolean(report),
          date: DateTime.fromISO(this.startOfWeek).plus({days: index}).toFormat("yyyy-MM-dd"),
        };
      });
    },
    totalValue() {
      return this.totalWork || "--:--"
    },
    statusValue() {
      return this.status;
    },
  },
  methods: {
    formatTime,
    // TODO could be in in utils to reuse in other components
    getWeekdayString(date) {
      return WEEK_DAY[
        DateTime
        .fromJSDate(new Date(date + " 00:00"))
          .weekday
          % 7
      ].value
    },
    async submitButtonClicked() {
      const response = await this.submitTimesheet(this.id);
      if (response) {
        this.$emit("timesheet-submitted");
      }
    }
  },
};
</script>
  
<style lang="scss">

</style>