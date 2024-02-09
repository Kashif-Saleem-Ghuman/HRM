<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="First Name"
          v-model="firstname"
          placeholder="Enter your first name"
          @change="$emit('input', $event, 'firstName')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Last Name"
          v-model="lastname"
          placeholder="Type your last name"
          @change="$emit('input', $event, 'lastName')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="select"
          label="Gender"
          v-model="gender"
          :options="genderOptions"
          placeholder="Enter your email"
          @input="$emit('input', $event, 'gender')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6 validation-mark">
        <bib-input
          type="date"
          label="Date of Birth"
          v-model="dob"
          placeholder="Enter your email"
          @change="$emit('input', $event, 'dateOfBirth')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6 validation-mark">
        <bib-input
          type="select"
          v-model="maritalStatus"
          :options="maritalOptions"
          label="Marital Status"
          placeholder="Select marital status"
          @input="$emit('input', $event, 'maritalStatus')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from "json-schema";
export default {
  name: "Info",
  props: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    inActive: {
      type: String,
    },
    input: {
      type: Function,
    },
    maritalStatus: {
      type: Array,
    },
    dob: {
      type: Array,
    },
    gender: {
      type: String,
    },
    genderOptions: {
      type: Array,
    },
    maritalOptions: {
      type: Array,
    },
  },
  data() {
    return {
      methods: {
        updateInput($event) {
          this.$emit("update-value", $event);
        },
      },
    };
  },
  components: { validate },
};
</script>
<style lang="scss">
.validation-mark {
  label {
    line-height: 20px !important;
  }
}
.text-gray6 {
  span {
    padding-left: 4px;
  }
}
</style>
