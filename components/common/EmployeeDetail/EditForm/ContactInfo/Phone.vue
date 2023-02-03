<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="email"
            label="Home"
            v-model="email"
            placeholder="Enter your Primary email"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="email"
            label="Mobile"
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
  