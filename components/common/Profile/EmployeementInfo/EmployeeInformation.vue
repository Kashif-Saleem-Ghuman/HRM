<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="date"
            label="Hire Date"
            v-model="hireDate"
            placeholder="Select your Hire Date"
            @change="$emit('input', $event, 'hireDate')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Social Insurance Number"
            v-model="socialInsuranceNumber"
            placeholder="Enter your email"
            @change="$emit('input', $event, 'sin')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Employee number"
            v-model="employeeNumber"
            placeholder="Enter your Employee number"
            @change="$emit('input', $event, 'employeNumber')"
            disabled="disabled"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="select"
            label="Employee Status"
            v-model="employeeStatus"
            :options="esstatusOptions"
            placeholder="Select your employee status"
            @input="$emit('input', $event, 'status')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "EmployeeInformation",
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
      inActive:{
        type:String
      }
    },
  };
  </script>
  