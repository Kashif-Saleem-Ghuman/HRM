<template>
  <div>
    <div class="row mx-0">
        <div class="col-6">
        <bib-input
          type="select"
          label="Employee Status"
          v-model="employeeStatusState"
          :options="esstatusOptions"
          placeholder="Select your employee status"
          @input="$emit('input', $event, 'status')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Employee number"
          v-model="employeeNumberState"
          placeholder="Enter your Employee number"
          @change="$emit('input', $event, 'employeNumber')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Social Insurance Number"
          v-model="socialInsuranceNumberState"
          placeholder="Enter your Social Insurance Number"
          @change="$emit('input', $event, 'sin')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="date"
          label="Hire Date"
          v-model="hireDateState"
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
          label="Employment Type"
          v-model="employeeTypeState"
          placeholder="Enter your Employment Type"
          @change="$emit('input', $event, 'sin')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddEmployeeInformation",
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
    employeeType:{
      type:String
    },
    esstatusOptions: {
      type: Array,
    },
    inActive: {
      type: String,
    },
  },
  data() {
    return {
      hireDateState:this.hireDate,
      socialInsuranceNumberState:this.socialInsuranceNumber,
      employeeNumberState:this.employeeNumber,
      employeeStatusState:this.employeeStatus,
      employeeTypeState:this.employeeType
    };
  },
};
</script>
