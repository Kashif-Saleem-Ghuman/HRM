<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Work Title"
          :value="PlacementConfig.workTitle"
          placeholder=""
          @input="$emit('input', $event, 'jobTitle')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Department"
          value="HRM"
          placeholder=""
          disabled="disabled"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="select"
          label="Reports to"
          :options="reportOptions"
          :value="PlacementConfig.reportsTo"
          placeholder="Please select reporting Manager"
          @input="$emit('input', $event, 'managerId')"
          icon-left="file"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Work email"
          :value="PlacementConfig.workEmail"
          placeholder=""
          @change="$emit('input', $event, 'workEmail')"
          icon-left="file"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Work telephone"
          :value="PlacementConfig.workTelephone"
          placeholder=""
          @change="$emit('input', $event, 'workTelephone')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Work extension"
          :value="PlacementConfig.workExtenstion"
          placeholder=""
          @change="$emit('input', $event, 'workExtenstion')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Placement",
  props: {
    /**
     * An object containing placement config
     * @typedef {Object} PlacementConfig
     * @property {string} workTitle
     * @property {string} department
     * @property {string,number} reportsTo
     * @property {string} workEmail
     * @property {string} workTelephone
     * @property {string} workExtenstion
     */
    PlacementConfig: {
      type: Object,
    },
    inActive: {
      type: String,
    },
    reportOptions: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>
