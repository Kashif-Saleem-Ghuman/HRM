<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Street number and name"
          placeholder="Enter your address"
          v-model="streetState"
          :disabled="inActive"
          indicator
          @input="$emit('input', $event, 'addressLine1', 'addresses')"
        ></bib-input>
        <small
            class="text-danger"
            style="margin:0 0 0.5rem 2px; display: block"
            v-show="errorMsgStreet"
            >Please enter street</small
          >
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          v-model="suitApartmentState"
          label="Suite/Apartment"
          placeholder="Enter your address"
          :disabled="inActive"
          @input="$emit('input', $event, 'addressLine2', 'addresses')"
        ></bib-input>
        <small
            class="text-danger"
             style="margin:0 0 0.5rem 2px; display: block"
            v-show="errorMsgSuit"
            >Please enter suit apartment</small
          >
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="select"
          label="Country"
          :options="countryOptions"
          v-model="countryState"
          placeholder="Please select country"
          :disabled="inActive"
          @input="$emit('input', $event, 'country', 'addresses')"
        ></bib-input>
        <small
            class="text-danger"
             style="margin:0 0 0.5rem 2px; display: block"
            v-show="errorMsgCountry"
            >Please select Country</small
          >
      </div>
      <div class="col-4" v-show="stateVisible">
        <bib-input
          type="select"
          label="Province/State"
          :options="stateOptions"
          v-model="stateState"
          placeholder="Please select state"
          :disabled="inActive" 
          @input="$emit('input', $event, 'state', 'addresses')"
        ></bib-input>
        <small
            class="text-danger"
            style="margin:0 0 0.5rem 2px; display: block"
            v-show="errorMsgState"
            >Please select State</small
          >
      </div>
      <div class="col-4" v-show="otherStateShow">
        <bib-input
          type="text"
          label="Other"
          v-model="otherStateState"
          placeholder="Please enter state"
          :disabled="inActive" 
          @input="$emit('input', $event, 'state', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Postal Code"
          v-model="postalCodeState"
          placeholder="Enter your postal code"
          :disabled="inActive"
          @change="$emit('input', $event, 'postalCode', 'addresses')"
        ></bib-input>
        <small
            class="text-danger"
             style="margin:0 0 0.5rem 2px; display: block"
            v-show="errorMsgPostalCode"
            >Please enter postal code</small
          >
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "AddressDetail",
  props: {
    street: {
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
    suitApartment:{
      type:String
    },
    otherState:{
      type:String
    },
    otherStateShow:{
      type:Boolean
    },
    errorMsgStreet: {
      type: Boolean,
    },
    errorMsgSuit: {
      type: Boolean,
    },
    errorMsgCountry: {
      type: Boolean,
    },
    errorMsgState: {
      type: Boolean,
    },
    errorMsgPostalCode: {
      type: Boolean,
    },
    inActive: {
      type: String,
    },
  },
  data() {
    return {
      streetState:this.street,
      suitApartmentState:this.suitApartment,
      countryState:this.country,
      stateState:this.state,
      otherStateState:this.otherState,
      postalCodeState:this.postalCode
    };
  },
};
</script>
