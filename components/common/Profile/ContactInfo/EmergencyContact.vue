<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Full name"
            v-model="fullName"
            placeholder="Enter your full name"
            :disabled="inActive"
            @input="$emit('input', $event, 'name', emContact)"
          ></bib-input>
        </div>
      </div>

      <div class="row mx-0">
        <div class="col-4">
          <bib-input
            type="text"
            label="Releationships"
            v-model="releationships"
            placeholder="Please enter releationships"
            :disabled="inActive"
            @input="$emit('input', $event, 'relationship', emContact)"
          ></bib-input>
        </div>
        <div class="col-4">
          <bib-input
            type="text"
            label="Telephone"
            v-model="telephone"
            placeholder="Please enter telephone"
            :disabled="inActive"
            @input="$emit('input', $event, 'phone', emContact)"
          ></bib-input>
        </div>
        <div class="col-4">
          <bib-input
            type="email"
            label="Email"
            v-model="email"
            placeholder="Please enter email"
            :disabled="inActive"
            @input="$emit('input', $event, 'email', emContact)"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "EmergencyContact",
    props: {
    fullName: {
        type: String,
      },
      releationships: {
        type: String,
      },
      telephone: {
        type: String,
      },
      email: {
        type: String,
      },
      inActive: {
        type: String,
      },
      emContact:{
        type:String
      }
    },
  };
  </script>
  