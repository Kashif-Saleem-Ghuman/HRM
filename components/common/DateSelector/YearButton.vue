<template>
  <div class="dropdown-chip-menu" :class="themeClassWrapper">
    <div class="position-relative">
      <bib-button
        :label="selected?.toString()"
        :variant="isLightThemeCheck ? 'light' : 'dark-sub3'"
        @click="toggleDropdown"
        v-click-outside="clickOutside"
      ></bib-button>
      <div class="menu-items chip-wrapper-com" style="left: 0;">
        <div v-if="isDropdownOpen" class="chip-wrapper-inner">
          <div
            v-for="(item, index) in options"
            :key="index"
            @click="selectOption(option)"
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
      <!-- <div class="menu-items">
        <ul v-if="isDropdownOpen">
          <li
            class="d-flex align-center" :class="isLightThemeCheck ? 'bg-light bg-hover-gray2' : 'bg-dark bg-hover-dark-sub1'"
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
           
          >
            <span>{{ option }}</span>
          </li>
        </ul>
      </div> -->
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
    isDisabled(option) {
      return this.selected === option;
    },
  },
};
</script>
<style lang="scss">
.drop-menu {
  .menu-items {
    background-color: $white;
    width: 120px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: 999;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
