<template>
  <div class="add-payment-method-form scrollable-container">
    <div class="pb-2 input-wrapper">
      <bib-input
        type="text"
        name="paymentMethodName"
        placeholder="Type your name"
        label="Payment method name"
        required
        v-model="localForm.paymentMethodName"
      />
    </div>

    <div class="pb-2">
      <div class="mb-2 pb-1 bottom_border_wrapper">
        <div class="section-label text-light">Card information</div>
      </div>
      <bib-input
        type="text"
        name="cardNumber"
        placeholder="Enter your card number"
        class="input-wrapper"
        label="Card number"
        required
        v-model="localForm.cardNumber"
      />
    </div>

    <div class="pb-2">
      <bib-input
        type="text"
        name="cardholderName"
        placeholder="Enter the cardholder name"
        label="Cardholder name"
        class="input-wrapper"
        required
        v-model="localForm.cardholderName"
      />
    </div>

    <div class="pb-2 d-flex justify-between">
      <bib-input
        type="text"
        name="expiryDate"
        placeholder="MM/YY"
        label="Expiry date"
        class="pr-1 input-wrapper"
        required
        v-model="localForm.expiryDate"
      />
      <bib-input
        type="password"
        name="cvv"
        placeholder="***"
        label="CVV/CVC"
        class="input-wrapper"
        required
        v-model="localForm.cvv"
      />
    </div>

    <div class="pb-2">
      <div class="mb-2 pb-1 bottom_border_wrapper">
        <div class="section-label text-light">Billing address</div>
      </div>
    </div>

    <div class="pb-2">
      <bib-input
        name="country"
        label="Country"
        class="input-wrapper"
        :options="countries"
        placeholder="Select your country"
        required
        type="select"
        v-model="localForm.country"
      />
    </div>

    <div class="pb-2">
      <bib-input
        type="text"
        name="address1"
        placeholder="Enter address line 1"
        class="input-wrapper"
        label="Address 1"
        required
        v-model="localForm.address1"
      />
    </div>

    <div class="pb-2">
      <bib-input
        type="text"
        name="address2"
        class="input-wrapper"
        placeholder="Enter address line 2 (optional)"
        label="Address 2"
        v-model="localForm.address2"
      />
    </div>

    <div class="pb-2 d-flex justify-between">
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
        :options="states"
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
        label="ZIP/Postal code"
        class="pl-1 input-wrapper"
        required
        v-model="localForm.postalCode"
      />
    </div>
  </div>
</template>

<script>
import countries from "@/utils/constant/countries";

export default {
  name: "AddPaymentMethodForm",
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
      states: [
        { value: "Quebec", label: "Quebec" },
        { value: "Ontario", label: "Ontario" },
      ],
    };
  },
  watch: {
    localForm: {
      deep: true,
      handler(newVal) {
        console.log("Form data === ", newVal);
        this.$emit("update:modelValue", newVal);
      },
    },
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
</style>
