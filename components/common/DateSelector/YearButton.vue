<template>
  <div class="drop-menu" :class="themeClass">
    <div class="position-relative">
      <bib-button
        :label="selected?.toString()"
        :variant="isLightThemeCheck ? 'light' : 'dark-sub3'"
        @click="toggleDropdown"
        v-click-outside="clickOutside"
      ></bib-button>
      <div class="menu-items">
        <ul v-if="isDropdownOpen">
          <li
            class="d-flex align-center" :class="isLightThemeCheck ? 'bg-light bg-hover-gray2' : 'bg-dark-sub1 bg-hover-dark-sub2'"
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
           
          >
            <span>{{ option }}</span>
          </li>
        </ul>
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
    clickOutside() {
      this.isDropdownOpen = false;
    },
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
<style lang="scss">


</style>
