<template>
  <bib-datetime-picker
    v-if="$attrs.type == 'date'"
    :label="$attrs.label"
    class="form-date-picker"
    v-model="value"
    :maxDate="maxDate"
    @input="onInput"
    hide-quick-select
    :display-format="displayFormat ?? 'YYYY-MM-DD'"
  ></bib-datetime-picker>

  <bib-input
    v-else
    v-model="value"
    v-bind="{ value, ...$attrs }"
    :instruction="error"
    @input="onInput"
    :variant="error ? 'alert' : ''"
  ></bib-input>
</template>

<script>
import dayjs from "dayjs";
import { get } from "lodash";
import { DateTime } from "luxon";
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
    parseDate(dateString, format) {
      return new Date(dateString);
    },

    formatDate(dateObj, format) {
      return dayjs(dateObj).format(format);
    },
    
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
  },

  mounted() {
    this.value = this.$attrs.value;
  },

  watch: {
    "$attrs.value": {
      handler: function (val, old) {
        this.value = val;
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
