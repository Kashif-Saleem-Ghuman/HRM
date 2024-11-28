<template>
  <div id="pay-plan">
    <div>
      <!-- Header with Action Button -->
      <div class="d-flex justify-between">
        <div>
          <action-button-header
            :primaryButton="{
              label: 'Pay Type',
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
              filterLabel: 'Sort by',
              label: 'Date created',
              onClick: handleSortBy,
            }"
          />
        </div>
      </div>

      <!-- List Pay Plans -->
      <div>
        <list-pay-type
          :listPending="requestListData"
          :tableFields="tableFields"
          :key="employeeList"
        />
        <!-- Pay Methods Modal -->
        <pay-method-modal
          v-if="isModalVisible"
          :payMethodsModal="isModalVisible"
          modalTitle="Pay Types"
          @close="addPayTypes"
        >
          <div class="d-flex">
            <bib-input
              type="text"
              name="payTypeName"
              placeholder="Salary, Commission, Overtime, Expense, etc..."
              label="Pay type name"
              required
              style="width: 100%"
            />
          </div>
          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              pill
            ></bib-button>
            <bib-button
              label="Add"
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
import { PAY_DUMMY_REQUESTS_PAYTYPE } from "../../utils/constant/pay/PayConstant";
import { TABLE_HEAD } from "../../utils/constant/pay/PayConstant";

export default {
  data() {
    return {
      id: null,
      requestListData: PAY_DUMMY_REQUESTS_PAYTYPE.requests,
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
