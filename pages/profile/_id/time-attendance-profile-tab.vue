<template>
  <div id="time-attendance-wrapper">
    <div class="scroll_wrapper" id="scroll_wrapper">
      <div class="px-1 py-05">
      <dropdown-menu-custom
        sectionLabel="View : "
        :items="dropMenu"
        :button-config="dropMenuChipObject"
        @on-click="viewChange($event)"
      ></dropdown-menu-custom>
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
            @on-click="viewChange('month')"
            className="button-wrapper__bgwarnning"
          ></info-card-one>

          <!-- <info-card-help
            custumBg="help-wrapper__bg-black"
          ></info-card-help> -->
          
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
      </div>
      <div>
        <list-day
          v-if="todayData.length"
          :listToday="todayData"
          v-show="todayListView"
          :total="totalWork"
          :status="timesheetStatus"
          :date="new Date(todayDate + ' 00:00')"
          disabled="true"
        ></list-day>
        <no-record v-else />
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
import { DateTime } from "luxon";
import {
  getTimeAttendanceDaily,
  getTimeAttendanceCustomRange,
} from "../../../utils/functions/functions_lib_api";
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
import { DropdownMenu, viewType } from "../../../utils/constant/DropdownMenu";
export default {
  data() {
    return {
      id: "",
      dropMenu: viewType,
      dropMenuChipObject:viewType.today,
      timesheetData: [],
      ViewTitle: "Today",
      buttonTitle: "Approved",
      buttonIcon: "check-circle-solid",
      show: false,
      format: "DD-MMM-YYYY",
      todayDate: fecha.format(new Date(), "DD-MMM-YYYY"),
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
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    viewChange(e) {
      if (e.key == "today") {
        this.todayListView = true;
        this.weekListView = false;
        this.monthListView = false;
        this.dropMenuChipObject = viewType.today
      }
      if (e.key == "week") {
        this.todayListView = false;
        this.weekListView = true;
        this.monthListView = false;
        this.dropMenuChipObject = viewType.week
      }
      if (e.key == "month") {
        this.todayListView = false;
        this.monthListView = true;
        this.weekListView = false;
        this.dropMenuChipObject = viewType.month
      }
      if (e.key == "year") {
        alert("No list Found");
      }
      if (e == "month") {
        this.$router.push("/time-attendance/timesheets/");
          return;
      }
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
    async dateSelection(event) {
      await this.fillTimeEntries();
    },
    openClock() {
      this.clockModal = true;
    },
    closeClock() {
      this.clockModal = false;
    },
    async fillTimeEntries() {
      await this.$store.dispatch(
        "timeattendance/setEmployeeDailyTimeEntry",
        {
          date: new Date(this.todayDate).toISOString(),
          employeeId: this.id,
        },
      );
      this.todayData = [];
      this.totalWorkInMS = 0;
      for (const timeEntry of this.getDailyTimeEntries) {
        this.handleNewEntry(timeEntry);
      }
      this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || ''
    },
  },
  computed: {
    ...mapGetters({
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
      activeUserRole: "token/getUserRole",
    }),
  },
  async mounted() {
    this.id = this.$route.params.id;
    await this.fillTimeEntries();
  },
  components: { DropdownMenu },
};
</script>
