<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Address 1"
          v-model="address"
          placeholder="Enter your address"
          :disabled="inActive"
          @input="$emit('input', $event, 'street', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Address 2"
          v-model="address2"
          placeholder="Enter your address"
          :disabled="inActive"
          @input="$emit('input', $event, 'address2', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="select"
          label="Country"
          v-model="country"
          :options="countryOptions"
          :ref='ref' 
          :query='query'
          placeholder="Please select country"
          :disabled="inActive"
          @input="$emit('selectInput', $event, 'country', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4" v-if="stateVisible">
        <bib-input
          type="select"
          label="Province/State"
          v-model="state"
          :options="stateOptions"
          placeholder="Please select state"
          :disabled="inActive"
          @input="$emit('selectInput', $event, 'state', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="City"
          v-model="city"
          placeholder="Enter your city"
          :disabled="inActive"
          @change="$emit('input', $event, 'city', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="text"
          label="Postal Code"
          v-model="postalCode"
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
  name: "AddressInfo",
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
    countryOptions:{
      type:Array
    },
    ref: {
      type: String,
    },
    query: {
      type: String,
    },
    state: {
      type: String,
    },
    stateOptions:{
      type:Array
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    stateVisible:{
      type:Boolean
    },
    inActive: {
      type: String,
    },
  },
};
</script>
