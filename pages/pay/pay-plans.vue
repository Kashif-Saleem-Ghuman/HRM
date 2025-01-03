<template>
  <div id="pay-plan">
    <!-- Uncomment loader if needed -->
    <!-- <loader :loading="loading"></loader> -->
    <div>
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
        <list-pay-plans 
          :payPlansList="requestListData"  
          @row-clicked="rowClicked"
          @delete-pay-plan="handleDeletePlan"
        />
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
        <pay-plan-sidebar @created-pay-plan="addNewPayPlan" :payMethodsList="payMethods" @handle-delete="handleDeletePlan" :editData="selectedPayPlan"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPayPlans, deletePayPlan } from "../../utils/functions/api_call/pay/pay-plans";
import { getPayMethods } from "../../utils/functions/api_call/pay/pay-method";

export default {
  data() {
    return {
      id: null,
      requestListData: [],
      payMethods:[],
      loading: true,
      fromDate: "",
      toDate: "",
      selectedPayPlan: null,
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
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    async fetchPayPlans() {
      try {
        this.loading = true;
        const payPlans = await getPayPlans();
        this.requestListData = payPlans || [];

      } catch (error) {
        console.error("Failed to fetch pay plans:", error);
      } finally {
        this.loading = false;
      }
    }, 
      // Fetch existing pay methods
      async getPayMethods() {
      try {
        this.payMethods = await getPayMethods();
        console.log("parent pay methods --- ", this.payMethods)
      } catch (error) {
        console.error("Error fetching pay methods:", error);
      }
    },

    addNewPayPlan(data){
     console.log("End data --- ", data);
     if(data){
      this.requestListData.push(data);
      this.$openPopupNotification({
          text: "Pay Plan Created successfully",
          variant: "success",
        })
     }else{
      this.$openPopupNotification({
          text: "Pay Plan Updated successfully",
          variant: "success",
        })
      this.fetchPayPlans();  
      this.getPayMethods();
     }

    },

    addPayPlans() {
      this.selectedPayPlan = {};
      this.$nuxt.$emit("open-sidebar-pay-paln", {});
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
    rowClicked(rowData) {
      this.selectedPayPlan = rowData;
      this.$nuxt.$emit("open-sidebar-pay-paln", { data: this.selectedPayPlan });
    },
    async handleDeletePlan(id) {
      try {
        await deletePayPlan(id);
        // Remove the deleted item from the list
        this.requestListData = this.requestListData.filter(item => item.id !== id);
        this.$openPopupNotification({
          text: "Pay Plan deleted successfully",
          variant: "success",
        });
      } catch (error) {
        console.error("Error deleting pay plan:", error);
        this.$openPopupNotification({
          text: "Failed to delete pay plan",
          variant: "danger",
        });
      }
    },
  },
  created() {
    this.fetchPayPlans();  
    this.getPayMethods();
  },
};
</script>