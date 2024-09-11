
<template>
  <div class="scroll-wrapper">
    <div class="custom-header px-1 pt-05 pb-025" style="z-index: 9">
      <div>
        <div class="pt-05">
          <div class="d-flex pr-05">
            <div>
              <bib-button
                :icon="$button.approved.icon"
                :variant="$button.approved.variant"
                :scale="1"
                label="Add Leave"
                class="mr-05"
                @click.native.stop="actionBY('leave', 'employeeDropdownKey')"
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
          <div class="pt-05">
            <list-accordion
              :listPending="getLeaveVacationList"
            ></list-accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";

import {
  getDateRanges,
  generateYearList,
} from "../../utils/functions/functions_lib.js";

import {
  addLeaveVacations,
} from "@/utils/functions/functions_lib_api.js";

import {LeaveRequest} from "@/components/common/models/leave_request";
import {parseDate} from "@/utils/functions/dates";
import {DateTime} from "luxon";
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
        this.requestListData?.length &&
        this.requestListData?.some((item) => item.checked)
      );
    },
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
      getLeaveVacation: "leavevacation/getLeaveVacation",
    }),
    showTable() {
      return !this.loading && this.requestListData?.length;
    },
    showNoData() {
      return (
        !this.loading &&
        (!this.requestListData || !this.requestListData?.length)
      );
    },
    getLeaveVacationList() {
      return !this.loading ? this.filterRequestData(this.getLeaveVacation).map(coll => new LeaveRequest(coll)) : [];
    },
  },

  mounted() {
    this.dropMenuYear = this.generateYearList();
    this.setLeaveRequests();
    this.setFormToDate();
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
    async setFormToDate() {
      const { nextWeek } = getDateRanges();
      await this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: nextWeek.start,
        to: nextWeek.end,
      });
    },
    generateYearList,
    actionBY($event, key) {
      this.$nuxt.$emit("open-sidebar-admin", $event, key);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },
    isRequestPresent (startDate) {
      return parseDate(startDate) >= DateTime.local();
    },

    isRequestRejected(request) {
      return request.status === 'rejected';
    },

    hasRequestPastDays(request) {
      const today = DateTime.local();
      return parseDate(request.end).endOf('day') < today;
    },

    filterRequestData(requests) {
      return requests.filter(request => { return !this.isRequestRejected(request) && !this.hasRequestPastDays(request) });
    },

    async setLeaveRequests() {
      try{
        const { nextWeek } = getDateRanges();
          await this.$store.dispatch(
          "leavevacation/setLeaveVacations",
          {
            from: nextWeek.start,
            to: nextWeek.end,
          }
        );
      } catch (errorMessage) {
        this.$openPopupNotification({
          text: errorMessage,
          variant: "danger",
        });
      } finally {
        this.loading = false;
      }
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

<style lang="scss">
.custom-header {
  display: flex;
  justify-content: space-between;
  z-index: 900;
  // background-color: #cdf784;
  
}
</style>