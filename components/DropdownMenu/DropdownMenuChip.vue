<template>
  <div
    class="dropdown-chip-menu"
    @mouseleave="hideMenu"
  >
    <div class="d-flex align-center">
      <bib-button
        :label="buttonConfig.label"
        :variant="buttonConfig.variant || (isLightThemeCheck ? 'light' : 'dark')"
        :size="size || 'lg'"
        @click="toggleMenu"
        :icon-right="buttonConfig.icon ?? ''"
        :disabled="disabled"
        class="pr-05"
      ></bib-button>
      <div class="menu-items chip-wrapper-com" :style="className">
        <div v-if="show" class="chip-wrapper-inner">
          <div
            v-for="item in items"
            :key="item.key"
            @click="$emit('on-click', item)"
            :class="{ 'disabled-opacity': isDisabled(item), 'cursor-pointer': !isDisabled(item) }"
          >
            <bib-button
              :label="item.label"
              :variant="item.variant || (isLightThemeCheck ? 'light' : 'dark')"
              size="lg"
              :icon="item.icon ?? ''"
              class="pr-05 mb-05 w-100"
              :disabled="isDisabled(item)"
            ></bib-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * An object containing button config
     * @typedef {Object} ButtonConfig
     * @property {string} label - The button label
     * @property {string} variant - The button color
     * @property {string} icon - The button icon
     */
    buttonConfig: {
      type: Object,
      default() {
        return {
          variant: this.isLightThemeCheck ? 'primary' : 'success', // Set your default variant value here
        };
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
    },
    items: {
      type: Array,
      default: () => [], // Default to an empty array
    },
    className: {
      type: String,
      default: '', // Default to an empty string
    },
  },
  data() {
    return {
      show: false,
      currentView: this.getCurrentView(),
    };
  },
  watch: {
    "$route.query.view"(newView) {
      this.currentView = newView || "default";
    },
  },
  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
    hideMenu() {
      this.show = false;
    },
    isDisabled(item) {
      return this.currentView === item.value;
    },
    getCurrentView() {
      const params = new URLSearchParams(window.location.search);
      const view = params.get("view");
      return view || "default";
    },
  },
  created() {
    this.currentView = this.getCurrentView();
  },
};
</script>

<style lang="scss">
.dropdown-chip-menu {
  position: relative;
  .menu-items {
    position: absolute;
    width: 157px; // Updated width
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    right: 0;
    top: 100%; // Updated to position below the button
  }
}
.chip-wrapper-com {
  z-index: 99999999999;
  border-radius: 6px;
  .chip-wrapper-inner {
    box-shadow: 0px 0 0.1rem 0.2rem #f1f1f1;
    border-radius: 6px;
    padding: 0.5rem;
  }
}
.disabled-opacity {
  opacity: 0.5; // Adjust opacity as needed
  pointer-events: none; // Prevent interaction with the disabled items
}
</style>
