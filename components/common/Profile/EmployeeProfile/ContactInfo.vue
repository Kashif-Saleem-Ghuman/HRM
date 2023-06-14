<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="email"
          label="Primary email"
          v-model="email"
          placeholder="Enter your primary email"
          :disabled="disabled"
          @change="$emit('input', $event, 'primaryEmail')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="email"
          label="Secondary email"
          v-model="personalPhone"
          placeholder="Enter your secondary mail"
          :disabled="inActive"
          @change="$emit('input', $event, 'seondaryEmail')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Home phone"
          placeholder="Enter your home phone"
          :disabled="inActive"
          @change="$emit('input', $event, 'homePhone')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Cell nphone"
          placeholder="Enter your phone"
          :disabled="inActive"
          @change="$emit('input', $event, 'cellPhone')"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactInfo",
  props: {
    inActive: {
      type: String,
    },
  },
};
</script>
