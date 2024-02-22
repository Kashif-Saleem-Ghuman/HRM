<template>
  <div id="leave-vacation-wrapper py-cus">
    <loader :loading="loading"></loader>
    <div class="" id="tab_info_wrapper">
      <div class="scroll_wrapper">
        <div class="px-1 py-1">
          <div
            class="d-grid d-flex gap-1 py-05"
            style="grid-template-columns: repeat(3, 1fr)"
            v-if="is_data_fetched"
          >
            <info-card-leave-vacation
              title="Vacation"
              :daysUsed="allowanceLeavesDetailedData.vacationDaysUsed"
              :scheduledDays="allowanceLeavesDetailedData.vacationDaysScheduled"
              :totalAllowance="allowanceLeavesDetailedData.vacationDaysAllowed"
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
              :daysUsed="allowanceLeavesDetailedData.medicalDaysUsed"
              :totalAllowance="allowanceLeavesDetailedData.medicalDaysAllowed"
              :scheduledDays="allowanceLeavesDetailedData.medicalDaysScheduled"
              buttonLable="Request Medical Leave"
              icon="medical-clinic-solid"
              className="button-wrapper__bgalert"
              :variant="$button.approved.variant"
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
              :variant="$button.approved.variant"
              @on-click="addLeaves(REQUEST_TYPES.LEAVE)"
              :type="REQUEST_TYPES.LEAVE"
              @update="setAllowance"
            ></info-card-leave-vacation>
          </div>
          <div class="pt-05 d-flex justify-start">
            <dropdown-menu-calendar
              :items="dropMenuYear"
              :label="selectedYear"
              :variant="$button.lightButton.variant"
              @on-click="changeYearView($event)"
              icon="arrowhead-down"
              class="mr-05"
            ></dropdown-menu-calendar>
          </div>
        </div>
      </div>
    </div>
    <div>
      <no-record v-if="showNoData"></no-record>

      <div v-else-if="showTable">
        <list-leave-attendance
          :leaveData="leaveVacationDataUser"
        ></list-leave-attendance>
        <loader :loading="loading"></loader>
      </div>
      <loader :loading="loading"></loader>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  getCurrentDateMonth,
  getCurrentWeek,
  getCurrentYear,
  generateYearList,
} from "../../../utils/functions/functions_lib";
import { DELETE_MESSAGE } from "../../../utils/constant/ConfirmationMessage";
import { REQUEST_TYPES } from "@/utils/constant/Constant";
const START_YEAR = 2021;

export default {
  data() {
    return {
      REQUEST_TYPES,
      is_data_fetched: false,
      leaveVacationDataUser: [],
      allowanceLeavesDetailedData: [],
      id: "",
      loading: true,
      fromDate: "",
      toDate: "",
      dropMenuYear: [],
      selectedYear: new Date().getFullYear(),
    };
  },
  computed: {
    ...mapGetters({
      getformToDate: "leavevacation/getformToDate",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
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
    this.selectedMonth = this.currentMonth;
    this.id = this.$route.params.id;
    this.getCurrentYear();
    this.getCurrentWeek();

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
        this.is_data_fetched = true;
      });

    await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });
    await this.$store
      .dispatch("leavevacation/setLeaveVacationsUser", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        employeeId: this.id,
      })
      .then((result) => {
        this.leaveVacationDataUser = result;
      });
    this.$root.$on("fetched-leave-vacation", () => {
      this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
          employeeId: this.id,
        })
        .then((result) => {
          this.leaveVacationDataUser = result;
        });
    });
    this.$root.$on("render-leave-yearly", (e) => {
      console.log(e)
      // this.changeYearView(e)
    });
    this.loading = false
  },
  
  mounted() {
    this.dropMenuYear = this.generateYearList();
  },
  methods: {
    getCurrentYear,
    getCurrentDateMonth,
    getCurrentWeek,
    generateYearList,
    async changeYearView(e) {
      this.selectedYear = e.label;
      await this.getCurrentYear();
      await this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      await this.$store
        .dispatch("leavesdata/setLeaveVacationsAllowance", {
          id: Number(this.id),
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then((result) => {
          this.allowanceLeavesDetailedData = result;
          this.is_data_fetched = true;
        });
      await this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
          employeeId: this.id,
        })
        .then((result) => {
          this.leaveVacationDataUser = result;
        });
    },
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    async setAllowance() {
      return this.$store
        .dispatch("leavesdata/setLeaveVacationsAllowance", {
          id: Number(this.id),
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then((result) => {
          this.allowanceLeavesDetailedData = result;
          this.is_data_fetched = true;
        });
    },
  },
};
</script>
