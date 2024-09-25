<template>
  <div id="time-attendance-wrapper">
    <loader :loading="loading"></loader>
    <div class="scroll_wrapper" id="scroll_wrapper">
      <div class="px-1">
        <div class="d-flex align-center">
          <div class="d-flex align-center pr-05">
            <label class="pr-05">View:</label>
            <dropdown-menu-chip
              :items="VIEWS"
              :button-config="changeViewButtonConfig"
              @on-click="onViewChange"
              size="lg"
              className="left:0px !important"
            ></dropdown-menu-chip>
          </div>

          <div class="d-flex align-center">
            <div v-if="view.value === 'month'" class="py-05">
              <div class="custom_date_picker">
                <custom-date-selector
                  :year.sync="year"
                  :month.sync="month"
                  :dates.sync="dates"
                  :show-full-year-list="true"
                />
              </div>
            </div>
            <bib-datetime-picker
              v-if="view.value === 'day'"
              v-model="todayDate"
              :format="format"
              :parseDate="parseDate"
              :formatDate="formatDate"
              class="custom_date_picker"
              :maxDate="maxDate"
              :minDate="minDate"
              style="margin-bottom: -7px"
              size="sm"
              hide-quick-select
              @input="dateSelection($event)"
            ></bib-datetime-picker>
            <div class="py-05" v-if="view.value === 'week'">
              <button-with-overlay
                :button-config="{ label: dateBtnLabel }"
                v-slot="scope"
              >
                <div class="pl-05">
                  <week-date-picker
                    :dates.sync="weekDates"
                    class="custom_date_picker"
                    :format="format"
                    @onChange="closeChangeHandler"
                    @close="
                      () => {
                        scope.close();
                        weekSelection();
                      }
                    "
                    style="z-index: 999999; height: 46px"
                  ></week-date-picker>
                </div>
              </button-with-overlay>
            </div>
            <div class="py-05" v-if="view.value === 'month' && !isFullYearList">
              <button-with-overlay
                :button-config="{ label: dateBtnLabel }"
                v-slot="scope"
              >
                <div class="pl-05">
                  <filter-week-date-picker
                    :dates.sync="weekDates"
                    class="custom_date_picker"
                    :filterDate="dates"
                    :format="format"
                    @onClose="onCloseWeekRange"
                    @close="
                      () => {
                        scope.close();
                        weekSelectionInMonthView();
                      }
                    "
                    style="z-index: 999999; height: 46px"
                  ></filter-week-date-picker>
                </div>
              </button-with-overlay>
            </div>
          </div>
        </div>
      </div>
      <div>
        <template>
          <list-day
            v-if="todayListView"
            :listToday="getDailyTimeEntries"
            v-show="todayListView"
            :total="totalWork"
            :status="timesheetStatus"
            :date="new Date(dayListDate + ' 00:00')"
            :disabled="true"
            :editable="false"
            :disableIcons="true"
          ></list-day>
          <list-week
            v-else-if="weekListView && timesheetId"
            :activityReports="weekDataActivityReports"
            :totalWork="weekDataTotalWork"
            :status="weekDataStatus"
            :id="timesheetId"
            :startOfWeek="weekDates.from"
          ></list-week>
          <month-list
            v-else-if="monthListView"
            :timesheetsList="timesheetsList"
            :loading="loading"
            :is-full-year-list="isFullYearList"
            :isAdmin="true"
          ></month-list>
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
  weekToUTCWeek,
} from "@/utils/functions/dates";
import { formatTime } from "@/utils/functions/clock_functions";
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData.js";
import {
  ACTIVITY_TYPE,
  MONTH_SELECTOR_DEFAULT,
  FILL_WEEKLY_ENTRY_EVENT,
  FILL_DAILY_ENTRY_EVENT,
} from "@/utils/constant/Constant";
import { viewType } from "@/utils/constant/DropdownMenu";
import {
  getTimesheets,
  getWeekTimesheets,
} from "@/utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import {getDateDiffInSeconds, startOfDayEndOfDayRange} from "../../../utils/functions/dates";
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";

const VIEWS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export default {
  data() {
    return {
      id: "",
      maxDate: DateTime.now().toISO(),
      dropMenu: viewType,
      dropMenuChipObject: viewType.today,
      timesheetData: [],
      ViewTitle: "Today",
      buttonTitle: "Approved",
      buttonIcon: "check-circle-solid",
      show: false,
      format: "DD-MMM-YYYY",
      todayDate: new URLSearchParams(window.location.search).get("date")
        ? new URLSearchParams(window.location.search).get("date")
        : fecha.format(new Date(), "DD-MMM-YYYY"),
      ACTIVITY_DICTIONARY,
      reportOptions: "",
      activeRole: this.activeUserRole === "ADMIN" ? true : false,
      todayData: [],
      // totalWork: "--:--",
      timesheetStatus: "",
      VIEWS,
      view: VIEWS[0],
      weekDates: {
        from: null,
        to: null,
      },
      weekDataActivityReports: [],
      weekDataTotalWork: "--:--",
      weekDataStatus: "",
      timesheetId: -1,
      loading: false,
      timesheetsList: [],
      isFullYearList: false,
      dates: {
        from: null,
        to: null,
      },
      year: null,
      month: null,
      timesheetDates: {
        from: null,
        to: null,
      },
      previousDate: new URLSearchParams(window.location.search).get("date")
        ? new URLSearchParams(window.location.search).get("date")
        : fecha.format(new Date(), "DD-MMM-YYYY"),
      summaryDate: new URLSearchParams(window.location.search).get("date")
        ? new URLSearchParams(window.location.search).get("date")
        : fecha.format(new Date(), "DD-MMM-YYYY"),
      previousWeekData: null,
      previousMonthWeekData: null,

    };
  },
  methods: {
    weekToUTCWeek,
    setView() {
      const viewValue = this.$route.query.view ?? VIEWS[0].value;
      this.view = { ...this.VIEWS.find((v) => v.value === viewValue) };
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    isMonthWeekMatchPrevious() {
      return (this.previousMonthWeekData === null ||
        (this.previousMonthWeekData?.from === this.weekDates.from)
        && this.previousMonthWeekData?.to === this.weekDates.to)
    },
    handleNewEntry(timeEntry) {
      this.todayData.push({
        ...timeEntry,
        start: getTimeFromDate(timeEntry.start),
        end: getTimeFromDate(timeEntry.end),
        total: getDateDiffInHHMM(timeEntry.start, timeEntry.end),
      });
      if (timeEntry.activity === "in") {
        this.totalWorkInMS +=
          new Date(timeEntry.end).getTime() -
          new Date(timeEntry.start).getTime();
      } else if (timeEntry.activity === "break") {
        this.totalWorkInMS -=
          new Date(timeEntry.end).getTime() -
          new Date(timeEntry.start).getTime();
      }
      // this.totalWork = formatTime(this.totalWorkInMS / 1000, false);
    },
    leaveStatus(e) {
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
    },
    clickOutside() {
      this.show = false;
    },
    resetWeekDates() {
      this.weekDates = {
        from: null,
        to: null,
      };
    },
    resetTodayDate() {
      this.todayDate = DateTime.now().toFormat(DATETIME_FORMAT);
    },
    setDefaultOnViewChange(view) {
      if (view === "week" && this.view.value !== "week") {
        this.resetWeekDates();
      } else if (view === "day" && this.view.value !== "day") {
        this.resetTodayDate();
      }
    },
    onViewChange(e) {
      this.setDefaultOnViewChange(e.value);
      this.$router.push({ query: { view: e.value } });
    },
    onViewTimesheetsClick() {
      this.$router.push({ query: { view: "week" } });
    },
    setPreviousWeekData(dates) {
      this.previousWeekData = dates;
    },
    setPreviousDate(date) {
      this.previousDate = date;
    },
    setSummaryDate(date) {
      this.summaryDate = date;
    },
    async dateSelection(value) {
      const dateValue = value === "" ? DateTime.now().toFormat(DATETIME_FORMAT) : value;
      this.todayDate = dateValue

      if(dateValue === this.previousDate) {
        return;
      }


      if(value !== "") {
        this.setSummaryDate(dateValue);
        this.setPreviousDate(dateValue);
      }

      await this.fillDailyTimeEntries();
    },
    async weekSelection() {
      this.setPreviousWeekData(this.weekDates);
      await this.fillWeeklyTimeEntries();
    },
    closeChangeHandler() {
      if(this.previousWeekData === null || this.previousWeekData?.from === this.weekDates.from) {
        return;
      }
      this.setPreviousWeekData(this.weekDates);

      this.fillWeeklyTimeEntries();
    },
    openClock() {
      this.clockModal = true;
    },
    closeClock() {
      this.clockModal = false;
    },
    async fillDailyTimeEntries() {
      // this.loading = true;
      if (!this.todayDate) return;
      await this.$store.dispatch("timeattendance/setEmployeeDailyTimeEntry", {
        date: DateTime.fromJSDate(new Date(this.todayDate)).toFormat(
          "yyyy-MM-dd"
        ),
        employeeId: this.id,
      });
      this.todayData = [];
      this.totalWorkInMS = 0;
      for (const timeEntry of this.getDailyTimeEntries) {
        this.handleNewEntry(timeEntry);
      }
      this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || "";
    },
    calculateDuration(start, end) {
      const startDateTime = DateTime.fromFormat(start, "HH:mm");
      let endDateTime = DateTime.fromFormat(end, "HH:mm");
      if (endDateTime < startDateTime) {
        endDateTime = endDateTime.plus({ days: 1 });
      }
      const duration = endDateTime.diff(startDateTime);
      return duration;
    },
    async fillWeeklyTimeEntries() {
      this.loading = true;
      const weekRange = this.weekToUTCWeek({
        from: new Date(this.weekDates.from),
        to: new Date(this.weekDates.to),
      });
      weekRange.employeeId = this.id;
      const weekData = new TimesheetParser(
        await getWeekTimesheets(weekRange)
      ).parse("week");
      this.weekDataActivityReports = weekData.activityReports || [];
      this.weekDataTotalWork = formatTime(weekData.total, false);
      this.weekDataStatus = weekData.status || "";
      this.timesheetId = weekData.id || "";
      this.loading = false;
    },
    async fillTimesheetEntries(isWeekRange = false) {
      this.loading = true;
      const { from, to } = this.weekToUTCWeek({
        from: new Date(
          isWeekRange ? this.weekDates.from : this.timesheetDates.from
        ),
        to: new Date(isWeekRange ? this.weekDates.to : this.timesheetDates.to),
      });

      let timesheets = await getTimesheets({ from, to, employeeId: this.id });
      timesheets = timesheets.map((employee) => {
        const parser = new TimesheetParser({ timesheets: employee });
        return parser.parse("weekDays");
      }).sort((a, b) => new Date(b.start) - new Date(a.start));
      this.timesheetsList = timesheets;
      this.loading = false;
    },
    formatDates({ from, to }) {
      const fromFormat = fecha.format(new Date(from), this.format);
      const toFormat = fecha.format(new Date(to), this.format);
      return `${fromFormat} -> ${toFormat}`;
    },
    calculateTotalWorkMs({ timeEntry }) {
      if (!timeEntry.end) return 0;

      return (
        new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime()
      );
    },
    setPreviousMonthWeekData(dates) {
      this.previousMonthWeekData = dates;
    },
    async onCloseWeekRange() {
      if(this.previousMonthWeekData === null ||
        (this.previousMonthWeekData?.from === this.weekDates.from &&
          this.previousMonthWeekData?.to === this.weekDates.to)) {
        return;
      }
      this.setPreviousMonthWeekData(this.weekDates)
      await this.fillTimesheetEntries();
    },
    async weekSelectionInMonthView() {
      this.setPreviousMonthWeekData(this.weekDates);
      await this.fillTimesheetEntries(true);
    },
    setTimesheetDates(from, to) {
      this.timesheetDates = { from: from, to: to };
    },
    registerRootListeners() {
      this.registerFillWeeklyEntryListener();
      this.registerFillDailyEntryListener();
    },
    unregisterRootListeners() {
      this.unregisterFillWeeklyEntryListener();
      this.unregisterFillDailyEntryListener();
    },
    registerFillDailyEntryListener() {
      this.$root.$on(FILL_DAILY_ENTRY_EVENT, () => {
        this.fillDailyTimeEntries();
      });
    },
    unregisterFillDailyEntryListener() {
      this.$root.$off(FILL_DAILY_ENTRY_EVENT);
    },
    registerFillWeeklyEntryListener() {
      this.$root.$on(FILL_WEEKLY_ENTRY_EVENT, () => {
        this.fillWeeklyTimeEntries();
      });
    },
    unregisterFillWeeklyEntryListener() {
      this.$root.$off(FILL_WEEKLY_ENTRY_EVENT);
    },
  },
  computed: {
    dayListDate() {
      if (!this.summaryDate) return null;
      return this.summaryDate;
    },
    minDate() {
      const hireDate = this.activeUser?.hireDate;
      return hireDate
        ? DateTime.fromISO(hireDate).toISODate()
        : DateTime.local(2024, 1, 1).toISODate();
    },
    totalWork() {
      if (!this.getDailyTimeEntries || this.getDailyTimeEntries.length === 0)
        return "";

      const timeEntriesIn = this.getDailyTimeEntries.filter(
        (entry) => entry.activity === ACTIVITY_TYPE.IN
      );
      const timeEntriesBreak = this.getDailyTimeEntries.filter(
        (entry) => entry.activity === ACTIVITY_TYPE.BREAK
      );

      const totalWorkInMS = timeEntriesIn.reduce((total, entry) => {
        if (!entry.end) return 0;
        return (
          total +
          getDateDiffInSeconds(
            getTimeFromDate(entry.start),
            getTimeFromDate(entry.end)
          )
        );
      }, 0);

      if (totalWorkInMS < 0) {
        return "00:00";
      }
      const totalBreakInMS = timeEntriesBreak
        .filter((entry) => entry.end)
        .reduce((total, entry) => {
          return (
            total +
            getDateDiffInSeconds(
              getTimeFromDate(entry.start),
              getTimeFromDate(entry.end)
            )
          );
        }, 0);

      const netTotalWorkInMS = totalWorkInMS - totalBreakInMS;

      return formatTime(netTotalWorkInMS, false);
    },
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
    monthListView() {
      return this.view.value === "month";
    },
    dateBtnLabel() {
      if (!this.weekDates || !this.weekDates?.from || !this.weekDates?.to)
        return "";
      const { from, to } = this.weekDates;
      return this.formatDates({ from, to });
    },
    changeViewButtonConfig() {
      if (!this.view) return {};
      return {
        ...this.VIEWS.find((v) => v.value === this.view.value),
        icon: "arrowhead-down",
      };
    },
  },
  async mounted() {
    this.registerRootListeners();
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },
  async created() {
    this.setView();
    this.id = this.$route.params.id;
    this.activeUserId = this.id;
    this.fetchUser(this.activeUserId);
    this.$store.dispatch("employee/setSelectedEmployeeTimer");
  },
  watch: {
    "$route.query.view"(newVal) {
      this.view.value = newVal || "day";
      this.view.label = this.VIEWS.find(
        (v) => v.value === this.view.value
      ).label;
    },
    dates(newval, old) {

      if (newval.from && newval.to) {
        console.log('newww=', newval);
        this.setTimesheetDates(newval.from, newval.to);
        this.fillTimesheetEntries();
      }
    },
    month(val) {
      if (val === MONTH_SELECTOR_DEFAULT.value) {
        this.isFullYearList = true;
      } else {
        this.isFullYearList = false;
      }
    },
  },
};
</script>
