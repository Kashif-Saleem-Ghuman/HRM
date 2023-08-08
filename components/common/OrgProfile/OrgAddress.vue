<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Address 1"
          :value="address1"
          placeholder="Address"
          :disabled="inActive"
          @input="$emit('input', $event, 'AddressL1', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Address 2"
          :value="address2"
          placeholder="Address 2"
          :disabled="inActive"
          @input="$emit('input', $event, 'AddressL2'), 'addresses'"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="select"
          label="Country"
          :options="countryOptions"
          :value="country"
          placeholder="Please select country"
          :disabled="inActive"
          @input="$emit('input', $event, 'Country', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4" v-show="stateVisible">
        <bib-input
          type="select"
          label="Province/State"
          :options="stateOptions"
          :value="state"
          placeholder="Please select state"
          :disabled="inActive" 
          @input="$emit('input', $event, 'StateProvince', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        
        <bib-input
          type="text"
          label="City"
          :value="city"
          placeholder="Enter your city"
          :disabled="inActive"
          @input="$emit('input', $event, 'City'), 'addresses'"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Postal Code"
          :value="postalCode"
          placeholder="Postal Code"
          :disabled="inActive"
          @input="$emit('input', $event, 'PostalCode')"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonalInfo",
  props: {
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    country: {
      type: String,
    },
    countryOptions: {
      type: Array,
    },
    stateOptions: {
      type: Array,
    },
    stateVisible: {
      type: Boolean,
    },
    state: {
      type: String,
    },
    countryOptions: {
      type: Array,
    },
    stateOptions: {
      type: Array,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
