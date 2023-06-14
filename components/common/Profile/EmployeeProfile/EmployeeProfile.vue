<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="First Name"
            v-model="firstname"
            placeholder="Type your firstName"
            @change="$emit('input', $event, 'firstName')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Last Name"
            v-model="lastname"
            placeholder="Type your lastName"
            @change="$emit('input', $event, 'lastName')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="date"
            label="Date of birth"
            v-model="dob"
            placeholder="Enter title"
            @change="$emit('input', $event, 'dob')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="select"
            label="Gender"
            v-model="gender"
            :options="genderOptions"
            placeholder="Enter your department"
            @change="$emit('input', $event, 'gender')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="select"
            label="Marital Status"
            v-model="maritalStatus"
            :options="maritalOptions"
            placeholder="Please select employee status"
            @change="$emit('input', $event, 'maritalStatus')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "EmployeeProfile",
    props: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      dob: {
        type: String,
      },
      gender: {
        type: String,
      },
      genderOptions: {
        type: Array,
      },
      maritalStatus: {
        type: String,
      },
      maritalOptions: {
      type: Array,
    },
      input: {
        type: Function,
      },
      inActive: {
        type: String,
      },
    },
    data() {
      return {};
    },
  };
  </script>
  