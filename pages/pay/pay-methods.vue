<template>
  <div id="pay-plan">
    <div>
      <!-- Header with Action Button -->
      <div class="d-flex justify-between">
        <div>
          <action-button-header
            :primaryButton="{
              label: 'Pay Methods',
              icon: 'add',
              variant: 'primary',
              onClick: addPayTypes,
            }"
          />
        </div>
        <div class="d-flex">
          <!-- Filter Buttons -->
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

      <!-- List Pay Plans -->
      <div>
        <list-pay-method
          :payMethodList="requestListData"
          :tableFields="tableFields"
          :key="employeeList"
        />
        <!-- Pay Methods Modal -->
        <pay-method-modal
          v-if="isModalVisible"
          :payMethodsModal="isModalVisible"
          modalTitle="Pay Methods"
          @close="addPayTypes"
        >
          <div class="d-flex d-align justify-between">
            <filter-button
              :primaryButton="{
                label: 'Credit card',
                icon: 'add',
                variant: isLightThemeCheck ? 'light' : 'secondary',
                class: 'increase-button-size',
                onClick: () => addPayMethod('Credit or Debit card'),
              }"
            />
            <filter-button
              :primaryButton="{
                label: 'Bank account',
                variant: isLightThemeCheck ? 'light' : 'secondary',
                icon: 'add',
                class: 'increase-button-size',
                onClick: () => addPayMethod('Bank account'),
              }"
            />
            <filter-button
              :primaryButton="{
                label: 'PayPal',
                variant: isLightThemeCheck ? 'light' : 'secondary',
                icon: 'add',
                class: 'increase-button-size',
                onClick: () => addPayMethod('PayPal'),
              }"
            />
          </div>
        </pay-method-modal>

        <!-- Add Pay Method Modal -->
        <pay-method-modal
          v-if="isModalVisibleAddPayMethod"
          :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`"
          @close="addPayMethod"
          headerIcon="arrow-left"
        >
          <add-payment-method-form />
          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              pill
            ></bib-button>
            <bib-button
              label="Save"
              variant="primary-24"
              class="ml-auto"
              pill
            ></bib-button>
          </template>
        </pay-method-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PAY_DUMMY_REQUESTS_PAYMETHODS } from "../../utils/constant/pay/PayConstant";
import { TABLE_HEAD } from "../../utils/constant/pay/PayConstant";

export default {
  data() {
    return {
      id: null,
      requestListData: PAY_DUMMY_REQUESTS_PAYMETHODS.requests,
      loading: true,
      fromDate: "",
      toDate: "",
      isModalVisible: false,
      isModalVisibleAddPayMethod: false,
      clickItemTitle: null,
      tableFields: TABLE_HEAD.tHeadPayPlans,
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
        !this.loading && (!this.requestListData || !this.requestListData.length)
      );
    },
  },
  methods: {
    addPayMethod(payMethod) {
      this.isModalVisibleAddPayMethod = !this.isModalVisibleAddPayMethod;
      this.isModalVisible = false;
      this.clickItemTitle = payMethod;
    },
    addPayTypes() {
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
