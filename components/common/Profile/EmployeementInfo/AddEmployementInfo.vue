<template>
  <div>
    <div class="row mx-0">
        <div class="col-6">
        <bib-input
          type="select"
          label="Employee Status"
          :value="EmployeementConfig.employeeStatus"
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
          :value="EmployeementConfig.employeeNumber"
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
          :value="EmployeementConfig.sin"
          placeholder=""
          @change="$emit('input', $event, 'sin')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="date"
          label="Hire Date"
          :value="EmployeementConfig.hireDate"
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
          :value="EmployeementConfig.employeeType"
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
    /**
     * An object containing employeement config
     * @typedef {Object} EmployeementConfig
     * @property {string} hireDate 
     * @property {string} sin 
     * @property {string} employeeNumber 
     * @property {string} employeeStatus 
     * @property {string} employeeType 
     */
     EmployeementConfig: {
      type: Object,
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
