<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Address 1"
          v-model="address1"
          placeholder="Address"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Address 2"
          v-model="address2"
          placeholder="Address 2"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="text"
          label="Country"
          v-model="country"
          placeholder="Enter your phone"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Province/State"
          v-model="state"
          placeholder="Enter your phone"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="City"
          v-model="city"
          placeholder="Enter your phone"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Postal Code"
          v-model="postalCode"
          placeholder="Postal Code"
          :disabled="inActive"
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
    state: {
      type: String,
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
