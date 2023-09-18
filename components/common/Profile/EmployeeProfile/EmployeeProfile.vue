<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="First Name"
          :value="firstName"
          placeholder=""
          @change="$emit('input', $event, 'firstName')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Last Name"
          :value="lastName"
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
          :value="dob"
          placeholder=""
          @change="$emit('input', $event, 'dateOfBirth')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Gender"
          :value="gender"
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
          :value="maritalStatus"
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
    firstName: {
      type: String,
    },
    lastName: {
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
    return {
      // firstNameState:this.firstName,
      // lastNameState:this.lastName,
      // dobState:this.dob,
      // genderState:this.gender,
      // maritalStatusState:this.maritalStatus
    };
  },
};
</script>
