<template>
  <div id="pay-plan">
    <loader v-if="loading" :loading="loading" />
    <div v-else>
      <div class="d-flex justify-between">
        <div>
          <action-button-header
            :primaryButton="{
              label: 'Pay Plan',
              icon: 'add',
              variant: 'primary',
              onClick: addPayPlans,
            }"
          />
        </div>
        <!-- Uncomment this section if needed -->
        <!-- <div class="d-flex">
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
        </div> -->
      </div>
      <div>
        <list-pay-plans :payPlansList="requestListData" />
        <pay-plan-sidebar
          @created-pay-plan="addNewPayPlan"
          :payMethodsList="payMethods"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPayPlans } from "../../utils/functions/api_call/pay/pay-plans";
import { getPayMethods } from "../../utils/functions/api_call/pay/pay-method";

export default {
  data() {
    return {
      id: null,
      requestListData: [],
      payMethods: [],
      loading: true, // Indicates if all API calls are still in progress
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
  methods: {
    async fetchPayPlans() {
      try {
        const payPlans = await getPayPlans();
        this.requestListData = payPlans || [];
      } catch (error) {
        console.error("Failed to fetch pay plans:", error);
      }
    },
    async getPayMethods() {
      try {
        this.payMethods = await getPayMethods();
      } catch (error) {
        console.error("Error fetching pay methods:", error);
      }
    },
    async initializeData() {
      this.loading = true;
      try {
        await Promise.all([this.fetchPayPlans(), this.getPayMethods()]);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        this.loading = false;
      }
    },
    addNewPayPlan(data) {
      console.log("End data --- ", data);
      this.requestListData.push(data);
    },
    addPayPlans() {
      this.$nuxt.$emit("open-sidebar-pay-paln", { /* pass any data if needed */ });
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
  created() {
    this.initializeData(); // Fetch all necessary data before rendering
  },
};
</script>
