<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Home"
            v-model="homePhone"
            placeholder="Enter your home phone"
            :disabled="inActive"
            @input="$emit('input', $event, 'homePhone')"
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
            @input="$emit('input', $event, 'mobile')"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "Phone",
    props: {
      homePhone: {
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
  