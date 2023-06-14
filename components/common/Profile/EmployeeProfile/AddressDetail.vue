<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Street number and name"
          placeholder="Enter your address"
          :disabled="inActive"
          indicator
          @input="$emit('input', $event, 'addressLine1', 'streetNumber')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Suite/Apartment"
          placeholder="Enter your address"
          :disabled="inActive"
          @input="$emit('input', $event, 'addressLine2', 'suitApartment')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="select"
          label="Country"
          :options="countryOptions"
          placeholder="Please select country"
          :disabled="inActive"
          @input="$emit('input', $event, 'country', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="select"
          label="Province/State"
          :options="stateOptions"
          placeholder="Please select state"
          :disabled="inActive" 
          @input="$emit('input', $event, 'state', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Postal Code"
          placeholder="Enter your postal code"
          :disabled="inActive"
          @change="$emit('input', $event, 'postalCode', 'addresses')"
        ></bib-input>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "AddressDetail",
  props: {
    address: {
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
    
    state: {
      type: String,
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
    stateVisible: {
      type: Boolean,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
