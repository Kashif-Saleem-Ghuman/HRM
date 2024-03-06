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
            :variant="$button.approved.variant"
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
            :variant="$button.approved.variant"
            @on-click="addLeaves('leave')"
          ></info-card-leave-vacation>
        </div>
        <div class="pt-1 d-flex justify-start">
          <dropdown-menu-calendar
            :items="dropMenuYear"
            :label="selectedYear"
            :variant="$button.lightButton.variant"
            icon="arrowhead-down"
            @on-click="changeYearView($event)"
            class="mr-05"
          ></dropdown-menu-calendar>
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
import { getEmployeeFullName } from "../../../utils/functions/common_functions";

export default {
  data() {
    return {
      id: "",
      activeTab: "Dashborad",
      activeUserData: "",
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
      allowanceLeavesDetailedData: "00",
      is_data_fetched: false,
      confirmastionMessageModal: false,
      deleteModalContent: DELETE_MESSAGE[0],
      deletedfileId: null,
      dropMenuYear: [],
    };
  },
  computed: {
    ...mapGetters({
      getActiveUser: "employee/GET_ACTIVE_USER",
      getAccessToken: "token/getAccessToken",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
      getformToDate: "leavevacation/getformToDate",
      getUserRole: "token/getUserRole",
    }),
    showTable() {
      return !this.loading && this.leaveVacationDataUser?.length;
    },
    showNoData() {
      return (
        !this.loading &&
        (!this.leaveVacationDataUser || !this.leaveVacationDataUser?.length)
      );
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
          if (!result) {
            this.openPopupNotification(this.$error.common_message);
          } else {
            this.leaveVacationDataUser = result;
          }
        });
      this.getUserLeavesDetailUser({
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    }).then((result) => {
        if(result){
          this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
        }else{
          this.openPopupNotification(this.$error.common_message)
        }
      });
    });
  },
  async mounted() {
    this.getCurrentYear();
    this.dropMenuYear = this.generateYearList();
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.getUserLeavesDetailUser({
      from: this.getformToDate.from,
        to: this.getformToDate.to,
      }).then((result) => {
      if(result){
          this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
        }else{
          this.openPopupNotification(this.$error.common_message)
        }
    });
    this.activeUserData = this.getActiveUser;
    this.selectedMonth = this.currentMonth;
    
    await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });

    await this.$store
      .dispatch("leavevacation/setLeaveVacationsUser", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      })
      .then((result) => {
        if (!result) {
          this.openPopupNotification(this.$error.common_message);
        } else {
          this.leaveVacationDataUser = result;
        }
      });
  },
  methods: {
    getCurrentDateMonth,
    getCurrentYear,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
    getEmployeeFullName,
    generateYearList,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification })
    },
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
      await this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then((result) => {
          if (!result) {
            this.openPopupNotification(this.$error.common_message);
          } else {
            this.leaveVacationDataUser = result;
          }
        });
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    deleteConfirmation(id) {
      this.deletedfileId = id;
      this.confirmastionMessageModal = true;
    },
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },
  },
};
</script>
