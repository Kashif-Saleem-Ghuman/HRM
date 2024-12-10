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

        <!-- Conditional Modals -->
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
                onClick: () => openPayMethodModal('Credit or Debit card'),
              }"
            />
            <filter-button
              :primaryButton="{
                label: 'Bank account',
                variant: isLightThemeCheck ? 'light' : 'secondary',
                icon: 'add',
                class: 'increase-button-size',
                onClick: () => openPayMethodModal('Bank account'),
              }"
            />
            <filter-button
              :primaryButton="{
                label: 'PayPal',
                variant: isLightThemeCheck ? 'light' : 'secondary',
                icon: 'add',
                class: 'increase-button-size',
                onClick: () => openPayMethodModal('PayPal'),
              }"
            />
          </div>
        </pay-method-modal>

        <!-- Credit/Debit Card Modal -->
        <pay-method-modal
          v-if="selectedModal === 'Credit or Debit card'"
          :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`"
          @close="closeModal"
          headerIcon="arrow-left"
        >
          <add-payment-method-form
            v-model="creditCardFormData"
            @update:modelValue="creditCardFormData = $event"
          />
          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button"
            ></bib-button>
            <bib-button
              label="Save"
              variant="primary-24"
              class="ml-auto footer-button"
              @click="submitForm"
            ></bib-button>
          </template>
        </pay-method-modal>

        <!-- Bank Account Modal -->
        <pay-method-modal
          v-if="selectedModal === 'Bank account'"
          :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`"
          @close="closeModal"
          headerIcon="arrow-left"
        >
          <add-bank-pay-method-form
            v-model="bankAccountFormData"
            @update:modelValue="bankAccountFormData = $event"
          />

          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button"
            ></bib-button>
            <bib-button
              label="Save"
              variant="primary-24"
              class="ml-auto footer-button"
              @click="submitForm"
            ></bib-button>
          </template>
        </pay-method-modal>

        <!-- PayPal Modal -->
        <pay-method-modal
          v-if="selectedModal === 'PayPal'"
          :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`"
          @close="closeModal"
          headerIcon="arrow-left"
        >
          <add-paypal-payment-method-form
            v-model="formData"
            @update:modelValue="formData = $event"
          />
        </pay-method-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  PAY_DUMMY_REQUESTS_PAYMETHODS,
  TABLE_HEAD,
} from "../../utils/constant/pay/PayConstant";

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
      selectedModal: null,
      tableFields: TABLE_HEAD.tHeadPayPlans,

      creditCardFormData: {
        paymentMethodName: "",
        cardNumber: "",
        cardholderName: "",
        expiryDate: "",
        cvv: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
      },

      bankAccountFormData: {
        paymentMethodName: "",
        country: "",
        bankName: "",
        accountType: "",
        accountCurrency: "",
        routingNumber: "",
        accountNumber: "",
        branchNumber: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
  },
  methods: {
    openPayMethodModal(type) {
      this.selectedModal = type;
      this.isModalVisibleAddPayMethod = true;
      this.isModalVisible = false;
      this.clickItemTitle = type;
    },
    addPayTypes() {
      this.isModalVisible = !this.isModalVisible;
    },
    closeModal() {
      this.isModalVisibleAddPayMethod = false;
      this.selectedModal = null;
    },
    submitForm() {
      let formData;

      if (this.selectedModal === "Credit or Debit card") {
        formData = this.creditCardFormData;
      } else if (this.selectedModal === "Bank account") {
        formData = this.bankAccountFormData;
      } else {
        console.error("Unknown modal type or no modal is selected");
        return;
      }

      const newRecord = {
        id: this.generateUniqueId(),
        payMethod: `${formData.paymentMethodName} - ${
          formData.cardNumber || formData.accountNumber || ""
        }`,
        payMethodType: this.clickItemTitle,
        createdAt: new Date().toISOString(),
      };

      this.requestListData.push(newRecord);
      this.closeModal();
    },
    generateUniqueId() {
      return Date.now();
    },
  },
};
</script>
