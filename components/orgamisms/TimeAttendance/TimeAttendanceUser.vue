<template>
  <div id="time-attendance-wrapper">
    <div class="scroll_wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper px-025 bottom_border_wrapper"
      >
      <section-header-left
        :title="activeUserName"
        :avatar="activeUserData.photo"
        headerRight="headerRight"
      ></section-header-left>
      </div>
      <div class="time-attandance-wrapper">
       
        <div class="px-1 py-05">
          <div
            class="d-grid d-flex gap-1 py-05"
            style="grid-template-columns: repeat(3, 1fr)"
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
          <!-- <div style="position: relative">
            <button-gray
              variant="light"
              :scale="1"
              :title="ViewTitle"
              style="height: 2.5rem; color: #000"
              @on-click="show = !show"
              v-click-outside="clickOutside"
              class="pr-05"
            ></button-gray>
            <div class="menu-items">
              <ul v-if="show">
                <li class="d-flex align-center">
                  <span
                    class="ml-05"
                    @click="viewChange('Today')"
                    style="cursor: pointer"
                    >Today</span
                  >
                </li>
                <li class="d-flex align-center">
                  <span
                    class="ml-05"
                    @click="viewChange('Week')"
                    style="cursor: pointer"
                    >Week</span
                  >
                </li>
                <li class="d-flex align-center">
                  <span
                    class="ml-05"
                    @click="viewChange('Month')"
                    style="cursor: pointer"
                    >Month</span
                  >
                </li>
                <li class="d-flex align-center">
                  <span
                    class="ml-05"
                    @click="viewChange('Year')"
                    style="cursor: pointer"
                    >Year</span
                  >
                </li>
              </ul>
            </div>
          </div> -->

          <div
            class="d-flex justify-between align-center px-075 bottom_border_wrapper"
          >
            <div class="d-flex align-center">
              <div class="custom_date_picker">
                <!-- <div class="mr-05">Date:</div> -->
                <bib-datetime-picker
                  v-model="todayDate"
                  :format="format"
                  :parseDate="parseDate"
                  :formatDate="formatDate"
                  class="custom_date_picker"
                  @input="dateSelection($event)"
                ></bib-datetime-picker>
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
            :disabled="true"
          ></list-day>
          <list-week :listWeek="weekDataView" v-show="weekListView"></list-week>
          <list-month
            :listMonth="MonthViewData"
            v-show="monthListView"
          ></list-month>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TIME_ATTENDANCE_TAB } from "../../../utils/constant/Constant.js";
import { ACTIVITY_DICTIONARY } from "../../../utils/constant/TimesheetData"
import { INFO_CARD_DATA } from "../../../utils/constant/DashboardData";
import {
  TIMESHEET_DATA,
  WEEK_VIEW_DATA,
} from "../../../utils/constant/TimesheetData.js";
import { YEAR_LIST } from "../../../utils/constant/Calander";

import { mapGetters } from "vuex";
import { getCurrentDateMonth } from "../../../utils/functions/functions_lib.js";
import { getTimeFromDate, getDateDiffInHHMM } from "../../../utils/functions/dates";
import { formatTime } from "../../../utils/functions/clock_functions"
import fecha from "fecha";
import { getUserTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time.js';
import { DateTime } from "luxon";

const VIEWS = [
  { label: "Day", value: 'day' },
  { label: "Week", value: 'week' },
  { label: "Month", value: 'month' },
  { label: "Year", value: 'year' }
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
      weekDataView: WEEK_VIEW_DATA,
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
      format: "YYYY-MM-DD",
      todayDate: fecha.format(new Date(), "YYYY-MM-DD"),
      ACTIVITY_DICTIONARY,
      totalWorkInMS: 0,
      totalWork: '--:--',
      timesheetStatus: '',
    };
  },
  computed: {
    ...mapGetters({
      getActiveUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      activeDate: "date/getActiveDate",
      getformToDate: "leavevacation/getformToDate",
      getDailyTimeEntries: 'timeattendance/getDailyTimeEntries',
    }),
    todayListView() {
      return this.view === 'day';
    },
    weekListView() {
      return this.view === 'week';
    },
    monthListView() {
      return this.view === 'month';
    }
  },
  async created() {
    this.setView()
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.activeUserData = this.getActiveUser;
    await this.fillTimeEntries();
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
      if (timeEntry.activity === 'in') {
        this.totalWorkInMS += new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === 'break') {
        this.totalWorkInMS -= new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      }
      this.totalWork = formatTime(this.totalWorkInMS / 1000, false);
    },
    async handleEditEntry() {
      await this.fillTimeEntries();
      await this.getTimesheetWidget()
    },
    async handleDeleteEntry(id) {
      const timeEntry = this.todayData.find((entry) => entry.id === id);
      if (timeEntry.activity === 'in') {
        this.totalWorkInMS -= new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === 'break') {
        this.totalWorkInMS += new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      }
      this.todayData = this.todayData.filter((entry) => entry.id !== id);
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
      this.$router.push({ query: { view: 'year' } });
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
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
      if (tab.value == "Setting") {
        console.log(this.time, "this.time");
        this.getTime();
      }
    },
    openClock() {
      this.clockModal = true;
    },
    closeClock() {
      this.clockModal = false;
    },
    async fillTimeEntries() {
      this.loading = true;
      await this.$store.dispatch("timeattendance/setDailyTimeEntries", DateTime.fromISO(this.todayDate).toUTC().toISO());
      this.todayData = [];
      for (const timeEntry of this.getDailyTimeEntries) {
        this.handleNewEntry(timeEntry);
      }
      this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || ''
      this.loading = false;
    },
    async dateSelection(event){
      await this.fillTimeEntries();      
    },
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
