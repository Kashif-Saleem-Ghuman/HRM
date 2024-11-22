!
<template>
  <div id="salaries-request-wrapper">
    <loader :loading="loading"></loader>
    <div class="" id="salaries_request_wrapper">
      <div>
        <no-record v-if="showNoData"></no-record>
        <div v-else-if="showTable">
          <list-salaries
            :listPending="requestListData"
            :key="employeeList"
          ></list-salaries>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  getPendingLeaveVacationsAdmin,
} from "../../utils/functions/functions_lib_api";
export default {
  data() {
    return {
      id: null,
      requestListData: [],
      loading: true,
      fromDate: "",
      toDate: "",
    };
  },
  computed: {
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
    this.getPendingLeaveVacationsAdmin({
      from: this.fromDate,
      to: this.toDate,
    });
  },
  methods: {
    getPendingLeaveVacationsAdmin,
  },
};
</script>
