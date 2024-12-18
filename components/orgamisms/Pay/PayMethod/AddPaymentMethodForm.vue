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
        type="number"
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
      maxlength="5"
      @input="formatExpiryDate"
    />

      <bib-input
        type="number"
        name="cvv"
        placeholder="***"
        label="CVV/CVC"
        class="input-wrapper"
        required
        :maxlength="3"
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
import {STATES} from '../../../../utils/constant/Constant';

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
      states:STATES,
      localForm: { ...this.modelValue },
    };
  },
  watch: {
  localForm: {
    deep: true,
    handler(newVal) {
      console.log("Form data === ", newVal);
      this.$emit("update:modelValue", newVal);
    },
  } 
},
  computed: {
    filteredStates() {
      // Filter states based on the selected country code
      console.log("Computed run stattes -- ")
     const st = this.states.filter(
        (state) => state.code === this.localForm.country
      );

      console.log("Count --- ",this.localForm.country);
      console.log("St --- ",st);

      return st;
    }
  },

  methods: {
    validateExpiryDate() {
  // Remove all non-digits
  let input = this.localForm.expiryDate.replace(/\D/g, "");

  // Limit input to a maximum of 4 digits
  if (input.length > 4) {
    input = input.slice(0, 4);
  }

  // Ensure the first two digits represent a valid month (01-12)
  if (input.length >= 2) {
    const month = parseInt(input.slice(0, 2), 10);
    if (month < 1) {
      input = "01" + input.slice(2); // Default to '01' if less than 1
    } else if (month > 12) {
      input = "12" + input.slice(2); // Cap at '12' if greater than 12
    }
  }

  

  // Format as MM/YY only if input has at least 3 digits
  if (input.length > 2) {
    input = input.slice(0, 2) + "/" + input.slice(2);
  }

  // Ensure the formatted value does not exceed 5 characters (MM/YY)
  this.localForm.expiryDate = input.slice(0, 5);
},

formatExpiryDate(event) {
      let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters

      if (value.length > 2) {
        // Insert a '/' after the first two digits
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }

      // Update the input value
      this.localForm.expiryDate = value;
    },

    // Validate CVV/CVC input
    validateCVV() {
      let input = this.localForm.cvv.replace(/\D/g, ""); // Remove non-digits
      if (input.length > 4) input = input.slice(0, 4); // Limit to 4 digits
      this.localForm.cvv = input;
    },

  },

  mounted(){
    console.log("States --- ", this.states);
  }
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
