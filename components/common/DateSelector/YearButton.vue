<template>
  <div class="drop-menu">
    <div class="position-relative">
      <bib-button
        :label="selected?.toString()"
        variant="light"
        @click="toggleDropdown"
        v-click-outside="clickOutside"
      ></bib-button>
      <div class="menu-items"  >
        <ul v-if="isDropdownOpen">
          <li
            class="d-flex align-center"
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
.drop-menu {
  .menu-items {
    background-color: $white;
    width: 120px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    // top: -1px;
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
