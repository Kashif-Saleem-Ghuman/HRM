<template>
  <div id="time-attendance-wrapper">
    <div class="scroll_wrapper" id="scroll_wrapper">
      <dropdown-menu-custom
        sectionLabel="View : "
        :items="dropMenu"
        :buttonLabel="ViewTitle"
        :buttonIconShow="false"
        buttonIcon="add"
        @on-click="viewChange($event)"
      ></dropdown-menu-custom>
      <!-- <dropdown-menu-chip
        :items="dropMenuChip"
        :buttonLabel="buttonTitle"
        :buttonIconShow="true"
        :buttonIcon="buttonIcon"
        @on-click="leaveStatus($event)"
      ></dropdown-menu-chip> -->
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
            @on-click="viewChange('month')"
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
        <list-week :listWeek="weekDataView" v-show="weekListView"></list-week>
        <list-month
          :listMonth="MonthViewData"
          v-show="monthListView"
        ></list-month>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fecha from "fecha";
import {
  getTimeAttendanceDaily,
  getTimeAttendanceCustomRange,
  getTimesheet,
} from "../../../utils/functions/functions_lib_api";
import {
  getCurrentDateMonth,
  getCurrentWeek,
  getCurrentYear,
} from "../../../utils/functions/functions_lib";
import {
  getDateDiffInHHMM,
  getTimeFromDate,
} from "../../../utils/functions/dates";
import { formatTime } from "../../../utils/functions/clock_functions";
import {
  TIMESHEET_DATA,
  WEEK_VIEW_DATA,
  ACTIVITY_DICTIONARY,
} from "../../../utils/constant/TimesheetData.js";
import { DropdownMenu } from "../../../utils/constant/DropdownMenu";
export default {
  data() {
    return {
      id: "",
      dropMenu: DropdownMenu.tableListView,
      dropMenuChip: DropdownMenu.dropButtonChip,
      timesheetData: [],
      ViewTitle: "Today",
      buttonTitle: "Approved",
      buttonIcon: "check-circle-solid",
      show: false,
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
      format: "MMM D, YYYY",
      ACTIVITY_DICTIONARY,
      TIMESHEET_DATA,
      WEEK_VIEW_DATA,
      reportOptions: "",
      activeRole: this.activeUserRole === "ADMIN" ? true : false,
      todayData: [],
      totalWork: "--:--",
      timesheetStatus: "",
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
    viewChange(event) {
      if (e == "today") {
        this.todayListView = true;
        this.weekListView = false;
        this.monthListView = false;
        this.ViewTitle = "Today";
      }
      if (e == "week") {
        this.todayListView = false;
        this.weekListView = true;
        this.monthListView = false;
        this.ViewTitle = "Week";
      }
      if (e == "month") {
        this.todayListView = false;
        this.monthListView = true;
        this.weekListView = false;
        this.ViewTitle = "Month";
      }
      if (e == "year") {
        alert("No list Found");
      }
    },
    leaveStatus(e) {
      console.log(e, "vihange");
      if (e.key == "approve") {
        this.buttonTitle = "Approved";
      }
      if (e.key == "pending") {
        this.buttonTitle = "Pending";
        this.buttonIcon = "add";
      }
      if (e.key == "reject") {
        this.buttonTitle = "Reject";
        this.buttonIcon = "output";
      }
      if (e == "year") {
        alert("No list Found");
      }
    },
    clickOutside() {
      this.show = false;
    },
    dateSelection(event) {
      var date = fecha.format(new Date(event), "YYYY-MM-DD");
      this.todayDate = date;
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
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
      activeUserRole: "token/getUserRole",
    }),
  },
  async created() {
    this.id = this.$route.params.id;
    this.getCurrentYear();
    this.getCurrentDateMonth();
    this.getCurrentWeek();
    await this.getTimesheet();
    await this.$store.dispatch(
      "timeattendance/setEmployeeDailyTimeEntry",
      Number(this.id)
    );
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
      if (timeEntry.activity === "in") {
        work +=
          new Date(timeEntry.end).getTime() -
          new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === "break") {
        work -=
          new Date(timeEntry.end).getTime() -
          new Date(timeEntry.start).getTime();
      }
    }
    this.totalWork = formatTime(work / 1000, false);
    this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || "";
  },
  components: { DropdownMenu },
};
</script>
