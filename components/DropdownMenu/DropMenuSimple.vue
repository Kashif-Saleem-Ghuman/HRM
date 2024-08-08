<template>
  <div class="drop-menu" :class="themeClassWrapper">
    <div class="position-relative" @mouseleave="hideMenu">
      <bib-button
        :label="buttonConfig.label"
        :variant="
          buttonConfig.variant || (isLightThemeCheck ? 'light' : 'dark')
        "
        :size="size || 'lg'"
        @click="show = !show"
        :icon-right="buttonConfig.icon ?? ''"
        :disabled="disabled"
        class="pr-05"
      ></bib-button>
      <div class="menu-items" v-if="show" :style="className">
        <ul>
          <li
            class="d-flex align-center"
            :class="
              isLightThemeCheck
                ? 'bg-light bg-hover-gray2'
                : 'bg-dark bg-hover-dark-sub1'
            "
            v-for="(item, index) in items"
            :key="index"
            @click="$emit('on-click', item)"
          >
            <span>{{ item.label }}</span>
          </li>
        </ul>
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
          variant: this.isLightThemeCheck ? "primary" : "success", // Set your default variant value here
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
      type: [Object, Array],
    },
    className: {
      type: String,
    },
  },
  data() {
    return {
      viewChange: "Today",
      show: false,
    };
  },
  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
    hideMenu() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss">
.drop-menu-simple {
  position: relative;
  .menu-items {
    position: absolute;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .chip-simple-wrapper {
    // background-color: $white !important;
    width: 137px !important;
    z-index: 99999999999;
    // padding: 10px;
    a {
      font-size: 12px !important;
    }
  }
}
</style>
