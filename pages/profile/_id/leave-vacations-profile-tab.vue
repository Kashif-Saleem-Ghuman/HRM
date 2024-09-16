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
            :key="refreshCard"
          >
            <info-card-leave-vacation
              :title="$button.PTO.label"
              :daysUsed="allowanceLeavesDetailedData.vacationDaysUsed"
              :scheduledDays="allowanceLeavesDetailedData.vacationDaysScheduled"
              :totalAllowance="allowanceLeavesDetailedData.vacationDaysAllowed"
              :daysUsedCarryOver="allowanceLeavesDetailedData.vacationCarryOver"
              :buttonLable="$button.PTO.buttonLable"
              :icon="$button.PTO.icon"
              className="button-wrapper__bgsucess"
              :variant="$button.approved.variant"
              @on-click="addLeaves(REQUEST_TYPES.VACATION)"
              :type="REQUEST_TYPES.VACATION"
              @update="setAllowance"
            ></info-card-leave-vacation>
            <info-card-leave-vacation
              :title="$button.MEDICAL.label"
              :daysUsed="allowanceLeavesDetailedData.medicalDaysUsed"
              :totalAllowance="allowanceLeavesDetailedData.medicalDaysAllowed"
              :scheduledDays="allowanceLeavesDetailedData.medicalDaysScheduled"
              :buttonLable="$button.MEDICAL.buttonLable"
              :icon="$button.MEDICAL.icon"
              className="button-wrapper__bgalert"
              :variant="$button.approved.variant"
              @on-click="addLeaves(REQUEST_TYPES.MEDICAL)"
              :type="REQUEST_TYPES.MEDICAL"
              @update="setAllowance"
            ></info-card-leave-vacation>

            <info-card-leave-vacation
              :title="$button.UNPAID.label"
              :daysUsed="allowanceLeavesDetailedData.leaveDaysUsed"
              :totalAllowance="allowanceLeavesDetailedData.leaveDaysAllowed"
              :scheduledDays="allowanceLeavesDetailedData.leaveDaysScheduled"
              :buttonLable="$button.UNPAID.buttonLable"
              :icon="$button.UNPAID.icon"
              className="button-wrapper__bgwarnning"
              :variant="$button.approved.variant"
              @on-click="addLeaves(REQUEST_TYPES.LEAVE)"
              :type="REQUEST_TYPES.LEAVE"
              @update="setAllowance"
            ></info-card-leave-vacation>
            <!-- <info-card-settings
              :title="$button.SETTINGS.label"
              :buttonLable="$button.SETTINGS.buttonLable"
              :icon="$button.SETTINGS.icon"
              className="button-wrapper__bgwarnning"
              :variant="$button.SETTINGS.variant"
              @on-click="addLeavesSettings()"
              :type="REQUEST_TYPES.LEAVE"
              @update="setAllowance"
            ></info-card-settings> -->
          </div>
          <div class="pt-05 d-flex justify-start">
            <dropdown-menu-calendar
              :items="dropMenuYear"
              :label="selectedYear"
              @on-click="changeYearView($event)"
              icon="arrowhead-down"
              className="left:0 !important"
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
      refreshCard:0
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
    this.$root.$on("fetched-leave-vacation-admin", () => {
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
    this.$root.$on("render-leave-actual-data", (e) => {
      this.$store
      .dispatch("leavesdata/setLeaveVacationsAllowance", {
        id: Number(this.id),
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      })
      .then((result) => {
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });
      this.refreshCard += 1;
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
      this.$hideUserMenu();
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("close-sidebar-settings");
      this.$nuxt.$emit("add-leave");
    },
    addLeavesSettings() {
      this.$nuxt.$emit("open-sidebar-settings");
      this.$nuxt.$emit("close-sidebar-main");
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
