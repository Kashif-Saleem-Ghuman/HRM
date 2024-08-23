<template>
  <div>
    <div class="add-leave-wrapper">
      <div class="pb-1" style="margin-top: -20px;">
        <leaves-settings-section
          sectionTitle="Leave"
          :totalAllowance="getLeaveAllowance.leaveDaysAllowed"
          :dayUsed="getLeaveAllowance.leaveDaysUsed"
          :scheduledDays="getLeaveAllowance.leaveDaysScheduled"
          leaveType="leave"
          :leaveButton="true"
          :settingButtons="false"
          :leaveTypeField="true"
        ></leaves-settings-section>
      </div>
      <leaves-settings-section
        sectionTitle="Vacations"
        :totalAllowance="getLeaveAllowance.vacationDaysAllowed"
        :dayUsed="getLeaveAllowance.vacationDaysUsed"
        :scheduledDays="getLeaveAllowance.vacationDaysScheduled"
        :accrued="getLeaveAllowance.accrued"
        leaveType="vacation"
      ></leaves-settings-section>
      <div class="py-1">
        <leaves-settings-section
          sectionTitle="Medical Leave"
          :totalAllowance="getLeaveAllowance.medicalDaysAllowed"
          :dayUsed="getLeaveAllowance.medicalDaysUsed"
          :scheduledDays="getLeaveAllowance.medicalDaysScheduled"
          leaveType="medical"
        ></leaves-settings-section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      id: null,
      allowanceLeavesDetailedData: [],
    };
  },
  async created() {},
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
      getLeaveAllowance: "leavesdata/getLeaveAllowance",
    }),

    balanceLeaveValue() {
      if (!Number.isNaN(this.totalAllowance) && !Number.isNaN(this.daysUsed)) {
        const balance =
          this.totalAllowance - this.daysUsed - this.daysUsedCarryOver;
        return balance % 1 === 0 ? balance : balance.toFixed(2);
      }
      return 0;
    },
    employeeId() {
      return this.$store.state.employee.selectedEmployeeId;
    },
  },

  methods: {},
};
</script>
