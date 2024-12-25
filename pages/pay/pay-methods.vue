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
        <!-- <div class="d-flex">

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
        </div> -->
      </div>

      <!-- List Pay Plans -->
      <div>
        <list-pay-method
          :payMethodList="requestListData"
          :tableFields="tableFields"
          @action-selected="handleActionFromChild"
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
                onClick: () => openPayMethodModal('credit_card'),
              }"
            />
            <filter-button
              :primaryButton="{
                label: 'Bank account',
                variant: isLightThemeCheck ? 'light' : 'secondary',
                icon: 'add',
                class: 'increase-button-size',
                onClick: () => openPayMethodModal('bank_account'),
              }"
            />
            <!-- <filter-button :primaryButton="{
              label: 'PayPal',
              variant: isLightThemeCheck ? 'light' : 'secondary',
              icon: 'add',
              class: 'increase-button-size',
              onClick: () => openPayMethodModal('PayPal'),
            }" /> -->
          </div>
        </pay-method-modal>

        <!-- Credit/Debit Card Modal -->
        <pay-method-modal
          v-if="isOpenCreateEditModal"
          :payMethodsModal="isModalVisibleAddPayMethod"
          :modalTitle="`Pay method / ${clickItemTitle}`"
          @close="closeModal"
          headerIcon="arrow-left"
          @back-button-click="handleBackButtonClick"
        >
          <!-- credit card -->
          <form-with-validations
            v-if="selectedModal === 'credit_card'"
            :fields="creditCardFields"
            :form="creditCardFormData"
            :submit-fn="submitForm"
            :update-form.sync="creditCardFormData"
            :isCreateForm="true"
            ref="formWithValidation"
          >
            <add-payment-method-form :creditCardFormData="creditCardFormData" />
            <template #form-action-buttons></template>
          </form-with-validations>
          <!-- bank account -->
          <form-with-validations
            v-else
            :fields="bankAccountFields"
            :form="bankAccountFormData"
            :submit-fn="submitForm"
            :update-form.sync="bankAccountFormData"
            :isCreateForm="true"
            ref="formWithValidation"
          >
            <add-bank-pay-method-form
              :bankAccountFields="bankAccountFormData"
            />
            <template #form-action-buttons></template>
          </form-with-validations>
          <template #footer>
            <bib-button
              label="Cancel"
              :variant="isLightThemeCheck ? 'light' : 'secondary'"
              class="footer-button"
              @click="closeModal"
            ></bib-button>
            <bib-button
              :label="selectedAction === 'edit' ? 'Update' : 'Save'"
              variant="primary-24"
              class="ml-auto footer-button"
              @click="validateForm"
            ></bib-button>
          </template>
        </pay-method-modal>
        <!-- Delete Modal -->
        <confirmation-modal
          v-if="selectedModal == 'delete'"
          title="Delete Confirmation"
          confirmationMessage="Are you sure you want to delete this item?"
          :confirmastionMessageModal="true"
          :loader="false"
          @close="closeModal"
          @on-click="deletePayMethod"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../utils/constant/pay/PayConstant";
import {
  getPayMethods,
  createPayMethod,
  getPayMethodById,
  updatePayMethod,
  deletePayMethod,
} from "../../utils/functions/api_call/pay/pay-method";
import countries from "../../utils/constant/countries";

import paymentMethodMainFields from "@/components/orgamisms/Pay/forms/payment-method-main-form-fields.js";
import creditCardFields from "@/components/orgamisms/Pay/forms/credit-card-form-fields.js";
import billingAddressFields from "@/components/orgamisms/Pay/forms/billing-address-form-fields.js";
import accountFields from "@/components/orgamisms/Pay/forms/account-form-fields.js";

import moment from "moment";

export default {
  data() {
    return {
      countries,
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

      creditCardFields: {
        ...paymentMethodMainFields,
        ...creditCardFields,
        ...billingAddressFields,
      },

      bankAccountFields: {
        ...paymentMethodMainFields,
        ...accountFields,
        ...billingAddressFields,
      },
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
    fields() {
      if (this.selectedModal === "credit_card") {
        return this.creditCardFields;
      }
      return this.bankAccountFields;
    },
    isOpenCreateEditModal() {
      return (
        this.selectedModal === "credit_card" ||
        this.selectedModal === "bank_account"
      );
    },
  },
  mounted() {
    this.getPayMethods();
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    openPayMethodModal(type) {
      this.selectedModal = type;
      this.isModalVisibleAddPayMethod = true;
      this.isModalVisible = false;
      this.clickItemTitle = this.formatTitle(type);
    },

    formatTitle(type) {
      return type
        .split("_") // Split by underscores
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join the words with a space;
    },
    addPayTypes() {
      this.selectedAction = "create";
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
    validateForm() {
      this.$refs.formWithValidation.handleSubmit();
    },

    // Submit the form data to create a payment method
    async submitForm() {
      const formData =
        this.selectedModal === "credit_card"
          ? this.creditCardFormData
          : this.bankAccountFormData;

      if (!formData.paymentMethodName) {
        this.$openPopupNotification({
          text: "Please select payment method",
          variant: "danger",
        })
        return;
      }
    
      const finalObject = this.buildPayMethodObject(formData);

      try {
        if (this.selectedAction === "create") {
          const response = await createPayMethod(finalObject);
          this.requestListData = [...this.requestListData, this.extractPayMethodDetails(response)];
          this.$openPopupNotification({
            text: "Pay method created successfully",
            variant: "success",
          });
        } else if (this.selectedAction === "edit") {
          await updatePayMethod(this.payMethodId, finalObject);
          await this.getPayMethods(); // Refresh the list
          this.$openPopupNotification({
            text: "Pay method updated successfully",
            variant: "success",
          });
        }
        
        this.closeModal(); // Move closeModal here, inside try block
      } catch (error) {
        console.log("Error creating payment method:", error);
        this.$openPopupNotification({
          text: "Error processing payment method",
          variant: "danger",
        });
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
        return {
          expiryYear: Number(year),
          expiryMonth: Number(month)
        }
      }
      return {};
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
        accountType: "Current",
        accountCurrency: "USD",
        routingNumber: "",
        accountNumber: "",
        branchNumber: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        bankCountryId: "",
      };
    },

    // Build the final object for the payment method
    buildPayMethodObject(formData) {
      const selectedCountry = this.countries.find(
        country => country.value === formData.bankCountryId
      );
      
      return {
        name: formData.paymentMethodName,
        type: this.selectedModal,
        billing: this.buildBillingAddress(formData),
        bankCountryId: selectedCountry?.id || 0,
        bankName: formData.bankName || "",
        bankAccountHolderName: formData.accountHolderName || "",
        bankAccountType: formData.accountType || "",
        bankAccountCurrency: formData.accountCurrency || "",
        bankRoutingNumber: formData.routingNumber || "",
        bankAccountNumber: formData.accountNumber || "",
        bankBranchNumber: formData.branchNumber || "",
        cardNumber: formData.cardNumber || "",
        cardholderName: formData.cardholderName || "",
        cvv: formData.cvv || "",
        ...this.calculateExpiryDate(formData.expiryDate)
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

    async deletePayMethod() {
      await deletePayMethod(this.payMethodId);
      this.requestListData = this.requestListData.filter(
        (item) => item.id !== this.payMethodId
      );
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
      console.log("Form dat bank ", this.bankAccountFormData);
      this.selectedModal = "bank_account";
      this.isModalVisibleAddPayMethod = true;
      this.clickItemTitle = "Edit Bank Account";
    },

    mapCreditCardData(payMethod) {
      return {
        paymentMethodName: payMethod.name || "",
        cardNumber: payMethod.cardNumber || "",
        cardholderName: payMethod.cardholderName || "",
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
        bankCountryId: payMethod?.bankCountryId || "",
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

    handleBackButtonClick() {
      this.isModalVisibleAddPayMethod = false;
      this.isModalVisible = true;
    },
  },
};
</script>
