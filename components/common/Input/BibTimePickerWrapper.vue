<template>
  <bib-time-picker
    v-model="time"
    :name="name"
    :placeholder="placeholder"
    @change="onInput"
    @select-change="onInput"
    :disabled="disabled"
  ></bib-time-picker>
</template>

<script>
import { isTimeFormat } from '../../../utils/functions/time';

export default {
  props: {
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    is24Hours: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
  },

  data() {
    return {
      time: null,
    };
  },

  methods: {
    onInput(time) {
     if (!isTimeFormat(time)) {
      this.time = this.value
      return
     }
      return this.$emit("input", time);
    },

    setTime(time) {
      this.time = time
    },
  },

  mounted() {
    this.setTime(this.value);
  },

  watch: {
    value(time) {
      this.setTime(time);
    },
  },
};
</script>

<style></style>