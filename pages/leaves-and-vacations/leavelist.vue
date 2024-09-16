!
<template>
  <div>
    <div class="custom-header px-1 pt-05 pb-02" style="z-index: 9">
      <div>
        <div class="pt-05">
          <div class="d-flex pr-05">
            <div class="align-center nav_wrapper">
              <dropdown-menu-calendar
                :items="dropMenuYear"
                :label="selectedYear.toString()"
                size="xl"
                icon="arrowhead-down"
                @on-click="changeYearView($event)"
                className="left:0px !important"
              ></dropdown-menu-calendar>
            </div>
            <div class="ml-1">
              <bib-button
                :icon="$button.approved.icon"
                :variant="$button.approved.variant"
                :scale="1"
                label="Add Leave"
                @click.native.stop="actionBY('leave', 'employeeDropdownKey')"
                class="mr-05"
              ></bib-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="pending-request-wrapper">
      <loader :loading="loading"></loader>
      <div class="" id="pending_request_wrapper">
        <div>
          <no-record v-if="showNoData"></no-record>

          <div v-else-if="showTable" class="pt-1">
            <list-leaves
              :listPending="getLeaveVacation"
            ></list-leaves>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";

import {
  getCurrentYear,
  generateYearList,
} from "../../utils/functions/functions_lib.js";

import {
  addLeaveVacations,
} from "@/utils/functions/functions_lib_api.js";

export default {
  data() {
    return {
      requestListData: [],
      loading: true,
      dropMenuYear: [],
      selectedYear: new Date().getFullYear(),
      fromDate: "",
      toDate: "",
    };
  },
  computed: {
    showBatchApproveButton() {
      return (
        !this.loading &&
        this.getLeaveVacation?.length &&
        this.getLeaveVacation?.some((item) => item.checked)
      );
    },
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
      getLeaveVacation: "leavevacation/getLeaveVacation",
    }),
    showTable() {
      return !this.loading && this.getLeaveVacation?.length;
    },
    showNoData() {
      return (
        !this.loading &&
        (!this.getLeaveVacation || !this.getLeaveVacation?.length)
      );
    },
  },
  async created() {
    this.getCurrentYear();
  },
  mounted() {
    this.dropMenuYear = this.generateYearList();
    this.setLeaveRequests();
    this.registerRootListener();
  },
  beforeDestroy() {
    this.unregisterFetchLeaveVacation();
  },
  methods: {
    addLeaveVacations,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    getCurrentYear,
    generateYearList,
    async changeYearView(e) {
      this.selectedYear = e.label;
      this.getCurrentYear();
      const dateRange = {
        from: this.fromDate,
        to: this.toDate,
      };
      await this.$store.dispatch(
        "leavevacation/setActiveFromToDate",
        dateRange
      );
      await this.setLeaveRequests();
    },
    async setLeaveRequests() {
      this.loading = true;
      try{
        const requests = await this.$store.dispatch(
          "leavevacation/setLeaveVacations",
          {
            from: this.fromDate,
            to: this.toDate,
          }
        );
      } catch (errorMessage) {
        console.log(errorMessage);
      } finally
      {
        this.loading = false;
      }
    },

    actionBY($event, key) {
      this.$hideUserMenu();
      this.$nuxt.$emit("open-sidebar-admin", $event, key);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },

    unregisterFetchLeaveVacation() {
      this.$root.$off("fetched-leave-vacation-admin");
    },
    registerFetchLeaveVacation() {
      this.$root.$on("fetched-leave-vacation-admin", (e) => {
        this.setLeaveRequests();
      })
    },
    registerRootListener() {
      this.registerFetchLeaveVacation();
    },
    unregisterRootListener() {
      this.unregisterFetchLeaveVacation();
    },
  }
};
</script>
