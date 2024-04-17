<template>
  <div id="time-attendance-wrapper">
    <loader :loading="loading"></loader>
    <div class="scroll_wrapper">
      <div class="d-flex justify-between align-center bottom_border_wrapper">
        <section-header-left title="Time & Attendance"></section-header-left>
      </div>
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
              icon="time-alarm"
            ></info-card-timer>

            <info-card-one
              :item="timesheetWidgetData"
              title="Timesheets"
              buttonLable="View timesheets"
              icon="table"
              profilePic="profilePic"
              @on-click="onViewTimesheetsClick"
            ></info-card-one>
            <!-- <info-card-help custumBg="help-wrapper__bg-black"></info-card-help> -->
          </div>
        </div>
        <div class="d-flex align-center px-1">
          <label class="pr-05">View:</label>
          <dropdown-menu-chip
            :items="VIEWS"
            :button-config="changeViewButtonConfig"
            @on-click="onViewChange"
            class="pr-05"
          ></dropdown-menu-chip>
          <div class="d-flex justify-between align-center">
            <div class="d-flex align-center">
              <div class="custom_date_picker">
                <!-- <div class="mr-05">Date:</div> -->
                <bib-datetime-picker
                  v-if="view.value === 'day'"
                  v-model="todayDate"
                  :maxDate="maxDate"
                  class="custom_date_picker"
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
              :total="totalWork"
              :disabled="isTimesheetLocked"
            ></list-day>
            <list-week
              v-else-if="weekListView && timesheetId"
              :activityReports="weekDataActivityReports"
              :totalWork="weekDataTotalWork"
              :status="weekDataStatus"
              :refusalReasonData="refusalReason"
              :id="timesheetId"
              :startOfWeek="weekDates.from"
              @timesheet-submitted="onTimesheetSubmitted"
              @day-view="enterDetail"
            ></list-week>
            <no-record v-else />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { getWeekTimesheets } from "@/utils/functions/api_call/timeattendance/time";
import { debounceAction } from "@/utils/functions/debounce"
import {
  TIME_ATTENDANCE_TAB,
  ACTIVITY_TYPE,
  TIMESHEET_STATUSES,
  FILL_DAILY_ENTRY_EVENT,
} from "@/utils/constant/Constant.js";
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData";
import { YEAR_LIST } from "@/utils/constant/Calander";

import { mapGetters } from "vuex";
import { getCurrentDateMonth } from "@/utils/functions/functions_lib.js";
import {
  getTimeFromDate,
  isSameDate,
  weekToUTCWeek,
} from "@/utils/functions/dates";
import { formatTime } from "@/utils/functions/clock_functions";
import { getUserTimesheetWidget } from "@/utils/functions/api_call/timeattendance/time.js";
import {
  getDatetimeCommonProps,
  DATETIME_FORMAT,
} from "../../../utils/functions/datetime-input";

import { Timesheet } from "@/components/common/models/timesheet";

const VIEWS = [
  { label: "Day", value: "day", variant: "light" },
  { label: "Week", value: "week", variant: "light" },
];
// const FILL_DAILY_ENTRY_EVENT = "filldaily-entry";

export default {
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
        from: DateTime.now().startOf("week").toISO(),
        to: DateTime.now().endOf("week").toISO(),
      },
      weekDataActivityReports: [],
      weekDataTotalWork: "--:--",
      weekDataStatus: "",
      timesheetId: -1,
      timer: 1,
      maxDate: DateTime.now().toISO(),
      refusalReason: null,
      timesheet: null
    };
  },
  computed: {
    isTimesheetLocked() {
      return this.timesheet?.isLocked()
    },
    dayListDate() {
      if (!this.todayDate) return null;
      return DateTime.fromFormat(this.todayDate, DATETIME_FORMAT).toJSDate();
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
      getActiveUser: "employee/GET_ACTIVE_USER",
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
    }),
    hasInEntryToday() {
      const entries = this.$store.state.timeattendance.dailyTimeEntriesToday;
      if (!entries) return false;
      return entries.some((entry) => {
        return entry.activity === ACTIVITY_TYPE.IN;
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
        varint: "light",
      };
    },
  },
  async created() {
    // this.loading = true;
    this.setView();
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.activeUserData = this.getActiveUser;
    if (this.todayListView) await this.fillDailyTimeEntries();
    else if (this.weekListView) await this.fillWeeklyTimeEntries();
    this.getTimesheetWidget();
    // this.loading = false;
  },
  mounted() {
    this.registerRootListeners();
  },
  methods: {
    weekToUTCWeek,
    getDatetimeCommonProps,
    debounceAction,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    registerFillDailyEntryListener() {
      this.$root.$on(FILL_DAILY_ENTRY_EVENT, () => {
        this.fillDailyTimeEntries();
      });
    },
    unregisterFillDailyEntryListener() {
      this.$root.$off(FILL_DAILY_ENTRY_EVENT);
    },
    registerRootListeners() {
      this.registerFillDailyEntryListener();
    },
    unregisterRootListeners() {
      this.unregisterFillDailyEntryListener();
    },

    async handleTimerStop() {
      await this.$store.dispatch("timeattendance/setDailyTimeEntriesToday");
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
    handleNewEntryEvent() {
      this.fillDailyTimeEntries();
    },
    async handleEditEntry() {
      await this.fillDailyTimeEntries();
      await this.getTimesheetWidget();
    },
    async handleDeleteEntry(id) {
      this.fillDailyTimeEntries();
    },
    async getTimesheetWidget() {
      const widget = await getUserTimesheetWidget();
      this.timesheetWidgetData = widget;
    },
    clickOutside() {
      this.show = false;
    },
    async onViewChange(e) {
      this.$router.push({ query: { view: e.value } });
    },
    onViewTimesheetsClick() {
      this.$router.push({ query: { view: "week" } });
    },
    getCurrentDateMonth,

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
      await this.$store.dispatch(
        "timeattendance/setDailyTimeEntries",
        DateTime.fromFormat(this.todayDate, this.format).toUTC().toISO()
      ).then((result)=>{
        if (result?.timesheet?.status) {
         this.timesheet = new Timesheet(result.timesheet)
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
      // this.loading = true;
      const weekRange = this.weekToUTCWeek({
        from: new Date(this.weekDates.from),
        to: new Date(this.weekDates.to),
      });
      const weekData = new TimesheetParser(
        await getWeekTimesheets(weekRange)
      ).parse("week");
      this.weekDataActivityReports = weekData.activityReports;
      this.weekDataTotalWork = formatTime(weekData.total * 60 * 60, false);
      this.weekDataStatus = weekData.status;
      this.timesheetId = weekData.id;
      (this.refusalReason = weekData), (this.loading = false);
    },
    async dateSelection(event) {
      // this.loading = true;
      if (!event) return;
      await this.fillDailyTimeEntries();
      // this.$nuxt.$emit("chronometer");
      // this.loading = false;
    },
    async enterDetail(item) {
      const date = item.date;
      const itemDateTime = DateTime.fromISO(date);

      const currentDate = DateTime.now();

      if (itemDateTime > currentDate) {
        this.debounceAction(() => {
          this.openPopupNotification({
            text: "Cannot proceed with future date.",
            variant: "danger",
          });
        });
        return true;
      }
      if (this.weekDataStatus != "approved") {
        this.todayDate = itemDateTime.toFormat(DATETIME_FORMAT);
        this.$router.push({ query: { view: "day" } });
        await this.fillDailyTimeEntries();
      } else {
        this.debounceAction(() => {
          this.openPopupNotification({
            text: "Your timesheet has been locked.",
            variant: "danger",
          });
        });
      }
    },
    async weekSelection() {
      await this.fillWeeklyTimeEntries();
    },
    async onTimesheetSubmitted() {
      await this.fillWeeklyTimeEntries();
    },
    formatDates({ from, to }) {
      const fromFormat = DateTime.fromISO(from)
        .toLocal()
        .toFormat(DATETIME_FORMAT);
      const toFormat = DateTime.fromISO(to).toLocal().toFormat(DATETIME_FORMAT);
      return `${fromFormat} -> ${toFormat}`;
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
