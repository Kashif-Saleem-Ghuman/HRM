<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="email"
          label="Primary email address"
          v-model="email"
          placeholder="Enter your Primary email"
          disabled="disabled"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="email"
          label="Additional email address"
          v-model="personalEmail"
          placeholder="Enter Additional email address"
          :disabled="inActive"
          @input="$emit('input', $event, 'personalEmails')"
        ></bib-input>
        <validation data="Input is not valid"></validation>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Email",
  props: {
    email: {
      type: String,
    },
    personalEmail: {
      type: String,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
