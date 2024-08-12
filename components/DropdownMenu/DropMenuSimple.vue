<template>
  <div class="drop-menu-simple" :class="themeClassWrapper">
    <div
      class="position-relative"
      @mouseleave="hideMenu"
      :class="{
        'bg-light': isLightThemeCheck,
        'bg-dark': !isLightThemeCheck,
      }"
    >
      <bib-button
        :label="buttonConfig.label"
        :variant="
          buttonConfig.variant || (isLightThemeCheck ? 'light' : 'dark')
        "
        :size="size || 'lg'"
        @click="toggleMenu"
        :icon-right="buttonConfig.icon ?? ''"
        :disabled="disabled"
        class="pr-05"
      ></bib-button>
      <div class="menu-items" v-show="show" :style="className">
        <ul>
          <li
            class="d-flex align-center"
            v-for="(item, index) in items"
            :key="index"
            @click="handleItemClick(item)"
            :class="{
              'bg-light bg-hover-gray2': isLightThemeCheck,
              'bg-dark bg-hover-dark-sub1': !isLightThemeCheck,
              disabled: isDisabled(item),
            }"
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
    buttonConfig: {
      type: Object,
      default() {
        return {
          variant: this.isLightThemeCheck ? "primary" : "success",
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
      default: () => [],
    },
    className: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      currentView: this.getCurrentView(),
    };
  },
  watch: {
    "$route.query.view": function (newView) {
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
    handleItemClick(item) {
      if (!this.isDisabled(item)) {
        this.$emit("on-click", item);
      }
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
.drop-menu-simple {
  .menu-items {
    min-width: 137px;
    border-radius: 0px !important;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 99999;
    ul {
      margin: 0;
      padding: 0;
      li {
        padding: 5px 10px;
        cursor: pointer;
      }
    }
  }

  .disabled {
    pointer-events: none;
    // opacity: 0.10;
  }
}
</style>
