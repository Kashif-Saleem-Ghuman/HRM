<template>
    <div id="people-action-wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
      >
        <section-header-left
          title="Time & Attendance"
          :avatar="getUser.photo"
          headerRight="headerRight"
        ></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              :tabs="timeAttendanceTab"
              :value="activeTab"
              @change="handleChange_Tabs"
            ></bib-tabs>
          </div>
        </div>
  
        <div class="section-wrapper custom-input" id="attendance-wrapper">
          <div class="" id="tab_info_wrapper">
            <div v-if="activeTab == timeAttendanceTab[0].value">
              <div
                class="d-flex justify-between align-center px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <div class="custom_date_picker">
                    <div class="mr-05">Date:</div>
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
  
                <div class="d-flex">
                  <!-- <div class="d-flex align-center mr-05">
                    <span class="mr-05">Search:</span>
                    <bib-input size="sm" type="text" test_id="srchInput01">
                    </bib-input>
                  </div> -->
                  <div class="d-flex align-center">
                    <div style="font-size: 14px" class="mr-05">Show:</div>
                    <button
                      type="button"
                      @click="$emit('on-click')"
                      class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="d-grid d-flex gap-1 py-1 px-1"
                style="grid-template-columns: repeat(3, 1fr)"
              >
              <absent-present-card
                  :item="absentPresentCardData[0]"
                  title="Attandance"
                ></absent-present-card>
                <absent-present-card
                  :item="absentPresentCardData[1]"
                  title="Absnece"
                ></absent-present-card>
                <info-card-help
                  custumBg="help-wrapper__bg-black"
                ></info-card-help>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <list-dashboard :userList="localData"></list-dashboard>
                  <loader v-bind:showloader="loading"></loader>
                  <!-- <list-timesheet :userList="users"></list-timesheet> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="timesheet-wrapper">
          <div class="" id="tab_info_wrapper">
            <div v-if="activeTab == timeAttendanceTab[1].value">
              <div
                class="d-flex justify-between align-center px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <div class="custom_date_picker">
                    <div class="mr-05">Date:</div>
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
  
                <div class="d-flex align-center">
                  <div class="d-flex align-center mr-05">
                    <span class="mr-05">Search:</span>
                    <bib-input size="sm" type="text" test_id="srchInput01">
                    </bib-input>
                  </div>
                  <div class="d-flex align-center">
                    <div style="font-size: 14px" class="mr-05">Show:</div>
                    <button
                      type="button"
                      @click="$emit('on-click')"
                      class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="d-grid d-flex gap-1 py-1 px-1"
                style="grid-template-columns: repeat(3, 1fr)"
              >
              <absent-present-card
                  :item="absentPresentCardData[0]"
                  title="Timesheet past due"
                ></absent-present-card>
                <absent-present-card
                  :item="absentPresentCardData[1]"
                  title="Timesheets pending"
                ></absent-present-card>
                <info-card-help
                  custumBg="help-wrapper__bg-black"
                ></info-card-help>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <list-timesheet :timesheetsList="timesheetsList"></list-timesheet>
                  <loader v-bind:showloader="loading"></loader>
                  <!-- <list-timesheet :userList="users"></list-timesheet> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="pending-wrapper">
          <div class="" id="tab_info_wrapper">
            <div v-if="activeTab == timeAttendanceTab[2].value">
              <div
                class="d-flex justify-between align-center px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <div class="custom_date_picker">
                    <div class="mr-05">Date:</div>
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
  
                <div class="d-flex align-center">
                  <div class="d-flex align-center mr-05">
                    <span class="mr-05">Search:</span>
                    <bib-input size="sm" type="text" test_id="srchInput01">
                    </bib-input>
                  </div>
                  <div class="d-flex align-center">
                    <div style="font-size: 14px" class="mr-05">Show:</div>
                    <button
                      type="button"
                      @click="$emit('on-click')"
                      class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <list-pending-time
                    :dayWiseDataTimesheet="dayWiseDataTimesheet.slice(0,3)"
                  ></list-pending-time>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="past-due-wrapper">
          <div class="" id="tab_info_wrapper">
            <div v-if="activeTab == timeAttendanceTab[3].value">
              <div
                class="d-flex justify-between align-center px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <div class="custom_date_picker d-flex">
                    <div class="mr-05">Date:</div>
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
  
                <div class="d-flex align-center">
                  <div class="d-flex align-center mr-05">
                    <span class="mr-05">Search:</span>
                    <bib-input size="sm" type="text" test_id="srchInput01">
                    </bib-input>
                  </div>
                  <div class="d-flex align-center">
                    <div style="font-size: 14px" class="mr-05">Show:</div>
                    <button
                      type="button"
                      @click="$emit('on-click')"
                      class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
                    >
                      All
                    </button>
                  </div>
                </div>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <list-pending-time
                    :dayWiseDataTimesheet="dayWiseDataTimesheet.slice(0, 2)"
                  ></list-pending-time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { DateTime } from "luxon";
  import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
  import {
    TIME_ATTENDANCE_TAB,
  } from "../../../utils/constant/Constant.js";
  import { INFO_CARD_DATA, ABSENT_INFO_CARD_DATA } from "../../../utils/constant/DashboardData";
  
  import { TIMESHEET_DATA } from "../../../utils/constant/TimesheetData.js";
  import { mapGetters } from "vuex";
  
  import { getTimeAttendance, getTimeAttendanceCustomRange } from "../../../utils/functions/api_call/timeattendance/time";
  import fecha, { format } from "fecha";
  import getJson from "../../../utils/dataJson/app_wrap_data";
  const appWrapItems = getJson();
  export default {
    data() {
      return {
        endDate: null,
        timeAttendanceTab: TIME_ATTENDANCE_TAB,
        dayWiseDataTimesheet: TIMESHEET_DATA,
        timesheetsList: [],
        activeTab: "Attendance",
        updateForm: {},
        isFlag: false,
        time: {},
        loading:false,
        // Time & attendance
        infoCardData: INFO_CARD_DATA,
        absentPresentCardData: ABSENT_INFO_CARD_DATA,
        localData: [],
        getCurrentDate: "",
        date: null,
        format: "MMM D, YYYY",
        date2: format(new Date(), "YYYY-MM-DD"),
      };
    },
    async created() {
      this.getCurrentDate = this.date2;
      this.generateOrganizationEntries();
      await this.$store.dispatch("employee/setActiveUser");
      this.id = this.getUser.id;
    },
    computed: {
      ...mapGetters({
        getUser: "employee/GET_USER",
        getAccessToken: "token/getAccessToken",
        activeDate: "date/getActiveDate",
      }),
    },
    methods: {
      async generateOrganizationEntries() {
        this.loading = true;
        const date = this.getCurrentDate;
        const { employees } = await this.getTimeAttendance({ date });
        employees.forEach(employee => {
          const parser = new TimesheetParser(employee);
          return parser.parse('day');
        });
        
        this.localData = employees;
        this.loading = false;
      },
      async generateWeekDaysEntries() {
        this.loading = true;
        const date = new Date(this.getCurrentDate);
        const from = DateTime.fromJSDate(date).startOf('week').toISO();
        const to = DateTime.fromJSDate(date).endOf('week').toISO();
        let timesheets = await this.getTimeAttendanceCustomRange({ from, to });
        timesheets = timesheets.map((employee) => {
          const parser = new TimesheetParser(employee);
          return parser.parse('weekDays');
        });
        this.timesheetsList = timesheets;
        this.loading = false;
      },
      getTimeAttendance,
      getTimeAttendanceCustomRange,
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
        this.generateOrganizationEntries()
        if (this.activeTab == this.timeAttendanceTab[1].value) {
          this.generateWeekDaysEntries();
        }
      },
      async handleChange_Tabs(tab) {
        this.activeTab = tab.value;
        if (tab.value == this.timeAttendanceTab[1].value) {
          this.generateWeekDaysEntries();
        }
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
  