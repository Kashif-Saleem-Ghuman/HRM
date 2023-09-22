<template>
  <div>
    <div class="drop-menu">
    <div style="position: relative">
      <bib-button
        :label="selected"
        variant="light"
        @click="toggleDropdown"
        v-click-outside="clickOutside"
      ></bib-button>
      <div class="menu-items">
        <ul v-if="isDropdownOpen">
          <li
            class="d-flex align-center"
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
            style="width: 150px;"
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
.black-custom {
  display: inline-block;
  align-items: center;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  padding: 0.25rem 1rem !important;
  border-radius: 0.25rem;
  white-space: nowrap;
  user-select: none;
  $self: &;
  &--lightsuccess {
    background-color: #000 !important;
    display: flex;
    align-items: center;
    height: 32px;
    // max-width: 140px;
    color: #fff !important;
    svg {
      fill: #fff !important;
    }
    span {
      font-weight: 500;
      font-size: 14px;
      color: #fff !important; 
    }
    &:focus,
    &:active,
    &:focus-within {
      box-shadow: 0 0 0 0.2rem #207f1d29 !important;
    }
  }
  &--pending {
    background-color: #f3ced0 !important;
    display: flex;
    align-items: center;
    height: 32px;
    // max-width: 140px;
    color: #e6000e !important;
    svg {
      fill: #e6000e !important;
    }
    span {
      font-weight: 500;
      font-size: 14px;
      color: #e6000e !important;
    }
    &:focus,
    &:active,
    &:focus-within {
      box-shadow: 0 0 0 0.2rem #f4c2c4 !important;
    }
  }
  
  &--disabled {
    cursor: not-allowed;
    display: flex; /* For IE11/ MS Edge bug */
    align-items: center;
    pointer-events: none;
    text-decoration: none;
    
  }
}
</style>
