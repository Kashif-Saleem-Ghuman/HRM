!
<template>
  <div id="pending-request-wrapper">
    <loader :loading="loading"></loader>
    <div class="" id="pending_request_wrapper">
      <div>
        <div class="pt-1">
          <list-accordion
            :listPending="requestListData"
          ></list-accordion>
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
  },

  mounted() {
    this.dropMenuYear = this.generateYearList();
    this.getLeaveRequests();
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    getDateRanges,
    generateYearList,

    isRequestPresent (startDate) {
      return parseDate(startDate) >= DateTime.local();
    },

    isRequestRejected(request) {
      return request.status === 'rejected';
    },

    hasRequestPastDays(request) {
      const today = DateTime.local();
      return parseDate(request.request.end).endOf('day') < today;
    },

    filterRequestData(requests) {
      return requests.filter(request => { return !this.isRequestRejected(request) && !this.hasRequestPastDays(request) });
    },

    async getLeaveRequests() {
      try{
        const { nextWeek } = getDateRanges();
        const requests = await this.$store.dispatch(
          "leavevacation/setLeaveVacations",
          {
            from: nextWeek.start,
            to: nextWeek.end,
          }
        );

        this.requestListData = this.filterRequestData(requests).map(coll => new LeaveRequest(coll));
      } catch (errorMessage) {
        this.$openPopupNotification({
          text: errorMessage,
          variant: "danger",
        });
      } finally {
        this.loading = false;
      }
    },

  }
};
</script>
