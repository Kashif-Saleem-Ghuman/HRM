<template>
  <div>
    <button class="dropdown-button" @click="toggleDropdown">
      <span class="text">{{ selected }}</span>
    </button>
    <div v-if="isDropdownOpen" class="dropdown-menu">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        class="dropdown-item"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseDateButtonVue from "./BaseDateButton.vue";
export default {
  extends: BaseDateButtonVue,
  data() {
    return {
      selected: null,
      value: null,
      options: [],
    };
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.value = this.selected;
      this.isDropdownOpen = false;
    },
    getYearList() {
      const currentYear = new Date().getFullYear();
      const startYear = 2023;

      if (currentYear < startYear) {
        return [];
      }

      const yearList = [];
      for (let year = startYear; year <= currentYear; year++) {
        yearList.push(year);
      }

      return yearList;
    },
    setDefaultValue() {
      this.options = this.getYearList();
      this.selected = new Date().getFullYear();
      this.value = this.selected;
    },
  },
};
</script>