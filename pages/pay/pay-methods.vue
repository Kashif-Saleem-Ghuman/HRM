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
        <list-pay-method :payMethodList="requestListData" :tableFields="tableFields"
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
        <pay-method-modal v-if="selectedModal" :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`" @close="closeModal" headerIcon="arrow-left">

          <add-payment-method-form v-if="selectedModal === 'credit_card'" v-model="creditCardFormData" :modelValue.sync="creditCardFormData"/>
          <add-bank-pay-method-form v-if="selectedModal === 'bank_account'" v-model="bankAccountFormData" :modelValue.sync="bankAccountFormData"/>
          <add-paypal-payment-method-form v-if="selectedModal === 'PayPal'" v-model="formData" :modelValue.sync="formData"/>
          <template #footer>
            <bib-button label="Cancel" :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button" @click="closeModal"></bib-button>
            <bib-button :label="selectedAction === 'edit' ? 'Update' : 'Save'" variant="primary-24" class="ml-auto footer-button" @click="submitForm"></bib-button>
          </template>
        </pay-method-modal>
        <!-- Delete Modal -->
        <pay-method-modal v-if="selectedModal == 'delete'" :payMethodsModal="isModalVisibleAddPayMethod"
          modalTitle="" @close="closeModal" :headerIcon="selectedAction !== 'edit' && selectedAction !== 'delete' ? 'arrow-left' : ''">
          <div class="section-label ml-1">Do you really want to delete pay method?</div>
          <template #footer>
            <bib-button @click="closeModal" label="Cancel" :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button"></bib-button>
            <bib-button label="Delete" variant="danger" class="ml-auto footer-button" @click="deletePayMethod"></bib-button>
          </template>
        </pay-method-modal>

      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../utils/constant/pay/PayConstant";
import { getPayMethods, createPayMethod, getPayMethodById, updatePayMethod, deletePayMethod } from "../../utils/functions/api_call/pay/pay-method";
import moment from 'moment';

export default {
  data() {
    return {
      id: null,
      payMethodId: null,
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
      employeeList: [],

      selectedAction: null,
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
      this.selectedAction = 'create';
      this.isModalVisible = !this.isModalVisible;
    },
    closeModal() {
      this.isModalVisibleAddPayMethod = false;
      this.selectedModal = null;
      this.resetFormData();
      this.selectedAction = null;
    },

    // New method to reset form data to default values
    resetFormData() {
      this.creditCardFormData = this.initCreditCardForm();
      this.bankAccountFormData = this.initBankAccountForm();
      this.selectedAction = null;
    },

    // Submit the form data to create a payment method
    async submitForm() {
      const formData = this.selectedModal === "credit_card" ? this.creditCardFormData : this.bankAccountFormData;

      if (!formData.paymentMethodName) {
        console.error("No payment method selected");
        return;
      }
      const finalObject = this.buildPayMethodObject(formData);

      try {
        let response;
        if(this.selectedAction === 'create'){
          response = await createPayMethod(finalObject);
        }else if(this.selectedAction === 'edit'){
          await updatePayMethod(this.payMethodId, finalObject);
          this.getPayMethods();
        }

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
      console.log("Action from child ---- ", action);
      this.payMethodId = id;
      this.selectedAction = action;
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
        this.selectedModal = "delete";
        this.isModalVisibleAddPayMethod = true;
        this.clickItemTitle = "Delete Pay Method";
      }
    },

    async deletePayMethod(){
      await deletePayMethod(this.payMethodId);
      this.requestListData = this.requestListData.filter(item => item.id !== this.payMethodId);
      this.closeModal();
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

    handleShowAll() {
      // Implement the logic for showing all pay methods
      console.log("Showing all pay methods");
    },
    
    handleGroupBy() {
      // Implement the logic for grouping pay methods
      console.log("Grouping pay methods");
    },
    
    handleSortBy() {
      // Implement the logic for sorting pay methods
      console.log("Sorting pay methods");
    },

  },
};
</script>
