<template>
   <div id="time-attandance-wrapper">
              <div class="scroll_wrapper">
                <div class="time-attandance-wrapper">
                  <div
                    class="d-flex align-center bottom_border_wrapper px-1 py-05"
                  >
                    <label class="pr-05">View:</label>
                    <div style="position: relative">
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
                    </div>
                    
                    <div
                class="d-flex justify-between align-center px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <div class="custom_date_picker">
                    <!-- <div class="mr-05">Date:</div> -->
                    <bib-datetime-picker
                      v-model="date2"
                      :format="format"
                      :parseDate="parseDate"
                      :formatDate="formatDate"
                      @input="onChange"
                      class="custom_date_picker"
                    ></bib-datetime-picker>
                  </div>
                </div>
  </div>


                  </div>
                  <div class="px-1 py-05">
                    <div
                      class="d-grid d-flex gap-1 py-05"
                      style="grid-template-columns: repeat(3, 1fr)"
                    >
                      <info-card-timer
                        buttonLable="Online"
                        icon="table"
                        className="button-wrapper__bgsucess"
                      ></info-card-timer>
                      <info-card-one
                        :item="infoCardData[1]"
                        title="View Timesheet"
                        buttonLable="View timesheet past due"
                        icon="table"
                        profilePic="profilePic"
                        buttonVariant="light"
                        className="button-wrapper__bgwarnning"
                      ></info-card-one>

                      <info-card-help
                        custumBg="help-wrapper__bg-black"
                      ></info-card-help>
                    </div>
                  </div>
                  <div>
                    <list-day-admin
                      :listToday="todayData"
                      v-show="todayListView"
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
          </div>
</template>
<script>
import dayjs from "dayjs";
import {
  TIME_ATTENDANCE_TAB,
} from "../../../utils/constant/Constant.js";
import { INFO_CARD_DATA } from "../../../utils/constant/DashboardData";
import {
  TIMESHEET_DATA,
  DAY_VIEW_DATA,
  WEEK_VIEW_DATA,
} from "../../../utils/constant/TimesheetData.js";
import { MONTH_LIST, YEAR_LIST } from "../../../utils/constant/Calander";

import { mapGetters } from "vuex";

import fecha, { format } from "fecha";
import getJson from "../../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      endDate: null,
      ViewTitle: "Today",
      monthList: YEAR_LIST,
      show: false,
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      dayWiseDataTimesheet: TIMESHEET_DATA,
      todayData: DAY_VIEW_DATA,
      MonthViewData: TIMESHEET_DATA,
      weekDataView: WEEK_VIEW_DATA,
      todayListView: true,
      weekListView: true,
      monthListView: true,
      activeTab: "Attendance",
      updateForm: {},
      isFlag: false,
      time: {},
      loading:false,
      // Time & attandance
      infoCardData: INFO_CARD_DATA,
      localData: [],
      getCurrentDate: "",
      date: null,
      format: "MMM D, YYYY",
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
    };
  },
  async created() {
    this.getCurrentDate = this.date2;
    // await this.getTimeAttandance();
    console.log(this.getCurrentDate, "getCurrentDategetCurrentDate");

    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.id = users.id;
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      activeDate: "date/getActiveDate",
    }),
  },
  async mounted() {},
  methods: {
    clickOutside() {
      this.show = false;
    },
    viewChange(e) {
      if (e == "Today") {
        this.todayListView = true;
        this.weekListView = false;
        this.monthListView = false;
        this.ViewTitle = "Today";
      }
      if (e == "Week") {
        this.todayListView = false;
        this.weekListView = true;
        this.monthListView = false;
        this.ViewTitle = "Week";
      }
      if (e == "Month") {
        this.todayListView = false;
        this.monthListView = true;
        this.weekListView = false;
        this.ViewTitle = "Month";
      }
      if (e == "Year") {
        alert("No list Found");
      }
    },
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
    onChange(value) {
      let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
      this.$store.dispatch("date/setActiveDate", date);
      this.getCurrentDate = date;
      this.getTimeAttandance();
    },
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
      if (tab.value == "Setting") {
        console.log(this.time, "this.time");
        this.getTime();
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
