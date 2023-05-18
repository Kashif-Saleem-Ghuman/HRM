<template>
    <div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Website"
            v-model="website"
            placeholder="Address"
            :disabled="inActive"
          ></bib-input>
          <bib-input
            type="email"
            label="Email address"
            v-model="contactEmail"
            placeholder="Enter your email"
            @change="$emit('input', $event, 'email')"
            :disabled="inActive"
          ></bib-input>
          <bib-input
            type="text"
            label="Telephone"
            v-model="contactPhone"
            placeholder="Enter mobile number"
            @change="$emit('input', $event, 'phone')"
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
        website: {
        type: String,
      },
      contactEmail: {
        type: String,
      },
      contactPhone: {
        type: String,
      },
      inActive: {
        type: String,
      },
    },
  };
  </script>
  