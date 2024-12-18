<template>
  <div class="add-payment-method-form scrollable-container">
    <!-- Payment Method Name -->
    <div class="pb-1 input-wrapper">
      <bib-input
        type="text"
        name="paymentMethodName"
        placeholder="Type your name"
        label="Payment Method Name"
        required
        v-model="localForm.paymentMethodName"
      />
    </div>

    <!-- Account Information -->
    <div>
      <div class="mb-2 pb-1 bottom_border_wrapper">
        <div class="section-label text-light">Account Information</div>
      </div>
    </div>

    <!-- Country Selection -->
    <div class="pb-1">
      <bib-input
        name="country"
        label="Country"
        :options="countries"
        placeholder="Select your country"
        class="input-wrapper"
        required
        type="select"
        v-model="localForm.country"
      />
    </div>

    <!-- Bank Name -->
    <bib-input
      type="text"
      name="bankName"
      placeholder="Enter your bank name"
      class="input-wrapper pb-1"
      label="Bank Name"
      required
      v-model="localForm.bankName"
    />

    <!-- Account Type and Currency -->
    <div class="row w-100 pb-1 d-flex justify-between">
      <bib-input
        name="accountType"
        label="Account Type"
        :options="accountTypesList"
        placeholder="Select Account Type"
        required
        class="input-wrapper flex-item"
        type="select"
        v-model="localForm.accountType"
      />
      <bib-input
        name="accountCurrency"
        label="Account Currency"
        :options="accountCurrencyList"
        placeholder="Select Currency"
        class="input-wrapper flex-item"
        required
        type="select"
        v-model="localForm.accountCurrency"
      />
    </div>

    <!-- Routing, Account, and Branch Numbers -->
    <div class="pb-1 d-flex justify-between">
      <bib-input
        type="number"
        name="routingNumber"
        placeholder="Enter routing number"
        label="Routing Number"
        class="pr-1 input-wrapper"
        required
        v-model="localForm.routingNumber"
      />
      <bib-input
        type="number"
        name="accountNumber"
        placeholder="Enter account number"
        label="Account Number"
        class="pr-1 input-wrapper"
        required
        v-model="localForm.accountNumber"
      />
      <bib-input
        type="number"
        name="branchNumber"
        placeholder="Enter branch number"
        label="Branch Number"
        class="input-wrapper"
        required
        v-model="localForm.branchNumber"
      />
    </div>

    <!-- Billing Address Section -->
    <div class="pb-1">
      <div class="mb-2 pb-1 bottom_border_wrapper">
        <div class="section-label text-light">Billing Address</div>
      </div>
    </div>

    <!-- Address Fields -->
    <div class="pb-1">
      <bib-input
        type="text"
        name="address1"
        placeholder="Enter address line 1"
        label="Address 1"
        required
        class="input-wrapper"
        v-model="localForm.address1"
      />
    </div>

    <div class="pb-1">
      <bib-input
        type="text"
        name="address2"
        placeholder="Enter address line 2 (optional)"
        label="Address 2"
        class="input-wrapper"
        v-model="localForm.address2"
      />
    </div>

    <!-- City, State, and Postal Code -->
    <div class="pb-1 d-flex justify-between">
      <bib-input
        type="text"
        name="city"
        placeholder="Enter city"
        label="City"
        class="pr-1 input-wrapper"
        required
        v-model="localForm.city"
      />
      <bib-input
        name="state"
        label="State/Province"
        :options="filteredStates"
        placeholder="Select state/province"
        class="pl-1 pr-1 input-wrapper"
        type="select"
        required
        v-model="localForm.state"
      />
      <bib-input
        type="text"
        name="postalCode"
        placeholder="Enter ZIP/Postal code"
        label="ZIP/Postal Code"
        class="pl-1 input-wrapper"
        required
        v-model="localForm.postalCode"
      />
    </div>
  </div>
</template>

<script>
import countries from "@/utils/constant/countries";
import {STATES} from '../../../../utils/constant/Constant';

export default {
  name: "AddBankPaymentMethodForm",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countries,
      localForm: { ...this.modelValue },
      accountTypesList: [
        { value: "Current", label: "Current" },
        { value: "Saving", label: "Saving" },
      ],
      accountCurrencyList: [
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
      ],
      states:STATES,
    };
  },
  watch: {
    localForm: {
      deep: true,
      handler(newVal) {
        console.log("Updated Form Data: ", newVal);
        this.$emit("update:modelValue", newVal);
      },
    },
  },
  computed: {
    filteredStates() { 
      return this.states.filter(
        (state) => state.code === this.localForm.country
      );
    }
  },
   
};
</script>

<style>
.input-wrapper label {
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 14.52px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--text-text-secondary, #8d8d8f);
}
</style>

<style scoped>
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
