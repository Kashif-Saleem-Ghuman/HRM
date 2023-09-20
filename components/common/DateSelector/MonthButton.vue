<template>
  <div>
    <button class="dropdown-button" :class="{ disabled: disabled }">
      <span class="text" @click="toggleDropdown">{{ selected }}</span>

      <bib-icon
        v-if="disabled"
        icon="arrowhead-down"
        :scale="1.5"
        @click="toggleDropdown"
      ></bib-icon>
      <bib-icon v-else icon="close" :scale="1.5" @click="onClose"></bib-icon>
    </button>
    <div v-if="isDropdownOpen" class="dropdown-menu">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        class="dropdown-item"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { MONTHS_LABEL_VALUE } from "../../../utils/constant/Calander";
import BaseDateButton from "./BaseDateButton.vue";
export default {
  extends: BaseDateButton,
  data() {
    return {
      options: MONTHS_LABEL_VALUE,
    };
  },
  methods: {
    selectOption(option) {
      this.disabled = false;
      this.selected = option.label;
      this.value = option.value;
      this.isDropdownOpen = false;
    },
    setDefaultValue() {
      const month = new Date().getMonth();
      this.selected = this.options[month].label;
      this.value = this.options[month].value;
    },
    onClose() {
      this.isDropdownOpen = false;
      this.disabled = true;
    },
  },

  watch: {
    disabled(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$emit("update:disabled", newVal);
      }
    },
  },
};
</script>