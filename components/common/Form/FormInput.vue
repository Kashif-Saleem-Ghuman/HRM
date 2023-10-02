<template>
  <bib-input
    v-model="value"
    v-bind="{ value, ...$attrs }"
    :instruction="error"
    @input="onInput"
    :variant="error ? 'alert' : ''"
    ref="bibInput"
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

<style></style>