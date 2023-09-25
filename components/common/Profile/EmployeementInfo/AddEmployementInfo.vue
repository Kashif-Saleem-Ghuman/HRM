<template>
  <div>
    <div class="row mx-0">
        <div class="col-6">
        <bib-input
          type="select"
          label="Employee Status"
          :value="employeeStatus"
          :options="esstatusOptions"
          placeholder="Select your employee status"
          @input="$emit('input', $event, 'status')"
          disabled
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Employee number"
          :value="employeeNumber"
          placeholder=""
          @change="$emit('input', $event, 'employeeNo')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Social Insurance Number"
          :value="socialInsuranceNumber"
          placeholder=""
          @change="$emit('input', $event, 'sin')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="date"
          label="Hire Date"
          :value="hireDate"
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
          :value="employeeType"
          placeholder=""
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
      
    };
  },
};
</script>
