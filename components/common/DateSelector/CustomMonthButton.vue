<template>
  <div>
    <div class="dropdown-chip-menu">
      <div class="position-relative" @mouseleave="handleMouseLeave">
        <bib-button
          :label="selected"
          :variant="themeButtonVariant"
          v-click-outside="clickOutside"
          :icon-right="iconName"
          @click="toggleDropdown"
          @click-right-icon="resetMonth"
        ></bib-button>
        <div class="menu-items chip-wrapper-com" style="left: 0;">
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
            ></bib-button>
          </div>
        </div>
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
      type: Number | String,
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
      if(this.isCurrentYear(this.year)) {
        return this.options.slice(0, this.options.findIndex((option) => option.value == DateTime.now().month) + 1)
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
      this.handleMouseLeave();
    },
    handleMouseLeave() {
      this.isDropdownOpen = false;
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
