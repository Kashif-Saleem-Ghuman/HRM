<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <label class="switcher_label">Same as org setting</label>
        <div class="pb-075 pt-05">
          <bib-switch
            :checked="webPortalAccess"
            @change="
              $emit('change-it', $event, 'allowWebAccess'),
                (webPortalAccess = !webPortalAccess)
            "
            :disabled="inActive"
            >{{ switchLabel }}</bib-switch
          >
        </div>
      </div>
    </div>
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
      <div class="col-6">
        <bib-input
          type="text"
          label="Vacation Allowance"
          v-model="vacationAllowance"
          placeholder="Vacation Allowance"
          @input="$emit('input', $event, 'vacationAllowance')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Medical Allowance"
          v-model="medicalAllowance"
          placeholder="Medical Allowance"
          @change="$emit('input', $event, 'medicalAllowance')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="textarea"
          v-model="note"
          placeholder="Type about yourself"
          label="Note"
          @change="$emit('input', $event, 'note')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TimeOff",
  props: {
    effectiveDate: {
      type: String,
    },
    vacationAllowance: {
      type: String,
    },
    medicalAllowance: {
      type: String,
    },
    switchLabel: {
      type: String,
    },
    note: {
      type: String,
    },
    webPortalAccess: {
      type: String,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
