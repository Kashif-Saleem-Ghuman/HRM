<template>
  <div>
    <loader :loading="loading"></loader>
    <div id="people-action-wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper bottom_border_wrapper"
      >
        <section-header-left
          title="Leaves and Vacations"
          headerRight="headerRight"
        ></section-header-left>
      </div>
      <div class="pl-1 py-1">
        <div class="pb-05 d-flex justify-start">
          <dropdown-menu-calendar
            :items="dropMenuYear"
            :label="selectedYear"
            icon="arrowhead-down"
            @on-click="changeYearView($event)"
            class="mr-05"
            className="button-wrapper__bgblack"
          ></dropdown-menu-calendar>
        </div>
        <div
          class="d-grid d-flex gap-1"
          style="grid-template-columns: repeat(3, 1fr)"
          v-if="is_data_fetched"
        >
          <info-card-leave-vacation
            title="Vacation"
            :daysUsed="allowanceLeavesDetailedData.vacationDaysUsed"
            :totalAllowance="allowanceLeavesDetailedData.vacationDaysAllowed"
            :scheduledDays="allowanceLeavesDetailedData.vacationDaysScheduled"
            buttonLable="Request Vacation"
            icon="airplane-solid"
            className="button-wrapper__bgsucess"
            :variant="$button.approved.variant"
            @on-click="addLeaves('vacation')"
          ></info-card-leave-vacation>
          <info-card-leave-vacation
            title="Medical/sick"
            :daysUsed="allowanceLeavesDetailedData.medicalDaysUsed"
            :totalAllowance="allowanceLeavesDetailedData.medicalDaysAllowed"
            :scheduledDays="allowanceLeavesDetailedData.medicalDaysScheduled"
            buttonLable="Request Medical Leave"
            icon="medical-clinic-solid"
            className="button-wrapper__bgalert"
            :variant="$button.rejected.variant"
            @on-click="addLeaves('medical')"
          ></info-card-leave-vacation>
          <info-card-leave-vacation
            title="Request Personal leave"
            :daysUsed="allowanceLeavesDetailedData.leaveDaysUsed"
            :scheduledDays="allowanceLeavesDetailedData.leaveDaysScheduled"
            :totalAllowance="allowanceLeavesDetailedData.leaveDaysAllowed"
            buttonLable="Request Personal Leave"
            icon="accessibility-cognitive-disability-solid"
            className="button-wrapper__bgwarnning"
            :variant="$button.pending.variant"
            @on-click="addLeaves('leave')"
          ></info-card-leave-vacation>
        </div>
      </div>
      <div>
        <no-record v-if="showNoData"></no-record>

        <div v-else-if="showTable"> 
          <list-leave-attendance
            :leaveData="leaveVacationDataUser"
            @delete-item="deleteConfirmation($event)"
          ></list-leave-attendance>
        </div>
        
        <confirmation-modal
          :title="deleteModalContent.title"
          :confirmationMessage="deleteModalContent.message"
          :confirmastionMessageModal="confirmastionMessageModal"
          @close="closeconfirmastionMessageModal"
          @deleteLeave="deleteLevaeVacation(deletedfileId)"
        ></confirmation-modal>
        
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { DELETE_MESSAGE } from "../../../utils/constant/ConfirmationMessage";
import {
  getUserLeavesDetailUser,
  deleteLevaeVacation,
} from "../../../utils/functions/functions_lib_api";
import {
  getCurrentDateMonth,
  getCurrentYear,
  generateYearList,
} from "../../../utils/functions/functions_lib";
import { SORTING_MENU } from "../../../utils/constant/Constant";
import { INFO_CARD_LEAVE_VACATION_DATA } from "../../../utils/constant/Calander";
import { getEmployeeFullName } from "../../../utils/functions/common_functions";

export default {
  data() {
    return {
      id: "",
      activeTab: "Dashborad",
      activeUserData: "",
      items: SORTING_MENU.leaveVacationUserFilter,
      infoCardData: INFO_CARD_LEAVE_VACATION_DATA,
      leaveVacationDataUser: [],
      currentMonth: fecha.format(new Date(), "MM"),
      currentYear: fecha.format(new Date(), "YYYY"),
      selectedYear: new Date().getFullYear(),
      fromDate: "",
      toDate: "",
      loading: true,
      allChecked: false,
      checked: false,
      confirmastionMessageModal: false,
      deleteItemId: "",
      allowanceLeavesDetailedData: '00',
      is_data_fetched: false,
      confirmastionMessageModal: false,
      deleteModalContent: DELETE_MESSAGE[0],
      deletedfileId: null,
      dropMenuYear: [],
    };
  },
  computed: {
    ...mapGetters({
      getActiveUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
      getformToDate: "leavevacation/getformToDate",
      getUserRole: "token/getUserRole",
    }),
    showTable() {
      return !this.loading && this.leaveVacationDataUser?.length;
    },
    showNoData() {
      return !this.loading && (!this.leaveVacationDataUser || !this.leaveVacationDataUser?.length);
    },
  },
  async created() {
    this.$root.$on("fetched-leave-vacation", () => {
      this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then((result) => {
          this.leaveVacationDataUser = result;
        });
      this.getUserLeavesDetailUser().then((result) => {
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });
    });
  },
  async mounted() {
    this.dropMenuYear = this.generateYearList();
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.getUserLeavesDetailUser({
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    }).then((result) => {
      this.allowanceLeavesDetailedData = result;
      this.is_data_fetched = true;
    });
    this.activeUserData = this.getActiveUser;
    this.selectedMonth = this.currentMonth;
    this.getCurrentYear();
    await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });

    await this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    });
    this.leaveVacationDataUser = this.getLeaveVacationUser;
  },
  methods: {
    getCurrentDateMonth,
    getCurrentYear,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
    getEmployeeFullName,
    generateYearList,
    async changeYearView(e) {
      this.selectedYear = e.label;
      this.getCurrentYear();
      await this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      this.getUserLeavesDetailUser({
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      }).then((result) => {
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });
      await this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      });
      this.leaveVacationDataUser = this.getLeaveVacationUser;
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    deleteConfirmation(id) {
      this.deletedfileId = id;
      this.confirmastionMessageModal = true;
    },
    filterItem(event) {
      console.log(event, "filterItem");
    },
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },
  },
};
</script>
