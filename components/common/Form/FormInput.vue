<template>
  <bib-datetime-picker
    v-if="$attrs.type == 'date'"
    :label="$attrs.label"
    class="form-date-picker"
    v-model="value"
    :maxDate="maxDate"
    :editable="editable"
    @input="onInput"
    hide-quick-select
    v-bind="{ ...getDatetimeCommonProps() }"
  ></bib-datetime-picker>

  <bib-input
    v-else
    v-model="value"
    v-bind="{ value, ...$attrs }"
    :instruction="error"
    @input="onInput"
    :variant="error ? 'alert' : ''"
    :disable="disable"
  ></bib-input>
</template>

<script>
import { get } from "lodash";
import { DateTime } from "luxon";
import { getDatetimeCommonProps, DATETIME_FORMAT } from "../../../utils/functions/datetime-input";
export default {
  inject: ["emitFormInput", "formErrors"],
  props: {
    fieldKey: {
      type: String,
    },

    displayFormat: {
      type: String,
      required: false,
    },
    disable:{
      type:Boolean,
    },
    editable: {
      type: Boolean,
      default:true,
    },
  },

  data() {
    return {
      value: null,
      maxDate: DateTime.now().toISO()
    };
  },

  computed: {
    isDate() {
      return this.$attrs.type == "date";
    },
    error() {
      return get(this.errors, this.fieldKey);
    },

    errors() {
      return this.formErrors();
    },
  },

  methods: {
    getDatetimeCommonProps,
    formatDateToIso(value) {
      let dateTimeDate = DateTime.fromISO(value);
      if (dateTimeDate.isValid) {
        const isoDate = dateTimeDate.toISO();
        return isoDate;
      }
      return value;
    },
    onInput(value) {
      const { fieldKey } = this;
      if (this.isDate) {
        value = this.formatDateToIso(value);
      }
      this.emitFormInput({ fieldKey, value });
    },
    setValue() {
      if (this.isDate) {
        const date = DateTime.fromISO(this.$attrs.value)
        if(date.isValid) {
          this.value = date.toFormat(DATETIME_FORMAT)
        }
        return 
      }
      this.value = this.$attrs.value;
      
    }
  },

  mounted() {
    this.setValue()
  },

  watch: {
    "$attrs.value": {
      handler: function () {
        this.setValue()
      },
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
