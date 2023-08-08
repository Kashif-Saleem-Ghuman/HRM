<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Street number and name"
          placeholder="Enter your street"
          :value="street"
          :disabled="inActive"
          indicator
          @input="$emit('input', $event, 'street', 'addresses')"
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
          :value="suitApartment"
          label="Suite/Apartment"
          placeholder="Enter your address"
          :disabled="inActive"
          @input="$emit('input', $event, 'suit', 'addresses')"
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
          :value="country"
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
          :value="state"
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
          :value="otherState"
          placeholder="Please enter state"
          :disabled="inActive" 
          @input="$emit('input', $event, 'state', 'addresses')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Postal Code"
          :value="postalCode"
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
      // streetState:this.street,
      // suitApartmentState:this.suitApartment,
      // countryState:this.country,
      // stateState:this.state,
      // otherStateState:this.otherState,
      // postalCodeState:this.postalCode
    };
  },
};
</script>
