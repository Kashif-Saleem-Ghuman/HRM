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
export default {
  props: {
    fieldKey: {
      type: String,
    },

    error: {
      type: String,
    },
  },

  data() {
    return {
      value: null,
    };
  },

  methods: {
    onInput(value) {
      const { fieldKey } = this;
      this.$emit("input", { fieldKey, value });
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
}
</style>