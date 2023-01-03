<template>
  <div class="row mx-0 pt-2">
                      <div class="col-6">
                        <bib-input
                          type="date"
                          label="Date of Birth"
                          v-model="date_vmodel"
                          placeholder="Enter your email"
                        ></bib-input>
                      </div>
                      <div class="col-6">
                        <bib-input
                          type="select"
                          label="Gender"
                          v-model="gender_vmodel"
                          :options="options"
                          placeholder="Enter your email"
                        ></bib-input>
                      </div>
                    </div>
</template>
<script>
export default {
  name: "ButtonCircle",
  props: {
    date_vmodel: {
      type: String,
    },
    gender_vmodel: {
      type: String,
    },
    options: {
      type: Array,
    },
  },
};
</script>
