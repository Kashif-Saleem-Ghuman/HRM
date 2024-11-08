  <template>
    <div>
      <loader :loading="loading"></loader>
      <div id="people-action-wrapper">
        <section-header-left
          title="Leave & Vacations"
          headerRight="headerRight"
        ></section-header-left>
        <div class="pl-1 py-1">
          <div
            class="d-grid d-flex gap-1"
            style="grid-template-columns: repeat(3, 1fr)"
            v-if="is_data_fetched"
          >
            <info-card-leave-vacation
              :title="$button.PTO.label"
              :daysUsed="allowanceLeavesDetailedData.vacationDaysUsed"
              :totalAllowance="allowanceLeavesDetailedData.vacationDaysAllowed"
              :scheduledDays="allowanceLeavesDetailedData.vacationDaysScheduled"
              :daysUsedCarryOver="allowanceLeavesDetailedData.vacationCarryOver"
              :buttonLable="$button.PTO.buttonLable"
              icon="airplane-solid"
              className="button-wrapper__bgsucess"
              :variant="$button.approved.variant"
              @on-click="addLeaves('vacation')"
            ></info-card-leave-vacation>
            <info-card-leave-vacation
              :title="$button.MEDICAL.label"
              :daysUsed="allowanceLeavesDetailedData.medicalDaysUsed"
              :totalAllowance="allowanceLeavesDetailedData.medicalDaysAllowed"
              :scheduledDays="allowanceLeavesDetailedData.medicalDaysScheduled"
              :buttonLable="$button.MEDICAL.buttonLable"
              icon="medical-clinic-solid"
              className="button-wrapper__bgalert"
              :variant="$button.approved.variant"
              @on-click="addLeaves('medical')"
            ></info-card-leave-vacation>
            <info-card-leave-vacation
              :title="$button.UNPAID.label"
              :daysUsed="allowanceLeavesDetailedData.leaveDaysUsed"
              :scheduledDays="allowanceLeavesDetailedData.leaveDaysScheduled"
              :totalAllowance="allowanceLeavesDetailedData.leaveDaysAllowed"
              :buttonLable="$button.UNPAID.buttonLable"
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
              icon="arrowhead-down"
              @on-click="changeYearView($event)"
              class="mr-05"
              className="left:0 !important"
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
        return !this.loading && this.is_data_fetched && this.leaveVacationDataUser?.length > 0;
      },
      showNoData() {
        return !this.loading && this.is_data_fetched && (!this.leaveVacationDataUser || this.leaveVacationDataUser.length === 0);
      },
    },
    async mounted() {
      this.loading=true;
      this.registerRootListener();
      this.getCurrentYear();
      this.dropMenuYear = this.generateYearList();
      await this.$store.dispatch("employee/setUserList");
      await this.$store.dispatch("employee/setActiveUser");
      this.getUserLeavesDetailUser({
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      }).then((result) => {
        if (result) {
          this.allowanceLeavesDetailedData = result;
        } else {
          this.$openPopupNotification(this.$error.common_message);
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
            this.$openPopupNotification(this.$error.common_message);
          } else {
            this.leaveVacationDataUser = result;
            this.is_data_fetched = true;
          }
      })
      .catch((error) => {
        console.log('leavevacationUser_error', error);
          this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
        });
      if (this.$route.query?.request) {
        this.addLeaves(this.$route.query?.request);
      }
      this.loading=false;
    },
    methods: {
      getCurrentDateMonth,
      getCurrentYear,
      deleteLevaeVacation,
      getUserLeavesDetailUser,
      generateYearList,
      openPopupNotification(notification) {
        this.$store.dispatch("app/addNotification", { notification });
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
              this.$openPopupNotification(this.$error.common_message);
            } else {
              this.leaveVacationDataUser = result;
            }
        })
        .catch((error) => {
          this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
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
        this.$hideUserMenu();

        this.$nuxt.$emit("open-sidebar-admin", $event);
        this.$nuxt.$emit("close-sidebar");
        this.$nuxt.$emit("add-leave");
      },
      registerFetchedLeaveVacation() {
        this.$root.$on("fetched-leave-vacation", () => {
          this.$store
            .dispatch("leavevacation/setLeaveVacationsUser", {
              from: this.getformToDate.from,
              to: this.getformToDate.to,
            })
            .then((result) => {
              if (!result) {
                this.$openPopupNotification(this.$error.common_message);
              } else {
                this.leaveVacationDataUser = result;
              }
          }).catch((error) => {
            this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
            });
          this.getUserLeavesDetailUser({
            from: this.getformToDate.from,
            to: this.getformToDate.to,
          }).then((result) => {
            if (result) {
              this.allowanceLeavesDetailedData = result;
              this.is_data_fetched = true;
            } else {
              this.$openPopupNotification(this.$error.common_message);
            }
          });
        });
      },
      registerRootListener() {
        this.registerFetchedLeaveVacation();
      },
      unregisterRootListener() {
        this.$root.$off("fetched-leave-vacation");
      },
    },
    beforeDestroy() {
      this.unregisterRootListener();
    },
  };
  </script>
  <!--
  <style scoped>
  .dropdown-menu {
    z-index: 999;
  }
  </style> -->
