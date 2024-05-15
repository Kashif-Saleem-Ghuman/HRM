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
            ></dropdown-menu-chip>
          </div>

          <div class="d-flex align-center">
            <div v-if="view.value === 'month'" class="py-05">
              <div class="custom_date_picker">
                <custom-date-selector :isAdminView="true" :year.sync="year" :month.sync="month" :dates.sync="dates" />
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
                size="sm"
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
              :date="new Date(todayDate + ' 00:00')"
              :disabled="true"
          ></list-day>
          <list-week
              v-else-if="(weekListView || weekListInMonthView) && timesheetId"
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
import {getDateDiffInHHMM, getTimeFromDate, weekToUTCWeek} from "@/utils/functions/dates";
import { formatTime } from "@/utils/functions/clock_functions";
import {
  ACTIVITY_DICTIONARY,
} from "@/utils/constant/TimesheetData.js";
import {
  ACTIVITY_TYPE, MONTH_SELECTOR_DEFAULT,
} from "@/utils/constant/Constant";
import { viewType } from "@/utils/constant/DropdownMenu";
import { getTimesheets } from "@/utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { startOfDayEndOfDayRange } from "@/utils/functions/dates";

const VIEWS = [
  { label: "Day", value: "day", variant: "light" },
  { label: "Week", value: "week", variant: "light" },
  { label: "Month", value: "month", variant: "light" },
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
      todayDate: fecha.format(new Date(), "DD-MMM-YYYY"),
      ACTIVITY_DICTIONARY,
      reportOptions: "",
      activeRole: this.activeUserRole === "ADMIN" ? true : false,
      todayData: [],
      // totalWork: "--:--",
      timesheetStatus: "",
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
      timesheetsList: [],
      isFullYearList: false,
      dates: {
        from: null,
        to: null,
      },
      year: null,
      month: null,
      weekDayDates: {
        from: null,
        to: null,
      },
      monthView: null,
      isAdminView: false,
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
      // this.loading = true;
      if (!this.todayDate) return;
      await this.$store.dispatch("timeattendance/setEmployeeDailyTimeEntry", {
        date: new Date(this.todayDate).toISOString(),
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
      const {from, to} = startOfDayEndOfDayRange({ startDate: this.weekDates.from, endDate: this.weekDates.to })

      const weekData = new TimesheetParser(
          await getTimesheets({from, to, employeeId: this.id })
      ).parse("week");
      this.weekDataActivityReports = weekData.activityReports || [];
      this.weekDataTotalWork = formatTime(
          (weekData.total || 0) * 60 * 60,
          false
      );
      this.weekDataStatus = weekData.status || "";
      this.timesheetId = weekData.id || "";
      this.loading = false;
    },
    async generateWeekDaysEntries(isWeekRange = false) {
      this.loading = true;
      const { from, to } = this.weekToUTCWeek({
        from: new Date(isWeekRange ? this.weekDates.from : this.weekDayDates.from),
        to: new Date(isWeekRange ? this.weekDates.to : this.weekDayDates.to),
      });
      let timesheets = await getTimesheets({ from, to, employeeId: this.id });
      timesheets = timesheets.map((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("weekDaysYearly");
      });
      this.timesheetsList = timesheets;
      this.loading = false;
    },
    formatDates({ from, to }) {
      const fromFormat = fecha.format(new Date(from), this.format);
      const toFormat = fecha.format(new Date(to), this.format);
      return `${fromFormat} -> ${toFormat}`;
    },
    calculateTotalWorkMs({ timeEntry }) {
      if (!timeEntry.end) return 0

      return (
          new Date(timeEntry.end).getTime() - new Date(timeEntry.start).getTime()
      );
    },
    setWeekDayDates(from, to) {
      this.weekDayDates = {from: from, to: to}
      this.weekDates = {from: from, to: to}
    },
    resetMonthView() {
      this.monthView = null;
    },
    weekDateChangeInMonthView() {
      this.monthView = 'week';
    },
    async weekSelectionInMonthView() {
      await this.generateWeekDaysEntries(true);
    },
    async onCloseWeekRange() {
      await this.generateWeekDaysEntries();
    },
  },
  computed: {
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
            this.calculateDuration(
                getTimeFromDate(entry.start),
                getTimeFromDate(entry.end)
            )
        );
      }, 0);

      const totalBreakInMS = timeEntriesBreak.reduce((total, entry) => {
        if (!entry.end) return 0;
        return (
            total +
            this.calculateDuration(
                getTimeFromDate(entry.start),
                getTimeFromDate(entry.end)
            )
        );
      }, 0);

      const netTotalWorkInMS = totalWorkInMS - totalBreakInMS;

      return formatTime(netTotalWorkInMS / 1000, false);
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
    weekListInMonthView() {
      return this.monthView === 'week';
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
  async created() {
    this.setView();
    this.id = this.$route.params.id;
    this.$store.dispatch("employee/setSelectedEmployeeTimer")
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();
  },
  watch: {
    "$route.query.view"(newVal) {
      this.resetMonthView();
      this.view.value = newVal || "day";
      this.view.label = this.VIEWS.find(
          (v) => v.value === this.view.value
      ).label;
    },
    dates(newval, old) {
      if(newval.from && newval.to) {
        this.setWeekDayDates(newval.from, newval.to);
        this.generateWeekDaysEntries();
        this.resetMonthView();
      }
    },
    month(val) {
      if(val === MONTH_SELECTOR_DEFAULT.value){
        this.isFullYearList = true;
      }else {
        this.isFullYearList = false;
      }
    }
  },
};
</script>
