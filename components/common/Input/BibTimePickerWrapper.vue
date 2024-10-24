<template>
  <div style="display: block; position: relative;" :tabindex="isLoaderActive ? -1 : 0"  @keydown="handleKeydown" class="time-picker-wrapper">
    <bib-time-picker
      v-model="time"
      :name="name"
      :placeholder="placeholder"
      @change="onInput"
      @select-change="onInput"
      :disabled="disabled || isLoaderActive"
      :styleObject="styleObject"
      :class="
        isLightThemeCheck
          ? 'bib-time-picker--light-theme'
          : 'bib-time-picker--dark-theme'
      "
      id="timePickerId"
    ></bib-time-picker>
    <div
      v-show="disabled"
      style="position: absolute; left: 0; right: 0; top: 0; bottom: 0"
    ></div>
  </div>
</template>

<script>
import { isTimeFormat } from "../../../utils/functions/time";

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
    styleObject: {
      type: Object,
      default() {
        return {};
      },
    },
    isLoaderActive: { 
      type: Boolean,
      default: false,
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
        this.time = this.value;
        return;
      }
      return this.$emit("input", time);
    },

    setTime(time) {
      this.time = time;
    },
    handleKeydown(event) {
      if (this.isLoaderActive) {
        event.preventDefault(); 
      }
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
<style lang="scss">
.time-picker-wrapper {
  &:focus {
    outline: none;
    border: none !important;
  }

  &:focus-visible {
    outline: none;
    border: none !important;
  }
}
.bib-time-picker--light-theme:focus,
.bib-time-picker--dark-theme:focus {
  outline: none;
  border: none !important;
  box-shadow: none; 
}
</style>

