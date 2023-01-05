<template>
  <div class="row mx-0 static_display" style="padding-top: 25px">
    <div class="col-6">
      <label> Date of Birth</label>
        <p class="d-flex align-center">
          <bib-icon
            icon="calendar-solid"
            scale="1"
            variant="secondary"
            class="mr-05"
          ></bib-icon
          >{{ date_vmodel }}
        </p>
    </div>
    <div class="col-6">
      <label>Gender</label>
      <p>{{ gender_vmodel }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonalInfo",
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
