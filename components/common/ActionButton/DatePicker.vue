<template>
  <div class="custom_date_picker">
    <div class="mr-05">Date:</div>
    <bib-datetime-picker
      v-model="date2"
      :format="format"
      placeholder="Thursday, April 11, 2023"
      class="custom_date_picker"
    ></bib-datetime-picker>
  </div>
</template>

<script>
import fecha, { format } from "fecha";

export default {
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      date: null,
      format: "MMM D, YYYY",
      date2: fecha.format(new Date("2023-01-25"), "MMM D, YYYY"),
    };
  },
  methods: {
    onChange(value) {
      let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
    },
  },
};
</script>

<style lang="scss">
.custom_date_picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  input {
    border: none !important;
    background-color: $light;
    border-radius: 6px;
    font-size: 14px;

    // margin: 0 1rem;
  }
}
</style>
