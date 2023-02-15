<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Home"
            v-model="personalPhone"
            placeholder="Enter your home phone"
            :disabled="inActive"
            @input="$emit('input', $event, 'personalPhone')"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Mobile"
            v-model="mobile"
            placeholder="Enter your mobile number"
            :disabled="inActive"
            @input="$emit('input', $event, 'phone')"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "Phone",
    props: {
      personalPhone: {
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
  