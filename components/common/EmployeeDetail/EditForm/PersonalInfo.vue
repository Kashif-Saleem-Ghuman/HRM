<template>
  <div class="row mx-0" style="padding-top: 25px;">
    <div class="col-6">
      <bib-input
        type="date"
        label="Date of Birth"
        v-model="dob"
        placeholder="Select your DOB"
        @change="$emit('input', $event, 'date')"
      ></bib-input>
    </div>
    <div class="col-6">
      <bib-input
        type="select"
        label="Gender"
        :value="gender"
        :options="options"
        placeholder="Enter your email"
        @input="$emit('input', $event, 'gender')"
      ></bib-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonalInfo",
  props: {
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    options: {
      type: Array,
    },
  },
};
</script>
