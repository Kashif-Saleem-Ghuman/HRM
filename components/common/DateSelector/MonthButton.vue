<template>
  <div>
    <div class="drop-menu" :class="themeClassWrapper">
      <div class="position-relative">
        <bib-button
          :label="selected"
          :variant="isLightThemeCheck ? 'light' : 'dark-sub3'"
          @click="toggleDropdown"
          v-click-outside="clickOutside"
        ></bib-button>
        <div class="menu-items bg-dark border-0" style="border-radius: 10px; ">
          <ul v-if="isDropdownOpen" class="border-white">
            <li
              class="d-flex align-center w-100" :class="isLightThemeCheck ? 'bg-light bg-hover-gray2' : 'bg-dark-sub1 bg-hover-dark-sub2'"
              v-for="(option, index) in options"
              :key="index"
              @click="selectOption(option)"
            >
              <span>{{ option.label }}</span>
            </li>
          </ul>
        </div>
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
export default {
  extends: BaseDateButton,

  data() {
    return {
      options: MONTHS_LABEL_VALUE,
    };
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
      const month = new Date().getMonth();
      this.selected = this.options[month].label;
      this.value = this.options[month].value;
    },
    onClose() {
      this.isDropdownOpen = false;
      this.disabled = true;
    },
  },
};
</script>
<style lang="scss">

</style>
