<template>
  <div id="time-attendance-wrapper">
    <loader :loading="loading"></loader>
    <div class="scroll_wrapper">
      <section-header-left title="Time & Attendance"></section-header-left>
      <div class="time-attandance-wrapper">
        <div class="px-1">
          <div
            class="d-grid d-flex gap-1 py-1"
            style="grid-template-columns: repeat(3, 1fr)"
            v-if="view.value === 'day'"
          >
            <info-card-timer
              @clock="openClock"
              @timer-stop="handleTimerStop"
              :disabled="hasInEntryToday"
              :todayDate="todayDate"
              :isTodayTimeEntryLocked="isTodayTimeEntryLocked"
              icon="time-alarm"
            ></info-card-timer>

            <info-card-one
              :item="timesheetWidgetData"
              :showProgress="true"
              title="Timesheets"
              buttonLable="View timesheets"
              icon="table"
              profilePic="profilePic"
              @on-click="onViewTimesheetsClick"
            ></info-card-one>
            <!--
             <info-card-help custumBg="help-wrapper__bg-black"></info-card-help> -->
            <info-card-leave-vacation
              :title="$button.PTO.label"
              :daysUsed="allowanceLeavesDetailedData.vacationDaysUsed"
              :totalAllowance="allowanceLeavesDetailedData.vacationDaysAllowed"
              :scheduledDays="allowanceLeavesDetailedData.vacationDaysScheduled"
              :daysUsedCarryOver="allowanceLeavesDetailedData.vacationCarryOver"
              :isFromHomePage="true"
              buttonLable="Request Time-Off"
              icon="airplane-solid"
              className="button-wrapper__bgsucess"
              :variant="isLightThemeCheck ? $button.lightButton.variant : 'secondary'"
              @on-click="addLeaves('vacation')"
            ></info-card-leave-vacation>
          </div>
        </div>
        <div class="d-flex align-center px-1">
          <label class="pr-05">View:</label>
          <dropdown-menu-chip
            :items="VIEWS"
            :button-config="changeViewButtonConfig"
            @on-click="onViewChange"
            class="pr-05"
            className="left:0"
          ></dropdown-menu-chip>
          <div class="d-flex justify-between align-center">
            <div class="d-flex align-center">
              <div class="custom_date_picker">
                <div v-if="monthListView" class="py-05">
                  <div class="custom_date_picker">
                    <custom-date-selector
                      :year.sync="year"
                      :month.sync="month"
                      :dates.sync="dates"
                    />
                  </div>
                </div>
                <div
                  v-if="monthListView && !isFullYearList"
                  class="py-05 pl-05"
                >
                  <button-with-overlay
                    :button-config="{ label: dateBtnLabel }"
                    v-slot="scope"
                  >
                    <div class="pl-05">
                      <filter-week-date-picker
                        :dates.sync="weekDates"
                        :filterDate="dates"
                        class="custom_date_picker"
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
                <!-- <div class="mr-05">Date:</div> -->
                <bib-datetime-picker
                  v-if="view.value === 'day'"
                  v-model="todayDate"
                  :maxDate="maxDate"
                  :minDate="minDate"
                  :class="`custom_date_picker ${monthListView ? 'pl-05' : ''} `"
                  size="sm"
                  @input="dateSelection($event)"
                  hide-quick-select
                  v-bind="{ ...getDatetimeCommonProps() }"
                ></bib-datetime-picker>
              </div>
              <div v-if="view.value === 'week'" class="py-05">
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
            </div>
          </div>
        </div>
        <div>
          <template>
            <list-day
              :listToday="getDailyTimeEntries"
              v-if="todayListView"
              @new-entry="handleNewEntryEvent"
              @edit-entry="handleEditEntry"
              @delete-entry="handleDeleteEntry"
              :date="dayListDate"
              :todayDate="todayDate"
              :total="totalWork"
              :disabled="isTimeEntryLocked"
            ></list-day>
            <list-week
              :key="monthListForceRenderKey"
              v-else-if="weekListView && timesheetId"
              :activityReports="weekDataActivityReports"
              :totalWork="weekDataTotalWork"
              :status="weekDataStatus"
              :refusalReasonData="refusalReason"
              :id="timesheetId"
              :startOfWeek="weekDates.from"
              @timesheet-submitted="onTimesheetSubmitted"
              @day-view="enterDetail"
              @redirect-dayview="redirectToDayView"
            ></list-week>
            <month-list
              v-else-if="monthListView && showTable"
              :timesheetsList="timesheetsList"
              :is-full-year-list="isFullYearList"
              :loading="loading"
              @weeklytimesheet-submitted="onWeeklyTimesheetSubmitted"
              @week-view="redirectWeekView"
              class="pb-1"
            ></month-list>
            <no-record v-else-if="showNoData"></no-record>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import {
  getTimesheets,
  getWeekTimesheets,
} from "@/utils/functions/api_call/timeattendance/time";
import { debounceAction } from "@/utils/functions/debounce";
import {
  TIME_ATTENDANCE_TAB,
  ACTIVITY_TYPE,
  TIMESHEET_STATUSES,
  FILL_DAILY_ENTRY_EVENT,
  MONTH_SELECTOR_DEFAULT,
  FILL_WEEKLY_ENTRY_EVENT,
} from "@/utils/constant/Constant.js";
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData";
import { YEAR_LIST } from "@/utils/constant/Calander";

import { mapGetters } from "vuex";
import { getCurrentDateMonth } from "@/utils/functions/functions_lib.js";
import {
  getDateDiffInSeconds,
  getTimeFromDate,
  getWeekEnd,
  getWeekStart,
  isSameDate,
  weekToUTCWeek,
} from "@/utils/functions/dates";
import { formatTime } from "@/utils/functions/clock_functions";
import { getUserTimesheetWidget } from "@/utils/functions/api_call/timeattendance/time.js";
import {
  getDatetimeCommonProps,
  DATETIME_FORMAT,
} from "../../../utils/functions/datetime-input";

import { getUserLeavesDetailUser } from "../../../utils/functions/functions_lib_api";

import { Timesheet } from "@/components/common/models/timesheet";
import InfoCardLeaveVacation from "../../common/Cards/InfoCardLeaveVacation.vue";
import {TIMESHEET_LOCKED_MESSAGE} from "../../../utils/constant/Constant";

const VIEWS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];
// const FILL_DAILY_ENTRY_EVENT = "filldaily-entry";

export default {
  components: { InfoCardLeaveVacation },
  data() {
    return {
      VIEWS,
      view: VIEWS[0],
      activeUserData: "",
      activeUserName: "",
      ViewTitle: "Today",
      monthList: YEAR_LIST,
      show: false,
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      todayData: [],
      activeTab: "Attendance",
      loading: false,
      form: {},
      // Time & attandance
      timesheetWidgetData: {},
      clockModal: false,
      localData: [],
      getCurrentDate: "",
      date: null,
      format: DATETIME_FORMAT,
      todayDate: DateTime.now().toFormat(DATETIME_FORMAT),
      ACTIVITY_DICTIONARY,
      totalWorkInMS: 0,
      timesheetStatus: "",
      weekDates: {
        from: null,
        to: null,
      },
      weekDataActivityReports: [],
      weekDataTotalWork: "--:--",
      weekDataStatus: "",
      timesheetId: -1,
      timer: 1,
      maxDate: DateTime.now().toISO(),
      refusalReason: null,
      timesheet: null,
      timesheetsList: [],
      timesheetDates: {
        from: null,
        to: null,
      },
      dates: {
        from: null,
        to: null,
      },
      year: null,
      month: null,
      isFullYearList: false,
      allowanceLeavesDetailedData: {},
      isRequestWidgetLoaded: false,
      isTimesheetWidgetLoaded: false,
      previousDate: DateTime.now().toFormat(DATETIME_FORMAT),
      summaryDate: DateTime.now().toFormat(DATETIME_FORMAT),
      previousWeekData: null,
      previousMonthWeekData: null,
      monthListForceRenderKey: 0,
      notFound:true,
    };
  },
  computed: {
    showTable() {
      return !this.loading && this.timesheetsList?.length;
    },
    showNoData() {
      return (
        !this.loading && !this.notFound &&
        (!this.timesheetsList || !this.timesheetsList?.length)
      );
    },
    minDate() {
      return this.$minDate();
    },
    variant() {
      this.variantColor = this.isLightThemeCheck ? "light" : "dark";
    },
    isTimesheetLocked() {
      return JSON.stringify(this.getTimesheet) !== "{}" && this.getTimesheet?.isLocked();
    },
    isTodayTimesheetLocked() {
      return JSON.stringify(this.getTimesheetToday) !== "{}" && this?.getTimesheetToday?.isLocked();
    },
    dayListDate() {
      if (!this.summaryDate) return null;
      return DateTime.fromFormat(this.summaryDate, DATETIME_FORMAT).toJSDate();
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
            entry.start,
            entry.end
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
              entry.start,
              entry.end
            )
          );
        }, 0);

      const netTotalWorkInMS = totalWorkInMS - totalBreakInMS;

      return formatTime(netTotalWorkInMS, false);
    },

    ...mapGetters({
      getActiveUser: "employee/GET_ACTIVE_USER",
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
      getTodayDailyTimeEntries: "timeattendance/getdailyTimeEntriesToday",
      getTimesheet: "timeattendance/getTimesheet",
      getTimesheetToday: "timeattendance/getTimesheetToday",
    }),

    isTodayTimeEntryLocked() {
      return Boolean(this.getTodayDailyTimeEntries?.find((entry) => entry.activity === ACTIVITY_TYPE.IN && entry.status === TIMESHEET_STATUSES.APPROVED)) || this.isTodayTimesheetLocked;
    },
    isTimeEntryLocked() {
      return Boolean(this.getDailyTimeEntries?.find((entry) => entry.activity === ACTIVITY_TYPE.IN && entry.status === TIMESHEET_STATUSES.APPROVED)) || this.isTimesheetLocked;
    },

    hasInEntryToday() {
      const entries = this.$store.state.timeattendance.dailyTimeEntriesToday;
      if (!entries) return false;
      return entries.some((entry) => {
        return entry.activity === ACTIVITY_TYPE.IN && entry.active === false;
      });
    },
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
  async created() {
    // this.loading = true;
    let path = this.$route.fullPath;
    if (path === "/my-timesheet/") {
      this.$store.dispatch("timeattendance/setIsViewFromTimesheetCard", true);
      this.$router.push("?view=month");
    }
    this.isTimesheetWidgetLoaded = true;
    this.setView();
    await this.$store.dispatch("employee/setActiveUser");
    this.activeUserData = this.getActiveUser;
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();
    this.getTimesheetWidget();
    // this.loading = false;
  },
  async mounted() {

    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();

    this.registerRootListeners();
    this.getLeaveDetails();
  },
  methods: {
    weekToUTCWeek,
    getDatetimeCommonProps,
    debounceAction,
    getUserLeavesDetailUser,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    registerFillDailyEntryListener() {
      this.$root.$on(FILL_DAILY_ENTRY_EVENT, () => {
        this.fillDailyTimeEntries();
      });
    },
    closeChangeHandler() {
      if (
        this.previousWeekData === null ||
        this.previousWeekData?.from === this.weekDates.from
      ) {
        return;
      }
      this.setPreviousWeekData(this.weekDates);

      this.fillWeeklyTimeEntries();
    },
    unregisterFillDailyEntryListener() {
      this.$root.$off(FILL_DAILY_ENTRY_EVENT);
    },
    registerLoading() {
      this.$root.$on('loading', (payload = false) => {
        this.loading = payload;
      })
    },
    unregisterLoading() {
      this.$root.$off('loading');
    },
    registerMonthListForceRerenderHandle() {
      this.$root.$on('month-force-rerender', () => {
        this.monthListForceRenderKey += 1;
      })
    },
    unregisterMonthListForceRerenderHandle() {
      this.$root.$off('month-force-rerender');
    },
    registerFillWeeklyEntryListener() {
      this.$root.$on(FILL_WEEKLY_ENTRY_EVENT, () => {
        this.fillWeeklyTimeEntries();
      });
    },
    registerFetchedLeaveVacation() {
      this.$root.$on("fetched-leave-vacation", () => {
        this.getLeaveDetails();
      });
    },
    unregisterFetchedLeaveVacation() {
      this.$root.$off("fetched-leave-vacation");
    },
    unregisterFillWeeklyEntryListener() {
      this.$root.$off(FILL_WEEKLY_ENTRY_EVENT);
    },
    registerRootListeners() {
      this.registerMonthListForceRerenderHandle();
      this.registerFillWeeklyEntryListener();
      this.registerFillDailyEntryListener();
      this.registerFetchedLeaveVacation();
      this.registerLoading();
    },
    unregisterRootListeners() {
      this.unregisterMonthListForceRerenderHandle();
      this.unregisterFillWeeklyEntryListener();
      this.unregisterFillDailyEntryListener();
      this.unregisterFetchedLeaveVacation();
      this.unregisterLoading();
    },
    getLeaveDetails() {
      this.isRequestWidgetLoaded = true;
      this.getUserLeavesDetailUser().then((result) => {
        if (result) {
          this.allowanceLeavesDetailedData = result;
        } else {
          this.$openPopupNotification(this.$error.common_message);
        }
        this.isRequestWidgetLoaded = false;
      });
    },
    async handleTimerStop() {
      await this.$store.dispatch("timeattendance/setDailyTimeEntries");
      if (
        isSameDate(
          DateTime.fromFormat(this.todayDate, DATETIME_FORMAT).toJSDate(),
          new Date()
        )
      ) {
        this.fillDailyTimeEntries();
      }
    },
    setView() {
      const viewValue = this.$route.query.view ?? VIEWS[0].value;
      this.view = { ...this.VIEWS.find((v) => v.value === viewValue) };
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
    addLeaves($event) {
      this.$router.push("/leaves-and-vacations/dashboard/");
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },
    async handleNewEntryEvent() {
      await this.fillDailyTimeEntries();
    },
    async handleEditEntry() {
      await this.fillDailyTimeEntries();
      this.isTimesheetWidgetLoaded = true;
      await this.getTimesheetWidget();
    },
    async handleDeleteEntry(id) {
      this.fillDailyTimeEntries();
    },
    async getTimesheetWidget() {
      this.isTimesheetWidgetLoaded = true;
      const widget = await getUserTimesheetWidget();
      this.timesheetWidgetData = widget;
      this.isTimesheetWidgetLoaded = false;
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
    async onViewChange(e) {
      this.setDefaultOnViewChange(e.value);
      this.$router.push({ query: { view: e.value } });
    },
    onViewTimesheetsClick() {
      this.$store.dispatch("timeattendance/setIsViewFromTimesheetCard", true);
      this.$router.push({ path: "/my-timesheet/", query: { view: "month" } });
    },

    change(event, name) {
      this.updateForm[name] = event;
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
      if (!this.todayDate) return;
      await this.$store
        .dispatch(
          "timeattendance/setDailyTimeEntries",
          DateTime.fromFormat(this.todayDate, this.format).toFormat(
            "yyyy-MM-dd"
          )
        )
        .then((result) => {
          if (result?.timesheet?.status) {
            this.timesheet = new Timesheet(result.timesheet);
          }
        });

      this.parseTimeEntries();
    },

    parseTimeEntries() {
      this.todayData = [];
      this.totalWorkInMS = 0;
      this.timesheetStatus = this.getDailyTimeEntries?.[0]?.status || "";
      this.loading = false;
    },
    async fillWeeklyTimeEntries() {
      this.loading = true;
      const weekRange = {
        from: new Date(this.weekDates.from),
        to: new Date(this.weekDates.to),
      };
      const weekData = new TimesheetParser(
        await getWeekTimesheets(weekRange)
      ).parse("week");
      this.weekDataActivityReports = weekData.activityReports;
      this.weekDataTotalWork = formatTime(weekData.total, false);
      this.weekDataStatus = weekData.status;
      this.timesheetId = weekData.id;
      (this.refusalReason = weekData), (this.loading = false);
    },
    async fillTimesheetEntries(isWeekRange = false) {
      this.loading = true;
      const { from, to } = this.weekToUTCWeek({
        from: new Date(
          isWeekRange ? this.weekDates.from : this.timesheetDates.from
        ),
        to: new Date(isWeekRange ? this.weekDates.to : this.timesheetDates.to),
      });
      let timesheets = await getTimesheets({ from, to });
      timesheets = timesheets
        .map((employee) => {
          const parser = new TimesheetParser({ timesheets: employee });
          return parser.parse("weekDays");
        })
        .sort((a, b) => new Date(b.start) - new Date(a.start));
      this.timesheetsList = timesheets;
      this.timesheetsList.length ? this.notFound : this.notFound = false;
      this.loading = false;
    },
    setPreviousDate(date) {
      this.previousDate = date;
    },
    setSummaryDate(date) {
      this.summaryDate = date;
    },
    async dateSelection(value) {
      // this.loading = true;
      const dateValue =
        value === "" ? DateTime.now().toFormat(DATETIME_FORMAT) : value;
      this.todayDate = dateValue;
      if (dateValue === this.previousDate) {
        return;
      }

      this.setSummaryDate(dateValue);
      this.setPreviousDate(dateValue);

      await this.fillDailyTimeEntries();
    },
    async enterDetail(item) {
      const date = item.date;
      const itemDateTime = DateTime.fromISO(date);

      const currentDate = DateTime.now();

      if (itemDateTime > currentDate && this.weekDataStatus != "approved") {
        this.debounceAction(() => {
          this.$openPopupNotification({
            text: "Time entries cannot be added for a future date",
            variant: "danger",
          });
        });
        return true;
      }

      if (this.weekDataStatus == "approved") {
        this.debounceAction(() => {
          this.$openPopupNotification({
            text: TIMESHEET_LOCKED_MESSAGE,
            variant: "danger",
          });
        });
      }
    },
    async redirectToDayView(item) {
      const date = item.date;
      const itemDateTime = DateTime.fromISO(date);

      const currentDate = DateTime.now();

      if (itemDateTime > currentDate && this.weekDataStatus != "approved") {
        this.debounceAction(() => {
          this.openPopupNotification({
            text: "Time entries cannot be added for a future date",
            variant: "danger",
          });
        });
        return true;
      }

      this.todayDate = itemDateTime.toFormat(DATETIME_FORMAT);
      this.$router.push({ query: { view: "day" } });
      await this.fillDailyTimeEntries();
    },
    setPreviousWeekData(dates) {
      this.previousWeekData = dates;
    },
    async weekSelection() {
      this.setPreviousWeekData(this.weekDates);
      await this.fillWeeklyTimeEntries();
    },
    async onTimesheetSubmitted() {
      await this.fillWeeklyTimeEntries();
    },
    async redirectWeekView(item) {
      const { start, end } = item;
      this.$set(this.weekDates, "from", getWeekStart(start));
      this.$set(this.weekDates, "to", getWeekEnd(end));
      this.$router.push({ query: { view: "week" } });
      await this.fillWeeklyTimeEntries();
    },
    async onWeeklyTimesheetSubmitted() {
      await this.fillTimesheetEntries();
    },
    formatDates({ from, to }) {
      const fromFormat = DateTime.fromISO(from)
        .toLocal()
        .toFormat(DATETIME_FORMAT);
      const toFormat = DateTime.fromISO(to).toLocal().toFormat(DATETIME_FORMAT);
      return `${fromFormat} -> ${toFormat}`;
    },
    isMonthWeekMatchPrevious() {
      return (
        this.previousMonthWeekData === null ||
        (this.previousMonthWeekData?.from === this.weekDates.from &&
          this.previousMonthWeekData?.to === this.weekDates.to)
      );
    },
    async onCloseWeekRange() {
      if (
        this.previousMonthWeekData === null ||
        (this.previousMonthWeekData?.from === this.weekDates.from &&
          this.previousMonthWeekData?.to === this.weekDates.to)
      ) {
        return;
      }
      this.setPreviousMonthWeekData(this.weekDates);

      await this.fillTimesheetEntries();
    },
    setPreviousMonthWeekData(dates) {
      this.previousMonthWeekData = dates;
    },
    async weekSelectionInMonthView() {
      this.setPreviousMonthWeekData(this.weekDates);
      await this.fillTimesheetEntries(true);
    },
    setTimesheetDates(from, to) {
      this.timesheetDates = { from: from, to: to };
    },
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },
  watch: {
    "$route.query.view"(newVal) {
      this.view.value = newVal || "day";
      this.view.label = this.VIEWS.find(
        (v) => v.value === this.view.value
      ).label;
    },

    getDailyTimeEntries(val, old) {
      if (val && old) {
        this.parseTimeEntries();
      }
    },
    dates(newval, old) {
      if (newval.from && newval.to) {
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
      color: $black;
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
      color: $white;
      background-color: #31a22c;
      // border-color: @pagination-active-border;
      cursor: default;
    }
  }
}
</style>
