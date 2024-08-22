<template>
  <div>
    <div class="add-leave-wrapper min-z-index">
      <medical-section
        :totalAllowance="allowanceLeavesDetailedData.medicalDaysAllowed"
        :dayUsed="allowanceLeavesDetailedData.medicalDaysUsed"
        :scheduledDays="allowanceLeavesDetailedData.medicalDaysScheduled"
      ></medical-section>
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
  async created() {
    this.id = this.$route.params.id;
    this.$store.commit("employee/SET_SELECTED_EMPLOYEE_ID", {
      employeeId: this.id,
    });

    await this.$store
      .dispatch("leavesdata/setLeaveVacationsAllowance", {
        id: Number(this.id),
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      })
      .then((result) => {
        this.allowanceLeavesDetailedData = result;
      });
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
      getformToDate: "leavevacation/getformToDate",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
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

</style>
