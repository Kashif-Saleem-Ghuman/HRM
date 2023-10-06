<template>
  <bib-datetime-picker
    v-if="$attrs.type == 'date'"
    :label="$attrs.label"
    class="form-date-picker"
    v-model="value"
    @input="onInput"
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
import { get } from "lodash"
export default {
  inject: ['emitFormInput', "formErrors"],
  props: {
    fieldKey: {
      type: String,
    },
  },

  data() {
    return {
      value: null,
      format: "DD-MMM-YYYY",
    };
  },

  computed: {
    isDate() {
      return this.$attrs.type == 'date'
    },
    error() {
      return get(this.errors, this.fieldKey)
    },

    errors() {
      return this.formErrors()
    }

  },

  methods: {
    parseDate(dateString, format) {
      return new Date(dateString);
    },
    formatDate(dateObj, format) {
      return dayjs(dateObj).format(format);
    },
    onInput(value) {
      const { fieldKey } = this;
      this.emitFormInput({ fieldKey, value})
    },
  },

  mounted() {
    this.value = this.$attrs.value;
  },

  watch: {
    "$attrs.value": {
      handler: function (val, old) {
        // if (this.isDate) {
        //   const dateValue = val ?? ""
        //   this.value = dateValue ? this.formatDate(dateValue, this.format) : ""
        //   return
        // }
        this.value = val;
      },
    },
  },
};
</script>

<style lang="scss">
.form-date-picker {
  width: 100%;
  .vdpComponent__input{
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
