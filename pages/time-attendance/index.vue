<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Time & Attendance"
        :avatar="userPhoto"
        headerRight="headerRight"
        :icon="items.icon"
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
                <date-picker></date-picker>
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
              <div class="d-grid d-flex gap-1 py-1 px-1"
              style="grid-template-columns: repeat(3, 1fr)">
                <info-card-time
                :item="infoCardData[0]"
                buttonLable="Clock in"
                icon="table"
                profilePic="profilePic"
                buttonVariant="light"
              ></info-card-time>
              <info-card-time
                :item="infoCardData[1]"
                buttonLable="Clock in"
                icon="table"
                profilePic="profilePic"
                buttonVariant="light"
              ></info-card-time>
              <info-card-help
                  custumBg="help-wrapper__bg-black"
                ></info-card-help>
              </div>
            <div class="scroll_wrapper">
              <div>
                <list-dashboard :userList="localData"></list-dashboard>
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
                <date-picker></date-picker>
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
              <div class="pb-3" v-if="listDayWise">
                <list-day-view
                  :dayWiseDataTimesheet="dayWiseDataTimesheet"
                ></list-day-view>
              </div>
              <div style="z-index: 1" v-if="listWeekWise">
                <list-timesheet :userList="timesheetData"></list-timesheet>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="setting-wrapper" class="custom-input">
        <div class="col-12 px-1">
          <div id="attendance-wrapper">
            <div v-if="activeTab == timeAttendanceTab[4].value">
              <!-- Benefits info Wrppaer Start Here  -->
              <div id="employeement-info-wrapper">
                <div class="row mx-0 py-cus">
                  <div class="col-6">
                    <tabs-title
                      title="Attandance"
                      variant="gray"
                      icon="info"
                      :updateButton="infoUpdateTimeAttendance"
                      @click="updateTimeAttendanceSettings"
                      :scale="0.9"
                    ></tabs-title>
                  </div>
                </div>
                <div class="" id="tab_info_wrapper">
                  <div v-if="activeTab == timeAttendanceTab[4].value">
                    <div class="scroll_wrapper">
                      <div class="col-6 row-custom">
                        <attendance
                          :orgSettings="time.useOrganizationSettings"
                          :trackAttendance="time.trackAttendance"
                          :trackTime="time.trackTime"
                          :switchLabelOrgSettings="switchLabelOrgSettings"
                          :switchLabelAttendance="switchLabelAttendance"
                          :switchLabelweekStarts="switchLabelweekStarts"
                          :weekOptions="weekOptions"
                          :weekStart="time.startWeekDay"
                          :weekCapacity="time.weekCapacity"
                          :deadlineDay="time.deadlineDay"
                          :timesheetOptions="weekOptions"
                          :note="time.note"
                          @change-it="change"
                          :inActiveOrganizationSettings="
                            inActiveOrganizationSettings
                          "
                          :inActive="inActiveTimeAttendance"
                          @input="handleInput"
                        ></attendance>
                        <div class="row mx-0 pt-1">
                          <div class="col-12">
                            <bib-button
                              label="Save"
                              size="lg"
                              variant="success"
                              @click="updateTimeAttandance"
                              v-if="timeAttendanceUpdateButton"
                            ></bib-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>
<script>
import dayjs from "dayjs";
import {
  TIME_ATTENDANCE_TAB,
  MORE_MENU,
  SORTING_MENU,
  WEEK_DAY,
} from "../../utils/constant/Constant.js";
import { INFO_CARD_DATA } from "../../utils/constant/DashboardData";
import {
  openPopupNotification,
  handleInput,
} from "../../utils/functions/functions_lib.js";
import { updateTimeAttendanceSettings } from "../../utils/functions/api_call/index";
import { TIMESHEET_DATA } from "../../utils/constant/TimesheetData.js";
import { mapGetters } from "vuex";

import {
  getTime,
  updateTimeAttandance,
  getTimeAttandance,
  getTimesheet,
} from "../../utils/functions/api_call/timeattandance/time";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      openSidebar: false,
      endDate: null,
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      dayWiseDataTimesheet: TIMESHEET_DATA,
      listWeekWise: true,
      listDayWise: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      currentPage: 1,
      timesheetData: TIMESHEET_DATA,
      activeTab: "Attendance",
      items: MORE_MENU,
      actionMenu: SORTING_MENU.actionMenuTimeAttandance,
      actionMenuTimesheet: SORTING_MENU.actionMenuTimesheet,
      orderBy: "asc",
      totalUser: "",
      userPhoto: localStorage.getItem("userPhoto"),
      updateForm: {},
      isFlag: false,
      time: {},
      // Time & attandance
      weekOptions: WEEK_DAY,
      timeAttendanceUpdateButton: false,
      inActiveTimeAttendance: "disabled",
      inActiveOrganizationSettings: "disabled",
      infoUpdateTimeAttendance: true,
      switchLabelOrgSettings: "",
      switchLabelAttendance: "",
      switchLabelweekStarts: "",
      infoCardData: INFO_CARD_DATA,
      localData: [],
      getCurrentDate:'',
      timesheetData:'',
    };
  },
  async created() {
    await this.currentDate();
    await this.getTimeAttandance();
    await this.getTimesheet();
console.log(this.getCurrentDate, "getCurrentDategetCurrentDate")

    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.id = users.id;
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
    }),
  },
  async mounted() {},
  methods: {
    getTime,
    updateTimeAttandance,
    getTimesheet,
    updateTimeAttendanceSettings,
    handleInput,
    getTimeAttandance,
    openPopupNotification,
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      var changeDate = dayjs(date).format('YYYY-MM-DD')
      this.getCurrentDate = changeDate
    },
    change(event, name) {
      this.updateForm[name] = event;
      console.log(this.updateForm, "switchLabelweekStarts");
    },
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
      if (tab.value == "Setting") {
        console.log(this.time, "this.time");
        this.getTime();
      }
    },
    userId(id) {
      this.$router.push("/myprofile/" + id);
    },
    onChange(value) {
      let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
      console.log("selected date:", date);
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
