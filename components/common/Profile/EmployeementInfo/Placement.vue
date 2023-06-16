<template>
    <div>
      <div class="row mx-0">
          <div class="col-6">
          <bib-input
            type="text"
            label="Work Title"
            v-model="employeeStatus"
            :options="esstatusOptions"
            placeholder="Enter Work title"
            @input="$emit('input', $event, 'status')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Department"
            v-model="employeeNumber"
            placeholder="Enter your Department"
            @change="$emit('input', $event, 'employeNumber')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Reports to"
            v-model="socialInsuranceNumber"
            placeholder="Enter your Social Insurance Number"
            @change="$emit('input', $event, 'sin')"
            icon-left="file"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Work email"
            v-model="socialInsuranceNumber"
            placeholder="Enter your work email"
            @change="$emit('input', $event, 'sin')"
            icon-left="file"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Work telephone"
            v-model="socialInsuranceNumber"
            placeholder="Enter work telephone"
            @change="$emit('input', $event, 'sin')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Work extension"
            v-model="hireDate"
            placeholder="Enter work extension"
            @change="$emit('input', $event, 'hireDate')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "Placement",
    props: {
      hireDate: {
        type: String,
      },
      socialInsuranceNumber: {
        type: String,
      },
      employeeNumber: {
        type: String,
      },
      employeeStatus: {
        type: String,
      },
      esstatusOptions: {
        type: Array,
      },
      inActive: {
        type: String,
      },
    },
  };
  </script>
  