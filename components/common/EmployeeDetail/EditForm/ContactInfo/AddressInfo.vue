<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Address 1"
          v-model="email"
          placeholder="Enter your Primary email"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Address 2"
          v-model="email"
          placeholder="Enter your Primary email"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="text"
          label="Country"
          v-model="email"
          placeholder="Enter your Primary email"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Province/State"
          v-model="email"
          placeholder="Enter your Primary email"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="City"
          v-model="email"
          placeholder="Enter your Primary email"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="text"
          label="Postal Code"
          v-model="email"
          placeholder="Enter your Primary email"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Phone",
  props: {
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
