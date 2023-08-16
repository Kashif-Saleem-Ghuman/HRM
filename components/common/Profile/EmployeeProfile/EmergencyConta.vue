<template>
    <div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Contact name"
            :value="fullName"
            placeholder="Enter your full name"
            :disabled="inActive"
            @change="$emit('input', $event, 'name', 'emContact')"
          ></bib-input>
        </div>
      </div>
  
      <div class="row mx-0">
        <div class="col-4">
          <bib-input
            type="text"
            label="Releationships"
            :value="releationships"
            placeholder="Please enter releationships"
            :disabled="inActive"
            @change="$emit('input', $event, 'relationship', 'emContact')"
          ></bib-input>
        </div>
        <div class="col-4">
          <bib-input
            type="text"
            label="Telephone"
            :value="telephone"
            placeholder="Please enter telephone"
            :disabled="inActive"
            @change="$emit('input', $event, 'phone', 'emContact')"
          ></bib-input>
        </div>
        <div class="col-4">
          <bib-input
            type="email"
            label="Email"
            :value="email"
            placeholder="Please enter email"
            :disabled="inActive"
            @change="$emit('input', $event, 'email', 'emContact')"
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
      emContact: {
        type: String,
      },
    },
    data() {
    return {
      // fullNameState:this.fullName,
      // releationshipsState:this.releationships,
      // telephoneState:this.telephone,
      // emailState:this.email,
    };
  },
  };
  </script>
  