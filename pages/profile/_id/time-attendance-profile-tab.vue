<template>
<div id="time-attendance-wrapper" class="click-menu">
  <div class="scroll_wrapper" id="scroll_wrapper">
    <div class="d-flex align-center px-1 py-05 bottom_border_wrapper">
      <label class="pr-05">View:</label>
      <div style="position: relative">
        <button-gray
          variant="light"
          :scale="1"
          :title="ViewTitle"
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
      </div>
      <!-- <div class="d-flex justify-between align-center">
        <div class="d-flex align-center">
          <div class="custom_date_picker">
            <div class="mr-05">Date:</div>
            <bib-datetime-picker
              v-model="date2"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              class="custom_date_picker"
              @input="dateSelection($event)"
              style="margin-bottom: -8px !important;"
            ></bib-datetime-picker>
          </div>
        </div>
      </div> -->
    </div>
    <div class="px-1 py-05">
      <div
        class="d-grid d-flex gap-1 py-05"
        style="grid-template-columns: repeat(2, 1fr)"
      >
        <info-card-timer
          :activeUserRole="activeUserRole"
          @clock="openClock"
          :employeeId="Number(this.id)"
        ></info-card-timer>
        <info-card-one
          :item="timesheetData"
          title="View Timesheet"
          buttonLable="View timesheet past due"
          icon="table"
          profilePic="profilePic"
          buttonVariant="light"
          @on-click="viewChange('Month')"
          className="button-wrapper__bgwarnning"
        ></info-card-one>

        <!-- <info-card-help
          custumBg="help-wrapper__bg-black"
        ></info-card-help> -->
      </div>
    </div>
    <div>
      <list-day-admin
        :listToday="todayData"
        v-show="todayListView"
        :totalWork="totalWork"
        :status="timesheetStatus"
      ></list-day-admin>
      <list-week
        :listWeek="weekDataView"
        v-show="weekListView"
      ></list-week>
      <list-month
        :listMonth="MonthViewData"
        v-show="monthListView"
      ></list-month>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import fecha from 'fecha';
import {
  getTimeAttendanceDaily, 
  getTimeAttendanceCustomRange, 
  getTimesheet,
} from '../../../utils/functions/functions_lib_api';
import { getCurrentDateMonth, getCurrentWeek, getCurrentYear } from '../../../utils/functions/functions_lib';
import { getDateDiffInHHMM, getTimeFromDate } from "../../../utils/functions/dates";
import { formatTime } from "../../../utils/functions/clock_functions";
import {
  TIMESHEET_DATA,
  WEEK_VIEW_DATA,
  ACTIVITY_DICTIONARY,
} from "../../../utils/constant/TimesheetData.js";

export default {
  data() {
    return {
      id: '',
      timesheetData: [],
      ViewTitle: 'Today',
      show: false,
      date2: fecha.format(new Date(), 'YYYY-MM-DD'),
      format: 'MMM D, YYYY',
      ACTIVITY_DICTIONARY,
      TIMESHEET_DATA,
      WEEK_VIEW_DATA,
      reportOptions: '',
      activeRole: this.activeUserRole === 'ADMIN' ? true : false,
      todayData: [],
      totalWork: '--:--',
      timesheetStatus: '',
      todayListView: true,
      weekListView: false,
      monthListView: false,
      MonthViewData: TIMESHEET_DATA,
      weekDataView: WEEK_VIEW_DATA,
    };
  },
  methods: {
    getTimeAttendanceDaily,
    getTimeAttendanceCustomRange,
    getTimesheet,
    getCurrentYear,
    getCurrentDateMonth,
    getCurrentWeek,
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    viewChange(e) {
      if (e == 'Today') {
        this.todayListView = true;
        this.weekListView = false;
        this.monthListView = false;
        this.ViewTitle = 'Today';
      }
      if (e == 'Week') {
        this.todayListView = false;
        this.weekListView = true;
        this.monthListView = false;
        this.ViewTitle = 'Week';
      }
      if (e == 'Month') {
        this.todayListView = false;
        this.monthListView = true;
        this.weekListView = false;
        this.ViewTitle = 'Month';
      }
      if (e == 'Year') {
        alert('No list Found');
      }
    },
    clickOutside() {
      this.show = false;
    },
    dateSelection(event){
      var date = fecha.format(new Date(event), 'YYYY-MM-DD');
      this.todayDate = date
      this.getTimeAttendanceDaily(date);
    },
    openClock() {
      this.clockModal = true;
    },
    closeClock() {
      this.clockModal = false;
    },
  },
  computed: {
    ...mapGetters({
      getDailyTimeEntries: 'timeattendance/getDailyTimeEntries',
      activeUserRole: "token/getUserRole",
    }),
  },
  async created() {
    this.id = this.$route.params.id;
    this.getCurrentYear();
    this.getCurrentDateMonth();
    this.getCurrentWeek();
    await this.getTimesheet();
    await this.$store.dispatch('timeattendance/setEmployeeDailyTimeEntry', Number(this.id));
    this.todayData = [];
    let work = 0; // miliseconds
    for (const timeEntry of this.getDailyTimeEntries) {
      this.todayData.push({
        activityTitle: ACTIVITY_DICTIONARY[timeEntry.activity],
        start: getTimeFromDate(timeEntry.start),
        end: getTimeFromDate(timeEntry.end),
        total: getDateDiffInHHMM(timeEntry.start, timeEntry.end),
        status: timeEntry.status,
      });
      if (timeEntry.activity === 'in') {
        work += new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === 'break') {
        work -= new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime();
      }
    }
    this.totalWork = formatTime(work / 1000, false);
    this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || ''
  },
}
</script>
<style lang="scss">
.click-menu {
  .button-items {
    display: flex;
    align-items: center;

    label {
      padding-right: 5px;
      font-size: 14px;
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid #f2f2f5;
      border-radius: 0.2rem;
      background-color: #f2f2f5;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: #fff;
        color: #6d7278;
      }
    }
  }
  .menu-items {
    background-color: #fff;
    width: 97px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: 0px;
    top: 0px;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 5px 0;
      }
    }
  }
}
</style>