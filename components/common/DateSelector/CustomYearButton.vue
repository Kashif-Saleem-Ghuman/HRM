<template>
  <div class="dropdown-chip-menu" @mouseleave="handleMouseLeave">
    <div class="position-relative">
      <bib-button
        :label="selected?.toString()"
        :variant="themeButtonVariant"
        @click="toggleDropdown"
        v-click-outside="clickOutside"
        icon-right="close"
      ></bib-button>
      <div class="menu-items chip-wrapper-com" style="left: 0;">
        <div v-if="isDropdownOpen" class="chip-wrapper-inner">
          <div
            v-for="(item, index) in options"
            :key="index"
            @click="selectOption(item)"
            class="cursor-pointer"
            :class="['cursor-pointer', { 'disabled-opacity': isDisabled(item) }]"
          >
            <bib-button
              :label="item"
              :variant="isLightThemeCheck ? 'light' : 'dark'"
              size="lg"
              class="pr-05 mb-05 w-100"
              :disabled="disabled"
            ></bib-button>
          </div>
        </div>
        <!-- <ul v-if="isDropdownOpen" class="chip-wrapper-inner">
          <li
            class="d-flex align-center" :class="isLightThemeCheck ? 'bg-light bg-hover-gray2' : 'bg-dark bg-hover-dark-sub1'"
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
          >
            <span>{{ option }}</span>
          </li>
        </ul> -->
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
    handleMouseLeave() {
      this.isDropdownOpen = false;
    },
    isDisabled(option) {
      return this.selected === option;
    },
  },
};
</script>

<style lang="scss"></style>
