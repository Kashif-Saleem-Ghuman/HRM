<template>
  <div v-if="!monthPickerDisabled">
    <div class="drop-menu">
      <div class="position-relative" @mouseleave="handleMouseLeave">
        <bib-button
          :label="selected"
          :variant="themeButtonVariant"
          v-click-outside="clickOutside"
          :icon-right="iconName"
          @click="toggleDropdown"
          @click-right-icon="resetMonth"
        ></bib-button>
        <div class="menu-items">
          <ul v-if="isDropdownOpen">
            <li
              class="d-flex align-center w-100" :class="isLightThemeCheck ? 'bg-light bg-hover-gray2' : 'bg-dark bg-hover-dark-sub1'"
              v-for="(option, index) in getMonthsOptions"
              :key="index"
              @click="selectOption(option)"
            >
              <span>{{ option.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MONTHS_LABEL_VALUE } from "../../../utils/constant/Calander";
import {MONTH_SELECTOR_DEFAULT, MONTH_SELECTOR_ICONS} from "../../../utils/constant/Constant";
import BaseDateButton from "./BaseDateButton.vue";
import {DateTime} from "luxon";
export default {
  extends: BaseDateButton,
  props: {
    year: {
      type: Number,
    },
    monthPickerDisabled: {
      type: Boolean,
      default: false,
    },
    showFullYearList: {
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
    iconName() {
      if(this.value === MONTH_SELECTOR_DEFAULT.value){
        return MONTH_SELECTOR_ICONS.ARROW_DOWN
      }
      return MONTH_SELECTOR_ICONS.CLOSE;
    },
    getMonthsOptions() {
      const now = DateTime.now();
      const currentYear = now.year;
      const currentMonth = now.month;

      if(currentYear == this.year) {
        return this.options.slice(0, this.options.findIndex((option) => option.value == currentMonth) + 1)
      }
      return this.options;
    },
    isFromTimesheetViewCard() {
      return this.$store.state.timeattendance.viewFrom
    },
  },

  methods: {
    clickOutside() {
      this.isDropdownOpen = false;
    },
    selectOption(option) {
      this.disabled = false;
      this.selected = option.label;
      this.value = option.value;
      this.isDropdownOpen = false;
    },
    setDefaultValue() {
      if(this.showFullYearList || this.isFromTimesheetViewCard || this.monthPickerDisabled) {
        this.setDefaultMonth();
      }else {
        const month = new Date().getMonth();
        this.selected = this.options[month].label;
        this.value = this.options[month].value;
      }
    },
    onClose() {
      this.isDropdownOpen = false;
      this.disabled = true;
    },
    setDefaultMonth() {
      this.selected = MONTH_SELECTOR_DEFAULT.label;
      this.value = MONTH_SELECTOR_DEFAULT.value;
    },
    resetMonth() {
      this.iconName === MONTH_SELECTOR_ICONS.ARROW_DOWN && this.toggleDropdown();
      this.setDefaultMonth();
    },
    handleMouseLeave() {
      this.isDropdownOpen = false;
    },
  },
};
</script>
