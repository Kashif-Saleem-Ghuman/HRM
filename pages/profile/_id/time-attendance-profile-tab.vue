<template>
  <div id="time-attendance-wrapper">
    <div class="scroll_wrapper" id="scroll_wrapper">
      <div class="px-1 py-05">
        <div
          class="d-grid d-flex gap-1 py-05"
          style="grid-template-columns: repeat(2, 1fr)"
        >
          <info-card-timer
            :activeUserRole="activeUserRole"
            @clock="openClock"
            :employeeId="Number(this.id)"
            v-if="view === 'day'"
          ></info-card-timer>
          <info-card-one
            :item="timesheetData"
            title="View Timesheet"
            buttonLable="View timesheet past due"
            icon="table"
            profilePic="profilePic"
            buttonVariant="light"
            @on-click="onViewTimesheetsClick"
            className="button-wrapper__bgwarnning"
            v-if="view === 'day'"
          ></info-card-one>
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
        </div>
      </div>
      <div>
        <list-day
          v-if="!loading && todayData.length && todayListView"
          :listToday="todayData"
          v-show="todayListView"
          :total="totalWork"
          :status="timesheetStatus"
          :date="new Date(todayDate + ' 00:00')"
          :disabled="true"
        ></list-day>
        <no-record v-else-if="!loading && todayListView" />
        <list-week
          :activityReports="weekDataActivityReports"
          :totalWork="weekDataTotalWork"
          :status="weekDataStatus"
          :id="timesheetId"
          v-if="!loading && weekListView"
        ></list-week>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import { mapGetters } from "vuex";
import fecha from "fecha";
import {
  getDateDiffInHHMM,
  getTimeFromDate,
} from "@/utils/functions/dates";
import { formatTime } from "@/utils/functions/clock_functions";
import {
  TIMESHEET_DATA,
  WEEK_VIEW_DATA,
  ACTIVITY_DICTIONARY,
} from "@/utils/constant/TimesheetData.js";
import { viewType } from "@/utils/constant/DropdownMenu";
import { getTimesheets } from "@/utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";

const VIEWS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
]

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
      MonthViewData: TIMESHEET_DATA,
      weekDataView: WEEK_VIEW_DATA,
      VIEWS,
      view: "",
      weekDates: { 
        from: DateTime.now().startOf("week"), 
        to: DateTime.now().endOf("week"),
      },
      weekDataActivityReports: [],
      weekDataTotalWork: "--:--",
      weekDataStatus: "",
      timesheetId: -1,
      loading: false,
    };
  },
  methods: {
    setView() {
      this.view = this.$route.query.view ?? VIEWS[0].value
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
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
    onViewChange(e) {
      this.$router.push({ query: { view: e } });
    },
    onViewTimesheetsClick() {
      this.$router.push({ query: { view: "week" } });
    },
    async dateSelection() {
      await this.fillDailyTimeEntries();
    },
    async weekSelection() {
      await this.fillWeeklyTimeEntries();
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
      this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || ""
      this.loading = false;
    },
    async fillWeeklyTimeEntries() {
      this.loading = true;
      const weekData = (
        new TimesheetParser(
          await getTimesheets({ ...this.weekDates, employeeId: this.id })
        )
      ).parse("week");
      this.weekDataActivityReports = weekData.activityReports || [];
      this.weekDataTotalWork = formatTime((weekData.total || 0) * 60 * 60, false);
      this.weekDataStatus = weekData.status || "";
      this.timesheetId = weekData.id || "";
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
      activeUserRole: "token/getUserRole",
    }),
    todayListView() {
      return this.view === "day";
    },
    weekListView() {
      return this.view === "week";
    },
  },
  async created() {
    this.setView();
    this.id = this.$route.params.id;
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();  },
};
</script>
