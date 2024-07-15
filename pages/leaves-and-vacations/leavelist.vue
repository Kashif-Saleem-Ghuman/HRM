!
<template>
  <div id="pending-request-wrapper">
    <loader :loading="loading"></loader>
    <div class="" id="pending_request_wrapper">
      <div>
        <no-record v-if="showNoData"></no-record>

        <div v-else-if="showTable" class="pt-1">
          <list-leaves
            :listPending="requestListData"
          ></list-leaves>
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
import { LEAVEVACATION_TAB } from "../../utils/constant/Constant";
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
  async created() {
    this.getCurrentYear();
  },
  mounted() {
    this.dropMenuYear = this.generateYearList();
    this.getLeaveRequests();
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    getCurrentYear,
    generateYearList,
    async getLeaveRequests() {
      const requests = await this.$store.dispatch(
        "leavevacation/setLeaveVacations",
        {
          from: this.fromDate,
          to: this.toDate,
        }
      );
      this.requestListData = requests;
      this.loading = false;
    },

  }
};
</script>
