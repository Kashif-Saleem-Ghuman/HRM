<template>
  <div id="dashborad-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        :title="`Welcome to your HR dashboard ` + activeUserName"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items.slice(-1)"
        :icon="items.icon"
        @vclick="clickAction"
      ></section-header-left>
    </div>
    <div class="tab-wrapper">
      <div id="dashboard-inner-wrapper">
        <div class="" id="tab_info_wrapper">
          <div
            class="d-flex justify-between align-center px-075 bottom_border_wrapper"
          >
            <div class="d-flex align-center">
              <date-picker></date-picker>
            </div>
            <!-- <action-right @vclick="clickAction" :items="actionMenu"></action-right> -->
            <div class="d-flex align-center">
              <div class="d-flex align-center mr-05">
                <span class="mr-05">Search:</span>
                <bib-input
                  size="sm"
                  type="text"
                  test_id="srchInput01"
                >
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
          <div class="pl-1 py-1">
            <info-card-leave-vacation
              :items="infoCardData"
              profilePic="profilePic"
            ></info-card-leave-vacation>
          </div>
          <div class="scroll_wrapper">
            <div style="z-index: 1">
              <list-dashboard :userList="localData"></list-dashboard>
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
import {
  DASHBOARD_DATA,
  INFO_CARD_DATA,
} from "../../utils/constant/DashboardData";
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
      activeUserName: "",
      timeAttendanceTab: TIME_ATTENDANCE_TAB,
      infoCardData: INFO_CARD_DATA,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      dashboardData: DASHBOARD_DATA,
      localData:[],
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
    await this.$store.dispatch("employee/setUserList");
    this.localData = this.userList;
    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.id = users.id;
    this.activeUserName = users.firstName + users.lastName;
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
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
