<template>
  <bib-time-picker
    v-model="time"
    :name="name"
    :placeholder="placeholder"
    @input="onInput"
    :disabled="disabled"
  ></bib-time-picker>
</template>

<script>
import { DateTime } from "luxon";

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
      // if (this.is24Hours) {
      //   return this.$emit("input", this.convertTo24HourFormat(time));
      // }
      return this.$emit("input", time);
    },

    convert24hToAmPm(time) {
      if (!time) return time;
      const dateTime = DateTime.fromFormat(time, "HH:mm");
      if (dateTime.isValid) return dateTime.toFormat("hh:mm a");
    },

    convertTo24HourFormat(time) {
      const dateTime = DateTime.fromFormat(time, "hh:mm a");
      if (dateTime.isValid) return dateTime.toFormat("HH:mm");
      return time;
    },

    setTime(time) {
      // if (this.is24Hours) {
      //   this.time = this.convert24hToAmPm(time);
      // }
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