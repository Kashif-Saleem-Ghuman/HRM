<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="First Name"
          :value="ProfileConfig.firstName"
          placeholder=""
          @change="$emit('input', $event, 'firstName')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Last Name"
          :value="ProfileConfig.lastName"
          placeholder=""
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
          :value="ProfileConfig.dateOfBirth"
          placeholder=""
          @change="$emit('input', $event, 'dateOfBirth')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Gender"
          :value="ProfileConfig.gender"
          :options="genderOptions"
          placeholder=""
          @input="$emit('input', $event, 'gender')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="select"
          label="Marital Status"
          :value="ProfileConfig.maritalStatus"
          :options="maritalOptions"
          placeholder="Please select employee status"
          @input="$emit('input', $event, 'maritalStatus')"
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
    /**
     * An object containing profile config
     * @typedef {Object} ProfileConfig
     * @property {string} firstName
     * @property {string} lastName
     * @property {string} dateOfBirth
     * @property {string} gender
     * @property {string} maritalStatus
     */
     ProfileConfig: {
      type: Object,
    },
    inActive: {
      type: String,
    },
    maritalOptions: {
      type: Array,
    },
    genderOptions: {
      type: Array,
    },
  },
};
</script>
