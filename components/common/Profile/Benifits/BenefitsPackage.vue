<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="select"
          label="Select benefits package"
          v-model="benefitsPackage"
          :options="benefitsPackageOption"
          placeholder="Please select benefits package"
          @change="$emit('input', $event, 'benefitsPackage')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BenifitsPackage",
  props: {
    benefitsPackage: {
      type: String,
    },
    benefitsPackageOption: {
      type: Array,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
