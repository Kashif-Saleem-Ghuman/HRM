<template>
  <div>
    <div class="dropdown-chip-menu" :class="themeClassWrapper">
      <div class="position-relative">
        <bib-button
          :label="selected"
          :variant="themeButtonVariant"
          @click="toggleDropdown"
          :class="[{'disabled-opacity': disable}]"
          v-click-outside="clickOutside"
        ></bib-button>
        <div v-if="!disable" class="menu-items chip-wrapper-com" style="left: 0;">
          <div v-if="isDropdownOpen" class="chip-wrapper-inner">
            <div
              v-for="(item, index) in getMonthsOptions"
              :key="index"
              @click="selectOption(item)"
              class="cursor-pointer"
              :class="['cursor-pointer', { 'disabled-opacity': isDisabled(item) }]"
            >
              <bib-button
                :label="item.label"
                :variant="isLightThemeCheck ? 'light' : 'dark'"
                size="lg"
                class="pr-05 mb-05 w-100"
                :disabled="disabled"
              ></bib-button>
            </div>
          </div>
        </div>
        <!-- <div class="menu-items bg-dark border-0" style="border-radius: 10px; ">
          <ul v-if="isDropdownOpen" class="border-white">
            <li
            class="d-flex align-center w-100" :class="isLightThemeCheck ? 'bg-light bg-hover-gray2' : 'bg-dark bg-hover-dark-sub1'"
            v-for="(option, index) in options"
              :key="index"
              @click="selectOption(option)"
            >
              <span>{{ option.label }}</span>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
    <!--     

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
    </div> -->
  </div>
</template>

<script>
import { MONTHS_LABEL_VALUE } from "../../../utils/constant/Calander";
import BaseDateButton from "./BaseDateButton.vue";
import {DateTime} from "luxon";
export default {
  extends: BaseDateButton,
  props: {
    year: {
      type: Number | String,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: MONTHS_LABEL_VALUE,
    };
  },

  computed: {
    getMonthsOptions() {
      if(this.isCurrentYear(this.year)) {
        return this.options.slice(0, this.options.findIndex((option) => option.value == DateTime.now().month) + 1)
      }
      return this.options;
    },
  },
  methods: {
    clickOutside() {
      this.isDropdownOpen = false;
    },
    isCurrentYear(selectedYear) {
      const now = DateTime.now();
      const currentYear = now.year;

      return currentYear == selectedYear;
    },
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
    isDisabled(option) {
      return this.selected == option.label;
    },
  },
  watch: {
    year(newVal, oldVal) {
      if(oldVal != null && this.isCurrentYear(newVal)) {
        this.setDefaultValue();
      }
    }
  },
};
</script>
