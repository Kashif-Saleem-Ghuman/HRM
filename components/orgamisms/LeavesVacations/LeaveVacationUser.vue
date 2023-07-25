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
        <info-card-leave-vacation
          title="Vacation"
          :item="allowanceVacationData"
          buttonLable="Request Vacation"
          icon="table"
          className="button-wrapper__bgsucess"
          variant="white"
          @on-click="addLeaves('vacation')"
        ></info-card-leave-vacation>
        <info-card-leave-vacation
          title="Medical/sick"
          :item="allowanceMedicalData"
          buttonLable="Request Medical Leave"
          icon="table"
          className="button-wrapper__bgalert"
          variant="white"
          @on-click="addLeaves('leave')"
        ></info-card-leave-vacation>
        <info-card-leave-vacation
          title="Request Personal leave"
          :item="allowanceLeaveData"
          buttonLable="Request Personal Leave"
          icon="table"
          className="button-wrapper__bgwarnning"
          variant="white"
          @on-click="addLeaves('leave')"
        ></info-card-leave-vacation>
      </div>
    </div>
    <div class="pl-1 py-1">
      <list-leave-attendance :leaveData="leaveData"></list-leave-attendance>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getAllowancVacationeDays,
  getAllowancMedicalDays,
  getAllowanceLeaveDays,
  getLeaveVacations,
} from "../../../utils/functions/functions_lib_api";
import {
  LEAVE_ATTENDANCE_DATA,
  INFO_CARD_LEAVE_VACATION_DATA,
} from "../../../utils/constant/Calander";
export default {
  data() {
    return {
      id: "",
      activeTab: "Dashborad",
      activeUserData: "",
      activeUserName: "",
      infoCardData: INFO_CARD_LEAVE_VACATION_DATA,
      leaveData: [],
      allowanceVacationData: [],
      allowanceMedicalData: [],
      allowanceLeaveData: [],
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
      getAccessToken: "token/getAccessToken",
    }),
  },
  async mounted() {
    this.getAllowancVacationeDays();
    this.getAllowancMedicalDays();
    this.getAllowanceLeaveDays();
    this.getLeaveVacations();
    console.log(this.allowanceVacationData, this.allowanceMedicalData, this.allowanceLeaveData, "allowanceVacationData")
  },
  methods: {
    getAllowancVacationeDays,
    getAllowancMedicalDays,
    getAllowanceLeaveDays,
    getLeaveVacations,
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar", $event);
      this.$nuxt.$emit("add-leave");
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
