!
<template>
  <div id="salaries-wrapper">
    <!-- <loader :loading="loading"></loader> -->
    <div>
      <div>
        <list-salaries
          :tableFields="tableFields"
          :listPending="requestListData"
          :key="employeeList"
        ></list-salaries>
        <!-- <no-record v-if="showNoData"></no-record>
        <div v-else-if="showTable">
          {{ requestListData }}
          <list-salaries
            :listPending="requestListData"
            :key="employeeList"
          ></list-salaries>
        </div> -->
        <pay-salaries-sidebar></pay-salaries-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PAY_DUMMY_REQUESTS } from "../../utils/constant/pay/PayConstant";
import { TABLE_HEAD } from "../../utils/constant/pay/PayConstant";

export default {
  data() {
    return {
      id: null,
      requestListData: PAY_DUMMY_REQUESTS.requests,
      loading: true,
      fromDate: "",
      toDate: "",
      tableFields: TABLE_HEAD.tHeadPaySalaries,
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
  methods: {},
};
</script>
