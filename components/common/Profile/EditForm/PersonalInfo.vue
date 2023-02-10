<template>
  <div class="row mx-0" style="padding-top: 25px;">
    <div class="col-6">
      <bib-input
        type="date"
        label="Date of Birth"
        v-model="dob"
        placeholder="Enter your email"
        @change="$emit('input', $event, 'dob')"
      ></bib-input>
    </div>
    <div class="col-6">
      <bib-input
        type="select"
        label="Gender"
        v-model="gender"
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
