<template>
  <div style="display: block; position: relative" @click.stop="adjustScrollHeight()">
    <bib-time-picker
      v-model="time"
      :name="name"
      :placeholder="placeholder"
      @change="onInput"
      @select-change="onInput"
      :disabled="disabled"
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
  },

  data() {
    return {
      time: null,
    };
  },

  methods: {
    adjustScrollHeight() {
      const appWrapperContent = document.querySelector(".app-wrapper__content");
      if (appWrapperContent) {
        appWrapperContent.style.marginBottom = `4px`;
      }
    },
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
