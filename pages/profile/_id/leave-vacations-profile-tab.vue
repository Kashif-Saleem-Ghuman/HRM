<template>
<div id="leave-vacation-wrapper py-cus">  
  <div class="" id="tab_info_wrapper">
    <div class="scroll_wrapper">
      <div class="px-1 py-05">
        <div
            class="d-grid d-flex gap-1 py-05"
            style="grid-template-columns: repeat(3, 1fr)"
            v-if="is_data_fetched"
        >
          <info-card-leave-vacation
            title="Vacation"
            :daysUsed="allowanceLeavesDetailedData.vacationsUsed"
            :totalAllowance=allowanceLeavesDetailedData.vacationsAllowance
            buttonLable="Request Vacation"
            icon="airplane-solid"
            className="button-wrapper__bgsucess"
            :variant="$button.approved.variant"
            @on-click="addLeaves('vacation')"
          ></info-card-leave-vacation>
          <info-card-leave-vacation
            title="Medical/sick"
            :daysUsed="
                allowanceLeavesDetailedData.medicalLeavesUsed
            "
            :totalAllowance="allowanceLeavesDetailedData.medicalLeavesAllowance"
            buttonLable="Request Medical Leave"
            icon="medical-clinic-solid"
            className="button-wrapper__bgalert"
            :variant="$button.rejected.variant"
            @on-click="addLeaves('medical')"
            ></info-card-leave-vacation>
            <info-card-leave-vacation
            title="Personal leave"
            :daysUsed="allowanceLeavesDetailedData.otherLeavesUsed"
            :totalAllowance="allowanceLeavesDetailedData.otherLeavesAllowance"
            buttonLable="Request Personal Leave"
            icon="accessibility-cognitive-disability-solid"
            className="button-wrapper__bgwarnning"
            :variant="$button.pending.variant"
            @on-click="addLeaves('leave')"
          ></info-card-leave-vacation>
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
          <confirmation-modal
            :title="modalContent[0].title"
            :confirmationMessage="modalContent[0].message"
            :confirmastionMessageModal="confirmastionMessageModal"
            @close="closeconfirmastionMessageModal"
            @deleteLeave="deleteItem()"
          ></confirmation-modal>
          <loader v-bind:showloader="loading"></loader>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getCurrentDateMonth, getCurrentWeek, getCurrentYear } from '../../../utils/functions/functions_lib';
import { DELETE_MESSAGE } from '../../../utils/constant/ConfirmationMessage';

export default {
  data() {
    return {
      is_data_fetched: false,
      leaveVacationDataUser: [],
      allowanceLeavesDetailedData: [],
      id: '',
      modalContent: DELETE_MESSAGE.deleteConfirmationMessage,
      confirmastionMessageModal: false,
      loading: false,
      fromDate: '',
      toDate: '',
    };
  },
  computed: {
    ...mapGetters({
      getformToDate: "leavevacation/getformToDate",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
    })
  },
  async created() {
    this.selectedMonth = this.currentMonth;
    this.id = this.$route.params.id;
    this.getCurrentYear();
    // this.getCurrentDateMonth();
    this.getCurrentWeek();

    await this.$store
      .dispatch("leavesdata/setLeaveVacationsAllowance", Number(this.id))
      .then((result) => {
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });

    await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });
    await this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
      employeeId: this.id,
    }).then((result) => {
      this.leaveVacationDataUser = result
    });
    this.$root.$on("fetched-leave-vacation", () => {
       this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
      employeeId: this.id,
    }).then((result) => {
      this.leaveVacationDataUser = result
    });
    });
  },
  methods: {
    getCurrentYear,
    getCurrentDateMonth,
    getCurrentWeek,
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("add-leave");
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
  }
}
</script>