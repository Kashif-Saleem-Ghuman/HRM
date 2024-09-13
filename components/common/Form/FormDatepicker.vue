<template>
  <div>
  <bib-datetime-picker
    v-model="value"
    :label="label"
    hide-quick-select
    @input="onChange"
    :editable="dis"
    :disable-weekends="disableWeekends"
    v-bind="{ ...getDatetimeCommonProps() }"
    :calendarIconVariant="isLightThemeCheck ? 'light' : 'dark'"
    :variant="variant"
    v-if="dis"
  ></bib-datetime-picker>
  <bib-datetime-picker
    v-model="dateTimeValue"
    :label="label"
    @input="onChange"
    :editable="dis"
    class="align-items"
    :disable-weekends="disableWeekends"
    v-if="!dis"
    v-bind="{ ...getDatetimeCommonProps() }" 
    :calendarIconVariant="isLightThemeCheck ? 'light' : 'dark'"
  ></bib-datetime-picker>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { DateTime } from "luxon";
import { getDatetimeCommonProps, DATETIME_FORMAT } from "../../../utils/functions/datetime-input";

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
    },
    variant:{
      type: String,
    },
    disableWeekends:{
      type:Boolean,
      default:true
    },
  },
  data() {
    return {
      value: null,
      format: DATETIME_FORMAT,
      disable:true,
      dateTimeValue: null,
    };
  },
  computed: {
    isDisable() {
      return this.disable = this.dis;
      
    }
  },
  methods: {
    getDatetimeCommonProps, 
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

    setDateValue() {
      if (this.dateValue) {
        const date = DateTime.fromISO(this.dateValue)
        if (date.isValid) {
          this.dateTimeValue = date.toFormat(DATETIME_FORMAT)
        }
      }
    }
  },

  mounted() {
    this.setDateValue()
  },

  watch: {
    dateValue() {
      this.setDateValue()
    }
  }
};
</script>

<style lang="scss">
.form-date-picker {
  width: 100%;
  .vdpComponent__input {
    display: flex;
    align-items: center;
  }
  .vdpComponent__input:hover {
    border-color: var(--bib-gray6) !important;
  }
  
}
.align-items{
  input{
    line-height: 40px;
    display: flex;
    align-items: center;
    .icon{
      margin-top: -3px !important;
    }
  }
  }
</style>
