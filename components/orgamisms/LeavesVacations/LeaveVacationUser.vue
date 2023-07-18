<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        :title="activeUserName"
        :avatar="activeUserData.photo"
        headerRight="headerRight"
      ></section-header-left>
    </div>
    <div class="pl-1 py-1">
      <div
        class="d-grid d-flex gap-1"
        style="grid-template-columns: repeat(3, 1fr)"
      >
        <info-card-one
          :item="infoCardData[0]"
          buttonLable="Clock in"
          icon="table"
          profilePic="profilePic"
          buttonVariant="light"
        ></info-card-one>
        <info-card-one
          :item="infoCardData[1]"
          buttonLable="View Timesheet"
          icon="table"
          buttonVariant="light"
          profilePic="profilePic"
        ></info-card-one>
        <info-card-help custumBg="help-wrapper__bg-black"></info-card-help>
      </div>
    </div>
    <div class="pl-1 py-1">
      <list-day
        :dayWiseDataTimesheet="timesheetData"
      ></list-day>
    </div>
  </div>
</template>
<script>
import { INFO_CARD_DATA } from "../../../utils/constant/DashboardData";
import { mapGetters } from "vuex";
import { TIMESHEET_DATA, MY_TIMESHEET_DATA } from "../../../utils/constant/TimesheetData.js";
export default {
  data() {
    return {
      id: "",
      activeTab: "Dashborad",
      activeUserData: "",
      activeUserName: "",
      infoCardData: INFO_CARD_DATA,
      timesheetData: TIMESHEET_DATA,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.activeUserData = this.getActiveUser;
    this.activeUserName =
      this.activeUserData.firstName +
      " " +
      this.activeUserData.lastName +
      " / " +
      "Time & Attendance";
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
      getActiveUser: "employee/GET_USER",
    }),
  },
  async mounted() {},
  methods: {},
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
