<template>
  <div id="pay-plan">
    <!-- Uncomment loader if needed -->
    <!-- <loader :loading="loading"></loader> -->
    <div>
      <div class="d-flex justify-between">
        <div>
          <action-button-header
            :primaryButton="{
              label: 'Pay Methods',
              icon: 'add',
              variant: 'primary',
              onClick: addPayPlans,
            }"
          />
        </div>
        <div class="d-flex">
          <filter-button
            :primaryButton="{
              filterLabel: 'Show',
              label: 'All',
              onClick: handleShowAll,
            }"
          />
          <filter-button
            :primaryButton="{
              filterLabel: 'Group by',
              label: 'Date',
              onClick: handleGroupBy,
            }"
          />
          <filter-button
            :primaryButton="{
              filterLabel: 'Sort by',
              label: 'Status',
              onClick: handleSortBy,
            }"
          />
        </div>
      </div>
      <div>
        <list-pay-plans :listPending="requestListData" :key="employeeList" />
        <!-- Uncomment no-record if needed -->
        <!-- <no-record v-if="showNoData"></no-record> -->
        <!-- Uncomment list-salaries if needed -->
        <!-- <div v-else-if="showTable">
          {{ requestListData }}
          <list-salaries
            :listPending="requestListData"
            :key="employeeList"
          ></list-salaries>
        </div> -->
        <pay-salaries-sidebar />
        <pay-method-modal
          v-if="isModalVisible"
          :payMethodsModal="isModalVisible"
          :modalTitle="'Pay Methods'"
          @close="addPayPlans"
        >
        <div class="d-flex d-align justify-between">
          <filter-button
            :primaryButton="{
              label: 'Credit card',
              icon: 'add',
              variant:'danger',
              class:'increase-button-size',
              onClick: handleShowAll,
            }"
          />
          <filter-button
            :primaryButton="{
              label: 'Bank account',
              variant:'danger',
              icon: 'add',
              class:'increase-button-size',
              onClick: handleGroupBy,
            }"
          />
          <filter-button
            :primaryButton="{
              label: 'PayPal',
              variant:'danger',
              icon: 'add',
              class:'increase-button-size',
              onClick: handleSortBy,
            }"
          />
      </div>
        </pay-method-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PAY_DUMMY_REQUESTS_PAYPLANS } from "../../utils/constant/pay/PayConstant";

export default {
  data() {
    return {
      id: null,
      requestListData: PAY_DUMMY_REQUESTS_PAYPLANS.requests,
      loading: true,
      fromDate: "",
      toDate: "",
      isModalVisible: false,
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
  methods: {
    addPayPlans() {
      this.isModalVisible = !this.isModalVisible;
    },
    handleShowAll() {
      console.log("Show All clicked!");
    },
    handleGroupBy() {
      console.log("Group By clicked!");
    },
    handleSortBy() {
      console.log("Sort By clicked!");
    },
  },
};
</script>
