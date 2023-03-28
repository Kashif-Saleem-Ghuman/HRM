<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Time & Attendance"
        moreIcon="more"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items.slice(-1)"
        :icon="items.icon"
        @vclick="clickAction"
      ></section-header-left>
      <div class="d-flex justify-between">
        <template v-for="user in userList.slice(0, 4)">
          <section-header-right
            @click="userId(user.id)"
            :avatar="
              user.photo == null
                ? 'http://localhost:3000/_nuxt/_/bib-shared/img/user-default.png'
                : user.photo
            "
          >
          </section-header-right>
        </template>
        <div
          style="z-index: 100"
          class="bg-gray3 shape-circle icon-size d-flex justify-center align-center border-0"
        >
          <span style="font-size: 14px; font-weight: 500">{{ totalUser }}</span>
        </div>
        <button-circle
          icon="user-add"
          :scale="1"
          @click="addUser()"
          variant="success"
          class="ml-05"
          icon_bg="light-green"
        ></button-circle>
      </div>
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
              class="d-flex justify-between align-center py-05 px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <date-picker></date-picker>
              </div>
              <div class="d-flex">
                <button-gray
                  @on-click="$emit('employee')"
                  icon="eye-open"
                  variant="gray1"
                  :scale="0.8"
                  title="Not submitted"
                  titleClass="button-title"
                ></button-gray>
                <button-gray
                  @on-click="$emit('employee')"
                  icon="eye-open"
                  variant="gray1"
                  :scale="0.8"
                  title="Pending approval"
                  titleClass="button-title"
                ></button-gray>
                <action-right
                  @vclick="clickAction"
                  :items="actionMenu"
                ></action-right>
              </div>
            </div>
            <div class="scroll_wrapper">
              <div>
                <list-time-attendance></list-time-attendance>
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
              class="d-flex justify-between align-center py-05 px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <date-picker></date-picker>
              </div>
              <div class="d-flex">
                <button-gray
                  @on-click="$emit('employee')"
                  icon="eye-open"
                  variant="gray1"
                  :scale="0.8"
                  title="Not submitted"
                  titleClass="button-title"
                ></button-gray>
                <button-gray
                  @on-click="$emit('employee')"
                  icon="eye-open"
                  variant="gray1"
                  :scale="0.8"
                  title="Pending approval"
                  titleClass="button-title"
                ></button-gray>
                <action-right
                  @vclick="clickAction"
                  :items="actionMenu"
                ></action-right>
              </div>
            </div>
            <div class="scroll_wrapper">
              <div>
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
                      @click="checkTimeAttandance"
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
                    :inActiveOrganizationSettings="inActiveOrganizationSettings"
                    :inActive="inActiveTimeAttendance"
                    @input="handleInput"
                  ></attendance>
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
    <!-- <action-sidebar v-show="openSidebar"></action-sidebar> -->
  </div>
 
</template>
<script>
import {
  TIME_ATTENDANCE_TAB,
  MORE_MENU,
  SORTING_MENU,
} from "../../utils/constant/Constant.js";
import {
  TIMESHEET_DATA,
} from "../../utils/constant/TimesheetData.js";
import { mapGetters } from "vuex";
import {
  getTime,
  updateTimeAttandance,
} from "../../utils/functions/api_call/timeattandance/time";
export default {
  data() {
    return {
      id:'',
      openSidebar: false,
      endDate: null,
      starDate: new Date("2022-09-17"),
      minDate: new Date("2022-10-11"),
      maxDate: new Date("2022-10-21"),
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      currentPage: 1,
      timesheetData: TIMESHEET_DATA,
      activeTab: "Attendance",
      items: MORE_MENU,
      actionMenu: SORTING_MENU.actionMenuTimeAttandance,
      orderBy: "asc",
      totalUser: "",
      userPhoto: localStorage.getItem("userPhoto"),
      time: {},
    };
  },
  async created() {
    await this.$store.dispatch("setActiveUserRole", {userRole: this.activeUserRole});
    await this.$store.dispatch("employee/setUserList");
    this.localData = this.userList;
    await this.$store.dispatch("employee/setActiveUser");
      var users = this.getUser;
      this.id = users.id;
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
      activeUserRole : "token/getUserRole",
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",

    }),
  },
  async mounted() {
    this.totalUser = this.userList.length;
    console.log(this.userList.length, "uasdasdasdasdasasdasdserList");
  },
  methods: {
    getTime,
    updateTimeAttandance,
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
    clickAction(event) {
      if (event.key == "name") {
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
