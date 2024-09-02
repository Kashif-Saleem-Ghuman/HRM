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
    async getLeaveRequests() {
      const { nextWeek } = getDateRanges();

      const requests = await this.$store.dispatch(
        "leavevacation/setLeaveVacations",
        {
          from: nextWeek.start,
          to: nextWeek.end,
        }
      );
      this.requestListData = requests;
      this.loading = false;
    },

  }
};
</script>
