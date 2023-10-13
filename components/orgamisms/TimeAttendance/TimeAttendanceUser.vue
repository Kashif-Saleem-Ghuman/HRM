<template>
  <div id="time-attendance-wrapper">
    <div class="scroll_wrapper">
      <div
        class="d-flex justify-between align-center bottom_border_wrapper"
      >
      <section-header-left
        :title="activeUserName"
        :avatar="activeUserData.photo"
      ></section-header-left>
      </div>
      <div class="time-attandance-wrapper">
        <div class="px-1 py-05">
          <div
            class="d-grid d-flex gap-1 py-05"
            style="grid-template-columns: repeat(3, 1fr)"
            v-if="view === 'day'"
          >
            <info-card-timer
              activeUserRole="USER"
              @clock="openClock"
            ></info-card-timer>
            <bib-clock-wrapper
              @close="closeClock"
              @click:outside="closeClock"
              title="Business in box / Timer"
              :clockModal="clockModal"
              v-if="clockModal"
            >
            </bib-clock-wrapper>
            <info-card-one
              :item="timesheetWidgetData"
              title="View Timesheet"
              buttonLable="View timesheets"
              icon="table"
              profilePic="profilePic"
              buttonVariant="light"
              className="button-wrapper__bgwarnning"
              @on-click="onViewTimesheetsClick"
            ></info-card-one>
            <info-card-help custumBg="help-wrapper__bg-black"></info-card-help>
          </div>
        </div>
        <div class="d-flex align-center bottom_border_wrapper px-1 py-05">
          <label class="pr-05">View:</label>
          <bib-input
            type="select"
            v-model="view"
            :options="VIEWS"
            label=""
            placeholder=""
            :disabled="false"
            @input="onViewChange"
            style="width: 10vw;"
          ></bib-input>
          <div
            class="d-flex justify-between align-center px-075 bottom_border_wrapper"
          >
            <div class="d-flex align-center">
              <div class="custom_date_picker">
                <!-- <div class="mr-05">Date:</div> -->
                <bib-datetime-picker
                  v-if="view === 'day'"
                  v-model="todayDate"
                  :format="format"
                  :parseDate="parseDate"
                  :formatDate="formatDate"
                  class="custom_date_picker"
                  @input="dateSelection($event)"
                ></bib-datetime-picker>
              </div>
              <div class="custom_date_picker">
                <week-date-picker 
                  v-if="view === 'week'"
                  :dates.sync="weekDates"
                  class="custom_date_picker"
                  @close="weekSelection"
                  :format="format"
                ></week-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div>
          <list-day
            v-if="!loading"
            :listToday="todayData"
            v-show="todayListView"
            @new-entry="handleNewEntry"
            @edit-entry="handleEditEntry"
            @delete-entry="handleDeleteEntry"
            :date="new Date(todayDate + ' 00:00')"
            :total="totalWork"
          ></list-day>
          <list-week
            :activityReports="weekDataActivityReports"
            :totalWork="weekDataTotalWork"
            :status="weekDataStatus"
            :id="timesheetId"
            @timesheet-submitted="onTimesheetSubmitted"
            v-if="weekListView"
          ></list-week>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { getTimesheets } from "@/utils/functions/api_call/timeattendance/time";
import { TIME_ATTENDANCE_TAB } from "../../../utils/constant/Constant.js";
import { ACTIVITY_DICTIONARY } from "../../../utils/constant/TimesheetData"
import { INFO_CARD_DATA } from "../../../utils/constant/DashboardData";
import {
  TIMESHEET_DATA,
} from "../../../utils/constant/TimesheetData.js";
import { YEAR_LIST } from "../../../utils/constant/Calander";

import { mapGetters } from "vuex";
import { getCurrentDateMonth } from "../../../utils/functions/functions_lib.js";
import { getTimeFromDate, getDateDiffInHHMM } from "../../../utils/functions/dates";
import { formatTime } from "../../../utils/functions/clock_functions"
import { getUserTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time.js';
import { DateTime } from "luxon";

const VIEWS = [
  { label: "Day", value: 'day' },
  { label: "Week", value: 'week' },
]

export default {
  data() {
    return {
      VIEWS,
      view: "",
      activeUserData: "",
      activeUserName: "",
      ViewTitle: "Today",
      monthList: YEAR_LIST,
      show: false,
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      dayWiseDataTimesheet: TIMESHEET_DATA,
      todayData: [],
      MonthViewData: TIMESHEET_DATA,
      activeTab: "Attendance",
      loading: false,
      form: {},
      // Time & attandance
      infoCardData: INFO_CARD_DATA,
      timesheetWidgetData: {},
      timesheetData: TIMESHEET_DATA,
      clockModal: false,
      localData: [],
      getCurrentDate: "",
      date: null,
      format: "yyyy-MM-dd",
      todayDate: DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd"),
      ACTIVITY_DICTIONARY,
      totalWorkInMS: 0,
      totalWork: "--:--",
      timesheetStatus: "",
      weekDates: { 
        from: DateTime.fromJSDate(new Date()).startOf("week"), 
        to: DateTime.fromJSDate(new Date()).endOf("week"),
      },
      weekDataActivityReports: [],
      weekDataTotalWork: "--:--",
      weekDataStatus: "",
      timesheetId: -1,
    };
  },
  computed: {
    ...mapGetters({
      getActiveUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      activeDate: "date/getActiveDate",
      getformToDate: "leavevacation/getformToDate",
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
    }),
    todayListView() {
      return this.view === "day";
    },
    weekListView() {
      return this.view === "week";
    },
    monthListView() {
      return this.view === "month";
    },
    dateBtnLabel() {
      if (!this.weekDates || !this.weekDates?.from || !this.weekDates?.to) return "";
      const { from, to } = this.weekDates;
      return this.formatDates({ from, to });
    },
  },
  async created() {
    this.setView()
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.activeUserData = this.getActiveUser;
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();
    this.activeUserName =
      this.activeUserData.firstName +
      " " +
      this.activeUserData.lastName +
      " / " +
      "Time & Attendance";

    this.getTimesheetWidget()
  },
  methods: {
    setView() {
      this.view = this.$route.query.view ?? VIEWS[0].value
    },
    handleNewEntry(timeEntry) { 
      this.todayData.push({
        activity: {
          label: ACTIVITY_DICTIONARY[timeEntry.activity],
          value: timeEntry.activity,
        },
        start: getTimeFromDate(timeEntry.start),
        end: getTimeFromDate(timeEntry.end),
        total: getDateDiffInHHMM(timeEntry.start, timeEntry.end),
        status: timeEntry.status,
        id: timeEntry.id,
      });
      if (timeEntry.activity === "in") {
        this.totalWorkInMS += new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === "break") {
        this.totalWorkInMS -= new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      }
      this.totalWork = formatTime(this.totalWorkInMS / 1000, false);
    },
    async handleEditEntry() {
      await this.fillDailyTimeEntries();
      await this.getTimesheetWidget()
    },
    async handleDeleteEntry(id) {
      const timeEntry = this.todayData.find((entry) => entry.id === id);
      if (timeEntry.activity === "in") {
        this.totalWorkInMS -= new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === "break") {
        this.totalWorkInMS += new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      }
      this.todayData = this.todayData.filter((entry) => entry.id !== id);
      this.totalWork = formatTime(this.totalWorkInMS / 1000, false);
    },
    async getTimesheetWidget() {
      const widget = await getUserTimesheetWidget()
      this.timesheetWidgetData = widget
    },
    clickOutside() {
      this.show = false;
    },
    onViewChange(e) {
      this.$router.push({ query: { view: e } });
    },

    onViewTimesheetsClick() {
      this.$router.push({ query: { view: "year" } });
    },
    getCurrentDateMonth,

    change(event, name) {
      this.updateForm[name] = event;
      console.log(this.updateForm, "switchLabelweekStarts");
    },
    userId(id) {
      this.$router.push("/profile/" + id);
    },
    parseDate(dateString, format) {
      return DateTime.fromFormat(dateString, format).toJSDate();
    },
    formatDate(dateObj, format) {
      return DateTime.fromJSDate(dateObj).toFormat(format);
    },
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
      if (tab.value == "Setting") {
        this.getTime();
      }
    },
    openClock() {
      this.clockModal = true;
    },
    closeClock() {
      this.clockModal = false;
    },
    async fillDailyTimeEntries() {
      this.loading = true;
      await this.$store.dispatch(
        "timeattendance/setDailyTimeEntries",
        DateTime.fromFormat(this.todayDate, this.format).toUTC().toISO(),
      );
      this.todayData = [];
      this.totalWorkInMS = 0;
      for (const timeEntry of this.getDailyTimeEntries) {
        this.handleNewEntry(timeEntry);
      }
      this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || "";
      this.loading = false;
    },
    async fillWeeklyTimeEntries() {
      this.loading = true;
      const weekData = (new TimesheetParser(await getTimesheets(this.weekDates))).parse("week");
      this.weekDataActivityReports = weekData.activityReports;
      this.weekDataTotalWork = formatTime(weekData.total * 60 * 60, false);
      this.weekDataStatus = weekData.status;
      this.timesheetId = weekData.id;
      this.loading = false;
    },
    async dateSelection(){
      await this.fillDailyTimeEntries();      
    },
    async weekSelection() {
      await this.fillWeeklyTimeEntries();
    },
    async onTimesheetSubmitted() {
      await this.fillWeeklyTimeEntries();
    }
  },

  watch: {
    '$route.query.view'(newVal) {
      this.view = newVal || 'day';
    },
  },
};
</script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  > li {
    display: inline; // Remove list-style and block-level defaults
    > a,
    > span {
      position: relative;
      float: left; // Collapse white-space
      padding: 5px 10px;
      line-height: 30px;
      text-decoration: none;
      color: #000;
      background-color: #d5e8d4;
      border: 1px solid #8dd488;
      margin-left: -1px;
    }
    &:first-child {
      > a,
      > span {
        margin-left: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    &:last-child {
      > a,
      > span {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  > li > a,
  > li > span {
    &:hover {
      z-index: 2;
      color: #31a22c;
      background-color: #f2f5f1;
      // border-color: @pagination-hover-border;
    }
  }

  > .active > a,
  > .active > span {
    &,
    &:hover,
    &:focus {
      z-index: 3;
      color: #fff;
      background-color: #31a22c;
      // border-color: @pagination-active-border;
      cursor: default;
    }
  }
}
</style>
