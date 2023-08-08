<template>
    <div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Website"
            :value="website"
            placeholder="Enter website url"
            @change="$emit('input', $event, 'Website')"
            :disabled="inActive"
          ></bib-input>
          <bib-input
            type="email"
            label="Email address"
            :value="contactEmail"
            placeholder="Enter your email"
            @change="$emit('input', $event, 'ContactEmail')"
            :disabled="inActive"
          ></bib-input>
          <bib-input
            type="text"
            label="Telephone"
            :value="contactPhone"
            placeholder="Enter mobile number"
            @change="$emit('input', $event, 'ContactPhone')"
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
  