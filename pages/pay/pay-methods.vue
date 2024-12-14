<template>
  <div id="pay-plan">
    <div>
      <!-- Header with Action Button -->
      <div class="d-flex justify-between">
        <div>
          <action-button-header :primaryButton="{
            label: 'Pay Methods',
            icon: 'add',
            variant: 'primary',
            onClick: addPayTypes,
          }" />
        </div>
        <div class="d-flex">
          <!-- Filter Buttons -->
          <filter-button :primaryButton="{
            filterLabel: 'Show',
            label: 'All',
            onClick: handleShowAll,
          }" />
          <filter-button :primaryButton="{
            filterLabel: 'Group by',
            label: 'Date',
            onClick: handleGroupBy,
          }" />
          <filter-button :primaryButton="{
            filterLabel: 'Sort by',
            label: 'Status',
            onClick: handleSortBy,
          }" />
        </div>
      </div>

      <!-- List Pay Plans -->
      <div>
        <list-pay-method :payMethodList="requestListData" :tableFields="tableFields" :key="employeeList"
          @action-selected="handleActionFromChild" />

        <!-- Conditional Modals --> 
        <pay-method-modal v-if="isModalVisible" :payMethodsModal="isModalVisible" modalTitle="Pay Methods"
          @close="addPayTypes">
          <div class="d-flex d-align justify-between">
            <filter-button :primaryButton="{
              label: 'Credit card',
              icon: 'add',
              variant: isLightThemeCheck ? 'light' : 'secondary',
              class: 'increase-button-size',
              onClick: () => openPayMethodModal('credit_card'),
            }" />
            <filter-button :primaryButton="{
              label: 'Bank account',
              variant: isLightThemeCheck ? 'light' : 'secondary',
              icon: 'add',
              class: 'increase-button-size',
              onClick: () => openPayMethodModal('bank_account'),
            }" />
            <filter-button :primaryButton="{
              label: 'PayPal',
              variant: isLightThemeCheck ? 'light' : 'secondary',
              icon: 'add',
              class: 'increase-button-size',
              onClick: () => openPayMethodModal('PayPal'),
            }" />
          </div>
        </pay-method-modal>

        <!-- Credit/Debit Card Modal -->
        <pay-method-modal v-if="selectedModal === 'credit_card'" :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`" @close="closeModal" headerIcon="arrow-left">
          <add-payment-method-form v-model="creditCardFormData" @update:modelValue="creditCardFormData = $event" />
          <template #footer>
            <bib-button label="Cancel" :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button"></bib-button>
            <bib-button label="Save" variant="primary-24" class="ml-auto footer-button" @click="submitForm"></bib-button>
          </template>
        </pay-method-modal>

        <!-- Bank Account Modal -->
        <pay-method-modal v-if="selectedModal === 'bank_account' && bankAccountFormData"  :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`" @close="closeModal" headerIcon="arrow-left">
          <add-bank-pay-method-form v-model="bankAccountFormData" @update:modelValue="bankAccountFormData = $event" />

          <template #footer>
            <bib-button label="Cancel" :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button"></bib-button>
            <bib-button label="Save" variant="primary-24" class="ml-auto footer-button" @click="submitForm"></bib-button>
          </template>
        </pay-method-modal>

        <!-- PayPal Modal -->
        <pay-method-modal v-if="selectedModal === 'PayPal'" :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`" @close="closeModal" headerIcon="arrow-left">
          <add-paypal-payment-method-form v-model="formData" @update:modelValue="formData = $event" />
        </pay-method-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../utils/constant/pay/PayConstant";
import { getPayMethods, createPayMethod, getPayMethodById } from "../../utils/functions/api_call/pay/pay-method";
import moment from 'moment';

export default {
  data() {
    return {
      id: null,
      requestListData: [],
      loading: true,
      fromDate: "",
      toDate: "",
      isModalVisible: false,
      isModalVisibleAddPayMethod: false,
      clickItemTitle: null,
      selectedModal: null,
      tableFields: TABLE_HEAD.tHeadPayPlans,

      // Form data for credit card and bank account
      creditCardFormData: this.initCreditCardForm(),
      bankAccountFormData: this.initBankAccountForm(),
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
  },
  mounted() {
    this.getPayMethods();
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

    // Submit the form data to create a payment method
    async submitForm() {
      const formData = this.selectedModal === "credit_card" ? this.creditCardFormData : this.bankAccountFormData;

      if (!formData.paymentMethodName) {
        console.error("No payment method selected");
        return;
      }

      console.log("Form Data ---- ", formData);


      const finalObject = this.buildPayMethodObject(formData);

      try {
        const response = await createPayMethod(finalObject);
        console.log("Pay method created:", response);

        this.requestListData.push(this.extractPayMethodDetails(response));
        console.log("New pay method added:", response);
      } catch (error) {
        console.error("Error creating payment method:", error);
      } finally {
        this.closeModal();
      }
    },

    // Generate a unique ID based on the current timestamp
    generateUniqueId() {
      return Date.now();
    },

    // Fetch existing pay methods
    async getPayMethods() {
      try {
        this.requestListData = await getPayMethods();
      } catch (error) {
        console.error("Error fetching pay methods:", error);
      }
    },

    // Calculate the expiry date of the credit card
    calculateExpiryDate(expiryDate) {
      if (expiryDate) {
        const [month, year] = expiryDate.split("/");
        const fullYear = `20${year}`;
        return moment(`${fullYear}-${month}`, "YYYY-MM").endOf("month").toISOString();
      }
      return "";
    },

    // Helper function to initialize credit card form data
    initCreditCardForm() {
      return {
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
      };
    },

    // Helper function to initialize bank account form data
    initBankAccountForm() {
      return {
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
      };
    },

    // Build the final object for the payment method
    buildPayMethodObject(formData) {
      return {
        name: formData.paymentMethodName,
        type: this.selectedModal,
        billing: this.buildBillingAddress(formData),
        bankCountryId: 12,
        bankName: formData.bankName || "",
        bankAccountHolderName: formData.accountHolderName || "",
        bankAccountType: formData.accountType || "",
        bankAccountCurrency: formData.accountCurrency || "",
        bankRoutingNumber: formData.routingNumber || "",
        bankAccountNumber: formData.accountNumber || "",
        bankBranchNumber: formData.branchNumber || "",
        cardNumber: formData.cardNumber || "",
        cardHolderName: formData.cardholderName || "",
        expiryDate: this.calculateExpiryDate(formData.expiryDate),
        cvv: formData.cvv || "",
      };
    },

    // Build the billing address object
    buildBillingAddress(formData) {
      return {
        addressLine1: formData.address1 || "",
        addressLine2: formData.address2 || "",
        city: formData.city || "",
        country: formData.country || "",
        postalCode: formData.postalCode || "",
        state: formData.state || "",
      };
    },

    // Extract necessary fields from the API response
    extractPayMethodDetails(response) {
      return {
        name: response.name,
        type: response.type,
        id: response.id,
        createdAt: response.createdAt,
      };
    },
    async handleActionFromChild({ action, id }) {
      if (action === "edit") {
        const payMethod = await getPayMethodById(id);
        if (!payMethod) {
          console.error("Pay method not found");
          return;
        }

        // Check the type and open the corresponding modal
        if (payMethod.type === "credit_card") {
          this.openCreditCardModal(payMethod);
        } else if (payMethod.type === "bank_account") {
          this.openBankAccountModal(payMethod);
        } else {
          console.error("Unknown pay method type");
        }
      } else if (action === "delete") {
        this.deletePayMethod(id);
      }
    },

    editPayMethod(rowIndex) {
      console.log("Edit action for row:", rowIndex);
      // Implement the edit logic here
    },
    deletePayMethod(rowIndex) {
      console.log("Delete action for row:", rowIndex);
      // Implement the delete logic here
    },

    openCreditCardModal(payMethod) {
      this.creditCardFormData = this.mapCreditCardData(payMethod);
      this.selectedModal = "credit_card";
      this.isModalVisibleAddPayMethod = true;
      this.clickItemTitle = "Edit Credit Card";
    },

    openBankAccountModal(payMethod) {
      this.bankAccountFormData = this.mapBankAccountData(payMethod);
      console.log("Form dat bank ",this.bankAccountFormData);
      this.selectedModal = "bank_account";
      this.isModalVisibleAddPayMethod = true;
      this.clickItemTitle = "Edit Bank Account";
    },

    mapCreditCardData(payMethod) {
      return {
        paymentMethodName: payMethod.name || "",
        cardNumber: payMethod.cardNumber || "",
        cardholderName: payMethod.cardHolderName || "",
        expiryDate: this.formatExpiryDate(payMethod.expiryDate) || "",
        cvv: payMethod.cvv || "",
        country: payMethod.billing.country || "",
        address1: payMethod.billing.addressLine1 || "",
        address2: payMethod.billing.addressLine2 || "",
        city: payMethod.billing.city || "",
        state: payMethod.billing.state || "",
        postalCode: payMethod.billing.postalCode || "",
      };
    },

    mapBankAccountData(payMethod) {
      return {
        paymentMethodName: payMethod.name || "",
        country: payMethod.billing.country || "",
        bankName: payMethod.bankName || "",
        accountType: payMethod.bankAccountType || "",
        accountCurrency: payMethod.bankAccountCurrency || "",
        routingNumber: payMethod.bankRoutingNumber || "",
        accountNumber: payMethod.bankAccountNumber || "",
        branchNumber: payMethod.bankBranchNumber || "",
        address1: payMethod.billing.addressLine1 || "",
        address2: payMethod.billing.addressLine2 || "",
        city: payMethod.billing.city || "",
        state: payMethod.billing.state || "",
        postalCode: payMethod.billing.postalCode || "",
      };
    },

    formatExpiryDate(expiryDate) {
      if (expiryDate) {
        return moment(expiryDate).format("MM/YY");
      }
      return "";
    },

  },
};
</script>
