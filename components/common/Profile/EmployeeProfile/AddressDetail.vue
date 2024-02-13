<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Street number and name"
          placeholder=""
          :value="AddressConfig.addressLine1"
          :disabled="inActive"
          indicator
          @input="$emit('input', $event, 'addressLine1', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          :value="AddressConfig.addressLine2"
          label="Suite/Apartment"
          placeholder=""
          :disabled="inActive"
          @input="$emit('input', $event, 'addressLine2', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="select"
          label="Country"
          :options="countryOptions"
          :value="AddressConfig.country"
          placeholder=""
          :disabled="inActive"
          @input="$emit('input', $event, 'country', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4" v-show="stateVisible">
        <bib-input
          type="select"
          label="Province/State"
          :options="stateOptions"
          :value="AddressConfig.state"
          placeholder="Please select state"
          :disabled="inActive" 
          @input="$emit('input', $event, 'state', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4" v-show="otherStateShow">
        <bib-input
          type="text"
          label="Other"
          :value="AddressConfig.otherState"
          placeholder=""
          :disabled="inActive" 
          @input="$emit('input', $event, 'state', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="City"
          :value="AddressConfig.city"
          placeholder=""
          :disabled="inActive"
          @change="$emit('input', $event, 'city', 'addresses')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          :value="AddressConfig.postalCode"
          label="Postal Code"
          placeholder=""
          :disabled="inActive"
          @input="$emit('input', $event, 'postalCode', 'addresses')"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddressDetail",
  props: {
    /**
     * An object containing profile config
     * @typedef {Object} AddressConfig
     * @property {string} addressLine1
     * @property {string} country
     * @property {string} state
     * @property {string} city
     * @property {string} postalCode
     * @property {string} addressLine2
     * @property {string} otherState
     * @property {string} otherState
     * @property {string} otherState
     * @property {string} otherState
     */
     AddressConfig: {
      type: Object,
    },
    inActive: {
      type: String,
    },
    countryOptions: {
      type: Array,
    },
    stateOptions: {
      type: Array,
    },
    otherStateShow:{
      type:Boolean
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
