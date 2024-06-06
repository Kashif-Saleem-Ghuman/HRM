<template>
  <div>
    <div class="drop-menu">
      <div class="position-relative">
        <bib-button
          :label="selected"
          variant="light"
          @click="toggleDropdown"
          v-click-outside="clickOutside"
          :icon-right="iconName"
          @click-right-icon="resetMonth"
        ></bib-button>
        <div class="menu-items">
          <ul v-if="isDropdownOpen">
            <li
              class="d-flex align-center w-100"
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
import { MONTH_SELECTOR_DEFAULT } from "../../../utils/constant/Constant";
import BaseDateButton from "./BaseDateButton.vue";
import {DateTime} from "luxon";
export default {
  extends: BaseDateButton,
  props: {
    isAdminView: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
    }
  },
  data() {
    return {
      options: MONTHS_LABEL_VALUE,
    };
  },
  computed: {
    iconName() {
      if(this.value === MONTH_SELECTOR_DEFAULT.value){
        return 'arrowhead-down'
      }
      return 'close';
    },
    getMonthsOptions() {
      const now = DateTime.now();
      const currentYear = now.year;
      const currentMonth = now.month;

      if(currentYear == this.year) {
        return this.options.slice(0, this.options.findIndex((option) => option.value == currentMonth) + 1)
      }
      return this.options;
    }
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
      if(this.isAdminView) {
        this.selected = MONTH_SELECTOR_DEFAULT.label;
        this.value = MONTH_SELECTOR_DEFAULT.value;
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
    resetMonth() {
      this.iconName === 'arrowhead-down' && this.toggleDropdown();
      this.selected = MONTH_SELECTOR_DEFAULT.label;
      this.value = MONTH_SELECTOR_DEFAULT.value;
    },
  },
};
</script>
