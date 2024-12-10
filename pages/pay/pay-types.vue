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
          :payTypeList="requestListData"
          :tableFields="tableFields"
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
              :variant="isLightThemeCheck ? 'light' : 'dark'"
              style="width: 100%"
              v-model.trim="payTypeName"
            />
          </div>
          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              @click="cancelPayType"
              class="footer-button"
            ></bib-button>
            <bib-button
              label="Add"
              variant="primary-24"
              class="ml-auto footer-button"
              :disabled="!payTypeName"
              @click="addPayType"
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
      isModalVisible: false,
      tableFields: TABLE_HEAD.tHeadPayPlans,
      payTypeName: "",
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
    addPayTypes() {
      this.isModalVisible = !this.isModalVisible;
    },
    handleSortBy() {
      console.log("Sort By clicked!");
    },
    cancelPayType() {
      this.payTypeName = "";
      this.isModalVisible = false;
    },
    addPayType() {
      const newPayType = {
        id: this.generateUniqueId(),
        employeeid: Math.floor(Math.random() * 100) + 1,
        payType: this.payTypeName,
        createdAt: new Date().toISOString(),
      };

      PAY_DUMMY_REQUESTS_PAYTYPE.requests.push(newPayType);

      this.payTypeName = "";
      this.isModalVisible = false;
    },
    generateUniqueId() {
      const existingIds = PAY_DUMMY_REQUESTS_PAYTYPE.requests.map(
        (req) => req.id
      );
      return Math.max(...existingIds) + 1;
    },
  },
};
</script>
