<template>
  <div class="input_label custom-input">
    Today, Wed 00-00-0000 (Week #23 00-00-00 - 00-00-00)
    <!-- <bib-datetime-picker
      v-model="date"
      placeholder="No due date"
      @input="onChange"
      label="Start Date:"
    ></bib-datetime-picker> -->
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      date: null,
    };
  },
  methods:{
    onChange(value) {
                                            let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
                                        }
  }
};
</script>

<style lang="scss" scoped>
$input-label-color: #85858f;
$input-label-size: 12px;
$input-bg-color: #f8f8f9;
$input-placeholder-color: #b1b1b4;
$input-border-color: #e8e8eb;
$input-borderradius: 4px;
$validation-star-color: #fa0f00;
.input_label {
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
}
.custom-input {
  input {
    background-color: #000 !important;
    border: 1px solid $input-border-color;
    padding: 20px !important;
    // font-size: 11px !important;
    margin-bottom: 16px !important;
    // border-radius:$input-borderradius;
  }
  select {
    background-color: $input-bg-color !important;
    border: 1px solid $input-border-color;
    // font-size: 11px !important;
    margin-bottom: 12px !important;
    // border-radius:$input-borderradius;
  }
  textarea {
    background-color: $input-bg-color !important;
    border: 1px solid $input-border-color;
    // font-size: 11px !important;
    // border-radius:$input-borderradius;
  }
  label {
    font-size: $input-label-size !important;
    color: $input-label-color;
    font-weight: 600;
  }
}
</style>
