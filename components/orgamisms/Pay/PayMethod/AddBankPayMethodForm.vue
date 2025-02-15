<template>
  <div class="add-payment-method-form scrollable-container">
    <!-- Payment Method Name -->
    <div class="pb-1 input-wrapper">
      <form-input
        type="text"
        label="Payment method name"
        placeholder="Type payment method name"
        field-key="paymentMethodName"
        :value="bankAccountFields?.paymentMethodName"
      ></form-input>
    </div>

    <!-- Account Information -->
    <div>
      <div class="mb-2 pb-1 bottom_border_wrapper">
        <div class="section-label" :class="isLightThemeCheck ? 'text-dark': 'text-light'">Account Information</div>
      </div>
    </div>

    <!-- Country Selection -->
    <div class="pb-1">
      <form-input
        type="select"
        name="bankCountryId"
        label="Country"
        :options="countries"
        placeholder="Select your country"
        class="input-wrapper"
        field-key="bankCountryId"
        :value="bankAccountFields?.bankCountryId"
      ></form-input>
    </div>

    <!-- Bank Name -->

    <form-input
      type="text"
      name="bankName"
      placeholder="Enter your bank name"
      class="input-wrapper pb-1"
      label="Bank Name"
      field-key="bankName"
      :value="bankAccountFields?.bankName"
    ></form-input>

    <!-- Account Type and Currency -->
    <div class="row w-100 pb-1 d-flex justify-between">
      <form-input
        type="select"
        name="accountType"
        label="Account Type"
        :options="accountTypesList"
        placeholder="Select Account Type"
        class="input-wrapper flex-item"
        field-key="accountType"
        :value="bankAccountFields?.accountType"
      ></form-input>

      <form-input
        type="select"
        name="accountCurrency"
        label="Account Currency"
        :options="accountCurrencyList"
        placeholder="Select Currency"
        class="input-wrapper flex-item"
        field-key="accountCurrency"
        :value="bankAccountFields?.accountCurrency"
      ></form-input>
    </div>

    <!-- Routing, Account, and Branch Numbers -->
    <div class="pb-1 d-flex justify-between">
      <form-input
        type="number"
        name="routingNumber"
        placeholder="Enter routing number"
        label="Routing Number"
        class="pr-1 input-wrapper"
        field-key="routingNumber"
        :value="bankAccountFields?.routingNumber"
      ></form-input>

      <form-input
        type="number"
        name="accountNumber"
        placeholder="Enter account number"
        label="Account Number"
        class="pr-1 input-wrapper"
        field-key="accountNumber"
        :value="bankAccountFields?.accountNumber"
      ></form-input>

      <form-input
        type="number"
        name="branchNumber"
        placeholder="Enter branch number"
        label="Branch Number"
        class="input-wrapper"
        field-key="branchNumber"
        :value="bankAccountFields?.branchNumber"
      ></form-input>
    </div>

    <!-- Billing Address Section -->
    <div class="pb-1">
      <div class="pb-1 bottom_border_wrapper">
        <div class="section-label" :class="isLightThemeCheck ? 'text-dark': 'text-light'">Billing Address</div>
      </div>
    </div>

    <div class="pb-1">
      <form-input
        name="country"
        label="Country"
        class="input-wrapper"
        :options="countries"
        type="select"
        placeholder="Select your country"
        required
        field-key="country"
        :value="bankAccountFields?.country"
      ></form-input>
    </div>

    <div class="pb-1">
      <form-input
        type="text"
        name="address1"
        placeholder="Enter address line 1"
        class="input-wrapper"
        label="Address 1"
        field-key="address1"
        :value="bankAccountFields?.address1"
      ></form-input>
    </div>

    <div class="pb-1">
      <form-input
        type="text"
        name="address2"
        class="input-wrapper"
        placeholder="Enter address line 2 (optional)"
        label="Address 2"
        field-key="address2"
        :value="bankAccountFields?.address2"
      ></form-input>
    </div>

    <div class="pb-1 d-flex align-center justify-between">
      <form-input
        type="text"
        name="city"
        placeholder="Enter city"
        label="City"
        field-key="city"
        class="pr-1 input-wrapper"
        :value="bankAccountFields?.city"
      ></form-input>

      <!-- Updated state input handling -->
      <template v-if="bankAccountFields?.country === 'United States' || bankAccountFields?.country === 'Canada'">
        <form-input
          name="state"
          label="State/Province"
          :options="filteredStates"
          type="select"
          placeholder="Select state/province"
          field-key="state"
          class="input-wrapper"
          :value="bankAccountFields?.state"
        ></form-input>
      </template>
      <template v-else>
        <form-input
          type="text"
          name="state"
          label="State/Province"
          field-key="state"
          class="input-wrapper"
          placeholder="Enter state/province"
          :value="bankAccountFields?.state"
        ></form-input>
      </template>
      <!-- End of updated state input handling -->

      <form-input
        type="text"
        name="postalCode"
        placeholder="Enter ZIP/Postal code"
        label="ZIP/Postal code"
        field-key="postalCode"
        class="pl-1 input-wrapper"
        :value="bankAccountFields?.postalCode"
      ></form-input>
    </div>
  </div>
</template>

<script>
import countries from "@/utils/constant/countries";
import { STATES } from "../../../../utils/constant/Constant";

export default {
  name: "AddBankPaymentMethodForm",
  props: {
    bankAccountFields: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countries,
      accountTypesList: [
        { value: "Current", label: "Current" },
        { value: "Saving", label: "Saving" },
      ],
      accountCurrencyList: [
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
      ],
      states: STATES,
    };
  },
  mounted() {
    if(this.bankAccountFields?.bankCountryId) {
      this.bankAccountFields.bankCountryId = this.getSelectedCountry();
    }
  },
  computed: {
    filteredStates() {
      const states = this.states.filter(
        (state) => state.code === this.bankAccountFields.country
      );

      states.unshift({ label: "Select...", value: "" });

      return states;
    },
  },
  methods: {
    getSelectedCountry() {
      const country = this.countries.find(
        country => country.id === this.bankAccountFields?.bankCountryId
      );
      return country?.value || '';
    }
  },
  watch: {
    'bankAccountFields.country'(newCountry) {
      this.bankAccountFields.state = ''; // Clear the state value
    },
  },
};
</script>

<style scoped>
.input-wrapper label {
  margin-bottom: 0px !important;
  font-family: Inter !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  line-height: 14.52px !important;
  text-align: left !important;
  text-underline-position: from-font !important;
  text-decoration-skip-ink: none !important;
  color: var(--text-text-secondary, #8d8d8f) !important;
}
.scrollable-container {
  max-height: 50vh;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 4px;
}
.row {
  display: flex;
  gap: 1rem;
}

.flex-item {
  padding-left: 7px;
}
</style>
