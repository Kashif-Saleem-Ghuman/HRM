<template>
  <div id="time-attendance-wrapper">
    <div class="scroll_wrapper" id="scroll_wrapper">
      <div class="px-1 py-05">
        <div
          class="d-grid d-flex gap-1 py-05"
          style="grid-template-columns: repeat(2, 1fr)"
        >
          <info-card-timer
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
            <dropdown-menu-chip
              :items="VIEWS"
              :button-config="changeViewButtonConfig"
              @on-click="onViewChange"
            ></dropdown-menu-chip>
            <div
              class="d-flex justify-between align-center px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <div class="custom_date_picker">
                  <!-- <div class="mr-05">Date:</div> -->
                  <bib-datetime-picker
                    v-if="view.value === 'day'"
                    v-model="todayDate"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    class="custom_date_picker"
                    @input="dateSelection($event)"
                  ></bib-datetime-picker>
                </div>
                <div class="px-1 py-05" v-if="view.value === 'week'">
                  <button-with-overlay :button-config="{ label: dateBtnLabel }" v-slot="scope">
                    <div class="pl-05">
                      <week-date-picker
                        :dates.sync="weekDates"
                        class="custom_date_picker"
                        :format="format"
                        @close="() => {scope.close(); weekSelection();}"
                      ></week-date-picker>
                    </div>
                  </button-with-overlay>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <template v-if="!loading">
          <list-day
            v-if="todayListView && todayData.length"
            :listToday="todayData"
            v-show="todayListView"
            :total="totalWork"
            :status="timesheetStatus"
            :date="new Date(todayDate + ' 00:00')"
            :disabled="true"
          ></list-day>
          <list-week
            v-else-if="weekListView && timesheetId"
            :activityReports="weekDataActivityReports"
            :totalWork="weekDataTotalWork"
            :status="weekDataStatus"
            :id="timesheetId"
            :startOfWeek="weekDates.from"
          ></list-week>
          <no-record v-else />
        </template>
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
  { label: "Day", value: 'day', variant: 'light' },
  { label: "Week", value: 'week', variant: 'light' },
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
      view: VIEWS[0],
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
      const viewValue = this.$route.query.view ?? VIEWS[0].value;
      this.view = {...this.VIEWS.find((v) => v.value === viewValue)};
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
      this.$router.push({ query: { view: e.value } });
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
    formatDates({ from, to }) {
      const fromFormat = fecha.format(new Date(from), this.format);
      const toFormat = fecha.format(new Date(to), this.format);
      return `${fromFormat} -> ${toFormat}`
    },
  },
  computed: {
    ...mapGetters({
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
      activeUserRole: "token/getUserRole",
    }),
    todayListView() {
      return this.view.value === "day";
    },
    weekListView() {
      return this.view.value === "week";
    },
    dateBtnLabel() {
      if (!this.weekDates || !this.weekDates?.from || !this.weekDates?.to) return "";
      const { from, to } = this.weekDates;
      return this.formatDates({ from, to });
    },
    changeViewButtonConfig() {
      if (!this.view) return {};
      return {
        ...this.VIEWS.find((v) => v.value === this.view.value),
        icon: "arrowhead-down"
      };
    },
  },
  async created() {
    this.setView();
    this.id = this.$route.params.id;
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();
  },
  watch: {
    '$route.query.view'(newVal) {
      this.view.value = newVal || 'day';
      this.view.label = this.VIEWS.find((v) => v.value === this.view.value).label;
    },
  },
};
</script>
