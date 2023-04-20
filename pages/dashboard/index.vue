<template>
  <div id="dashborad-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Dashboard"
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
    <div
      class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <button-green
          icon="add"
          variant="success"
          :scale="1"
          title="Schedule event"
          @on-click="actionBY('schedule-event')"
        ></button-green>
        <button-green
          icon="add"
          :scale="1"
          variant="success"
          title="Schedule leave"
          @on-click="actionBY('schedule-leave')"
        ></button-green>
        <button-green
          icon="add"
          :scale="1"
          variant="success"
          title="Add employee"
        ></button-green>
      </div>
      <action-right @vclick="clickAction" :items="actionMenu"></action-right>
    </div>
    <div class="tab-wrapper">
      <div id="dashboard-inner-wrapper">
        <div class="" id="tab_info_wrapper">
          <div
            class="d-flex justify-between align-center py-05 px-075 bottom_border_wrapper"
          >
            <div class="d-flex align-center">
              <date-picker></date-picker>
            </div>
          </div>
          <div class="scroll_wrapper">
            <div style="z-index: 1">
              <list-dashboard :userList="timesheetData"></list-dashboard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <template>
      <action-sidebar
        @close-sidebar="closeSidebar"
        @close="closeSidebar"
        :className="slideClass"
        heading="Section Title"
        id="scedule-event"
        v-show="sceduleEvent"
      >
        <template v-slot:sidebar-body>
          <p><personal-information></personal-information></p>
        </template>
        <template v-slot:sidebar-footer>
          <div class="d-flex justify-between align-center">
            <div class="d-flex align-center">
              <bib-icon
                icon="attachment"
                :scale="0.8"
                variant="success"
                style="margin-right: 5px"
              ></bib-icon>
              <span style="color: #2ba026; font-size: 14px">Copy Link</span>
            </div>
            <div>
              <bib-button label="Cancle" variant="gray" size="lg"></bib-button>
              <bib-button label="Save" variant="success" size="lg"></bib-button>
            </div>
          </div>
        </template>
      </action-sidebar>
    </template>
    <template>
      <action-sidebar
        @close-sidebar="closeSidebar"
        @close="closeSidebar"
        :className="slideClass"
        heading="Section Title"
        id="scedule-leave"
        v-show="sceduleLeave"
      >
        <template v-slot:sidebar-body>
          <p>Content Goes Here</p>
        </template>
        <template v-slot:sidebar-footer>
          <bib-button label="New Plus" variant="primary" size="lg"></bib-button>
          <bib-button label="Free" variant="success" size="lg"></bib-button>
        </template>
      </action-sidebar>
    </template>
  </div>
</template>
<script>
import {
  TIME_ATTENDANCE_TAB,
  MORE_MENU,
  SORTING_MENU,
} from "../../utils/constant/Constant.js";
import {
  openPopupNotification,
  handleInput,
} from "../../utils/functions/functions_lib.js";
import { updateTimeAttendanceSettings } from "../../utils/functions/api_call/index";
import { DASHBOARD_DATA } from "../../utils/constant/DashboardData";
import { mapGetters } from "vuex";
import {
  getTime,
  updateTimeAttandance,
} from "../../utils/functions/api_call/timeattandance/time";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      timesheetData: DASHBOARD_DATA,
      items: MORE_MENU,
      actionMenu: SORTING_MENU.actionMenuTimeAttandance,
      actionMenuTimesheet: SORTING_MENU.actionMenuTimesheet,
      totalUser: "",
      userPhoto: localStorage.getItem("userPhoto"),
      openSidebar: false,
      slideClass: "slide-in",
      sceduleLeave: false,
      sceduleEvent: false,
    };
  },
  async created() {
    await this.$store.dispatch("setActiveUserRole", {
      userRole: this.activeUserRole,
    });
    await this.$store.dispatch("employee/setUserList");
    this.localData = this.userList;
    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.id = users.id;
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
      activeUserRole: "token/getUserRole",
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
    updateTimeAttendanceSettings,
    handleInput,
    openPopupNotification,
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
    actionBY(event) {
      console.log(event, "event");
      if (event === "schedule-event") {
        this.sceduleEvent = true;
        this.sceduleLeave = false;
      }
      if (event === "schedule-leave") {
        this.sceduleEvent = false;
        this.sceduleLeave = true;
      }
      this.slideClass = "slide-in";
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.sceduleEvent = false;
        this.sceduleLeave = false;
      }, 700);
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
<style lang="scss"></style>
