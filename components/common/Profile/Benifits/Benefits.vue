<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="date"
          label="Effective Date"
          v-model="effectiveDate"
          placeholder="Please select date"
          @change="$emit('input', $event, 'effectiveDate')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>

    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="select"
          label="Benefits plan name"
          v-model="benefitsPlanName"
          :options="benefitsPlanNameOptions"
          placeholder="Please enter benefits plan name"
          @input="$emit('input', $event, 'name')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Benefits plan URL"
          v-model="benefitsPlanURL"
          placeholder="Enter benefits plan URL"
          @input="$emit('input', $event, 'url')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Benefits",
  props: {
    effectiveDate: {
      type: String,
    },
    benefitsPlanName: {
      type: String,
    },
    benefitsPlanNameOptions: {
      type: Array,
    },
    benefitsPlanURL: {
      type: String,
    },

    inActive: {
      type: String,
    },
  },
};
</script>
