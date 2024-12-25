<template>
  <div class="add-payment-method-form scrollable-container">
    <div class="pb-1 input-wrapper">
      <form-input
        type="text"
        label="Payment method name"
        placeholder="Type payment method name"
        field-key="paymentMethodName"
        class="input-wrapper"
        :value="creditCardFormData?.paymentMethodName"
      ></form-input>
    </div>

    <div class="pb-1">
      <div class="mb-2 pb-1 bottom_border_wrapper">
        <div class="section-label" :class="isLightThemeCheck ? 'text-dark': 'text-light'">Card information</div>
      </div>

      <form-input
        type="number"
        name="cardNumber"
        label="Card Number"
        placeholder="Enter your card number"
        field-key="cardNumber"
        class="input-wrapper"
        :value="creditCardFormData?.cardNumber"
      ></form-input>
    </div>

    <div class="pb-1">
      <form-input
        type="text"
        name="cardholderName"
        placeholder="Enter the cardholder name"
        label="Cardholder name"
        field-key="cardholderName"
        :value="creditCardFormData?.cardholderName"
        class="input-wrapper"
      ></form-input>
    </div>

    <div class="pb-1 d-flex justify-between">
      <form-input
        type="text"
        name="expiryDate"
        placeholder="MM/YY"
        label="Expiry date"
        field-key="expiryDate"
        :value="creditCardFormData?.expiryDate"
        :maxlength="5"
        class="pr-1 input-wrapper"
      ></form-input>

      <form-input
        type="number"
        name="cvv"
        placeholder="***"
        label="CVV/CVC"
        field-key="cvv"
        class="input-wrapper"
        :value="creditCardFormData?.cvv"
        :maxlength="3"
      ></form-input>
    </div>

    <div class="pb-1">
      <div class="pb-1 bottom_border_wrapper">
        <div class="section-label" :class="isLightThemeCheck ? 'text-dark': 'text-light'">Billing address</div>
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
        :value="creditCardFormData?.country"
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
        :value="creditCardFormData?.address1"
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
        :value="creditCardFormData?.address2"
      ></form-input>
    </div>

    <div class="d-flex align-center justify-between">
      <form-input
        type="text"
        name="city"
        placeholder="Enter city"
        label="City"
        field-key="city"
        class="pr-1 input-wrapper"
        :value="creditCardFormData?.city"
      ></form-input>
      <form-input
        name="state"
        label="State/Province"
        :options="filteredStates"
        type="select"
        placeholder="Select state/province"
        field-key="state"
        class="input-wrapper"
        :value="creditCardFormData?.state"
      ></form-input>

      <form-input
        type="text"
        name="postalCode"
        placeholder="Enter ZIP/Postal code"
        label="ZIP/Postal code"
        field-key="postalCode"
        class="pl-1 input-wrapper"
        :value="creditCardFormData?.postalCode"
      ></form-input>
    </div>
  </div>
</template>

<script>
import countries from "@/utils/constant/countries";
import { STATES } from "../../../../utils/constant/Constant";

export default {
  name: "AddPaymentMethodForm",
  props: {
    creditCardFormData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countries,
      states: STATES,
    };
  },
  computed: {
    filteredStates() {
      const states = this.states.filter(
        (state) => state.code === this.creditCardFormData?.country
      );
      states.unshift({ label: "Select...", value: "" });
      return states;
    },
  },
};
</script>

<style>
.input-wrapper label {
  padding-bottom: 0px !important;
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
</style>
