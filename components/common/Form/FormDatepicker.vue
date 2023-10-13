<template>
  <bib-datetime-picker
    v-model="value"
    :label="label"
    :format="format"
    :parseDate="parseDate"
    :formatDate="formatDate"
    @input="onChange"
    :editable="dis"
  ></bib-datetime-picker>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    fieldKey: {
      type: String,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    dis: {
      type: Boolean,
    },
  },
  data() {
    return {
    //   value: null,
      format: "DD-MMM-YYYY",
      disable:true,
    };
  },
  computed: {
    isDisable() {
      console.log(this.inActive, "console.log(this.inActive)console.log(this.inActive)console.log(this.inActive)")
      return this.disable = this.dis;
      
    }
  },
  methods: {
    parseDate(dateString, format) {
      return new Date(dateString);
    },
    formatDate(dateObj, format) {
      return dayjs(dateObj).format(format);
    },
    onChange(value, repeatObj) {
        const { fieldKey } = this;
      const d = dayjs(value);
      let date = value ? d.format("YYYY-MMM-DD") : null;
      this.$emit("change", date, fieldKey);
    },
  },
};
</script>

<style lang="scss">
.form-date-picker {
  width: 100%;
  .vdpComponent__input {
    background-color: #fff !important;
    border: 1px solid $gray4 !important;
    display: flex;
    align-items: center;
  }
  .vdpComponent__input:hover {
    border-color: var(--bib-gray6) !important;
  }
}
</style>
