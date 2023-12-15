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
            :daysUsed="allowanceLeavesDetailedData.vacationDaysUsed"
            :scheduledDays="allowanceLeavesDetailedData.vacationDaysScheduled"
            :totalAllowance=allowanceLeavesDetailedData.vacationDaysAllowed
            buttonLable="Request Vacation"
            icon="airplane-solid"
            className="button-wrapper__bgsucess"
            :variant="$button.approved.variant"
            @on-click="addLeaves(REQUEST_TYPES.VACATION)"
            :type="REQUEST_TYPES.VACATION"
            @update="setAllowance"
          ></info-card-leave-vacation>
          <info-card-leave-vacation
            title="Medical/sick"
            :daysUsed="allowanceLeavesDetailedData.medicalDaysAllowed"
            :totalAllowance="allowanceLeavesDetailedData.medicalDaysAllowed"
            :scheduledDays="allowanceLeavesDetailedData.medicalDaysScheduled"
            buttonLable="Request Medical Leave"
            icon="medical-clinic-solid"
            className="button-wrapper__bgalert"
            :variant="$button.rejected.variant"
            @on-click="addLeaves(REQUEST_TYPES.MEDICAL)"
            :type="REQUEST_TYPES.MEDICAL"
            @update="setAllowance"
            ></info-card-leave-vacation>

            <info-card-leave-vacation
            title="Personal leave"
            :daysUsed="allowanceLeavesDetailedData.leaveDaysUsed"
            :totalAllowance="allowanceLeavesDetailedData.leaveDaysAllowed"
            :scheduledDays="allowanceLeavesDetailedData.leaveDaysScheduled"
            buttonLable="Request Personal Leave"
            icon="accessibility-cognitive-disability-solid"
            className="button-wrapper__bgwarnning"
            :variant="$button.pending.variant"
            @on-click="addLeaves(REQUEST_TYPES.LEAVE)"
            :type="REQUEST_TYPES.LEAVE"
            @update="setAllowance"
          ></info-card-leave-vacation>
        </div>
        <div class="py-1">
          <list-leave-attendance
            :leaveData="leaveVacationDataUser"
            v-show="leaveVacationDataUser?.length ? true : false"
          ></list-leave-attendance>
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
import { REQUEST_TYPES } from "@/utils/constant/Constant"

export default {
  data() {
    return {
      REQUEST_TYPES,
      is_data_fetched: false,
      leaveVacationDataUser: [],
      allowanceLeavesDetailedData: [],
      id: '',
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
    this.getCurrentWeek();
    
    this.$store.commit('employee/SET_SELECTED_EMPLOYEE_ID', { employeeId: this.id})

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
    async setAllowance() {
      return this.$store
      .dispatch("leavesdata/setLeaveVacationsAllowance", Number(this.id))
      .then((result) => {
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });
    }
  }
}
</script>