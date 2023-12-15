<template>
  <div>
  <bib-datetime-picker
    v-model="value"
    :label="label"
    :format="format"
    :parseDate="parseDate"
    :formatDate="formatDate"
    hide-quick-select
    @input="onChange"
    :editable="dis"
    v-if="dis"
  ></bib-datetime-picker>
  <bib-datetime-picker
    v-model="dateValue"
    :label="label"
    :format="format"
    :parseDate="parseDate"
    :formatDate="formatDate"
    @input="onChange"
    :editable="dis"
    v-if="!dis"
  ></bib-datetime-picker>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { DateTime } from "luxon";

export default {
  props: {
    fieldKey: {
      type: String,
    },
    label: {
      type: String,
    },
    dis: {
      type: Boolean,
    },
    dateValue:{
      type: String,
    }
  },
  data() {
    return {
      value: null,
      format: "DD-MMM-YYYY",
      disable:true,
      
    };
  },
  computed: {
    isDisable() {
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
    formatDateToIso(value) {
      let dateTimeDate = DateTime.fromISO(value);
      if (dateTimeDate.isValid) {
        const isoDate = dateTimeDate.toUTC().toISO();
        return isoDate;
      }
      return value;
    },
    onChange(value) {
      const { fieldKey } = this;
      value = this.formatDateToIso(value);
      const d = dayjs(value);
      let date = value ? d.format("YYYY-MMM-DD") : null;
      this.$emit("change", date, fieldKey);
    },
    // onChange(value, repeatObj) {
    //   // value = this.formatDateToIso(value);
    //     const { fieldKey } = this;
    //   const d = dayjs(value);
    //   let date = value ? d.format("YYYY-MMM-DD") : null;
    //   this.$emit("change", date, fieldKey);
    // },
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
