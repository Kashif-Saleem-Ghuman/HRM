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
        v-if="is_data_fetched"
      >
        <info-card-leave-vacation
          title="Vacation"
          :daysUsed="allowanceLeavesDetailedData.vacationsUsed"
          :totalAllowance="allowanceLeavesDetailedData.vacationsAllowance"
          buttonLable="Request Vacation"
          icon="airplane-solid"
          className="button-wrapper__bgsucess"
          :variant="$button.approved.variant"
          @on-click="addLeaves('vacation')"
        ></info-card-leave-vacation>
        <info-card-leave-vacation
          title="Medical/sick"
          :daysUsed="allowanceLeavesDetailedData.medicalLeavesUsed"
          :totalAllowance="allowanceLeavesDetailedData.medicalLeavesAllowance"
          buttonLable="Request Medical Leave"
          icon="medical-clinic-solid"
          className="button-wrapper__bgalert"
          :variant="$button.rejected.variant"
          @on-click="addLeaves('medical')"
        ></info-card-leave-vacation>
        <info-card-leave-vacation
          title="Request Personal leave"
          :daysUsed="allowanceLeavesDetailedData.otherLeavesUsed"
          :totalAllowance="allowanceLeavesDetailedData.otherLeavesAllowance"
          buttonLable="Request Personal Leave"
          icon="accessibility-cognitive-disability-solid"
          className="button-wrapper__bgwarnning"
          :variant="$button.pending.variant"
          @on-click="addLeaves('leave')"
        ></info-card-leave-vacation>
      </div>
    </div>
    <div class="py-1">
      <list-leave-attendance
        :leaveData="leaveVacationDataUser"
        @delete-item="deleteItemConfirmation($event)"
        v-show="leaveVacationDataUser?.length ? true : false"
      ></list-leave-attendance>
      <div>
        <no-record
          v-show="leaveVacationDataUser?.length ? false : true"
        ></no-record>
      </div>
      <!-- <confirmation-modal
        :title="modalContent[0].title"
        :confirmationMessage="modalContent[0].message"
        :confirmastionMessageModal="confirmastionMessageModal"
        @close="closeconfirmastionMessageModal"
        @deleteLeave="deleteItem()"
      ></confirmation-modal> -->
      <loader v-bind:showloader="loading"></loader>
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
} from "../../../utils/functions/functions_lib";
import { SORTING_MENU } from "../../../utils/constant/Constant";
import { INFO_CARD_LEAVE_VACATION_DATA } from "../../../utils/constant/Calander";
export default {
  data() {
    return {
      id: "",
      activeTab: "Dashborad",
      activeUserData: "",
      items: SORTING_MENU.leaveVacationUserFilter,
      activeUserName: "",
      infoCardData: INFO_CARD_LEAVE_VACATION_DATA,
      leaveVacationDataUser: [],
      currentMonth: fecha.format(new Date(), "MM"),
      currentYear: fecha.format(new Date(), "YYYY"),
      selectedYear: "2023",
      fromDate: "",
      toDate: "",
      loading: false,
      allChecked: false,
      checked: false,
      confirmastionMessageModal: false,
      deleteItemId: "",
      modalContent: DELETE_MESSAGE.deleteConfirmationMessage,
      allowanceLeavesDetailedData: [],
      is_data_fetched: false,
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
  },
  async created() {
    this.$root.$on("update-leave-key", () => {
      this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    }).then((result) => {
      this.leaveVacationDataUser = result
    });
    });
  },
  async mounted() {
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.getUserLeavesDetailUser().then((result) => {
      this.allowanceLeavesDetailedData = result;
      this.is_data_fetched = true;
    });
    this.activeUserData = this.getActiveUser;
    this.getCurrentYear();
    this.loading = true;
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
    this.activeUserName =
      this.activeUserData.firstName +
      " " +
      this.activeUserData.lastName +
      " / " +
      "Leaves and Vacations";
    this.loading = false;
  },
  methods: {
    getCurrentDateMonth,
    getCurrentYear,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    deleteItemConfirmation(event) {
      this.confirmastionMessageModal = true;
      this.deleteItemId = event;
      console.log(this.deleteItemId, "this.deleteItemId ");
    },
    
    filterItem(event) {
      console.log(event, "filterItem");
      // if(event.key=='all'){
      //   for (var i = 0; i < this.items.length; i++){
      //     this.items[i].selected = !this.items[i].selected
      // }
      // }
      // console.log(event.key, "filterItem")
      // // event.selected = !event.selected
    },
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar", $event);
      this.$nuxt.$emit("add-leave");
    },
  },
};
</script>

