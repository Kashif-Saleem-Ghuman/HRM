<template>
  <div class="dropdown-chip-menu">
    <div class="d-flex align-center">
        <bib-button
          :label="buttonConfig.label"
          :variant="buttonConfig.variant"
          :size="size || 'lg'"
          @click="show = !show"
          :icon="buttonConfig.icon ?? ''"
          v-click-outside="clickOutside"
          class="pr-05"
        ></bib-button>
        <div class="menu-items chip-wrapper-com">
          <div v-if="show" class="chip-wrapper-inner">
            <div v-for="item in items" :key="item.key" @click="$emit('on-click', item)" style="cursor: pointer">
              <bib-button
                :label="item.label"
                :variant="item.variant"
                size="lg"
                :icon="item.icon ?? ''"
                v-click-outside="clickOutside"
                style="min-width: 140px"
                class="pr-05 mb-05"
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
    },
    size: {
      type: String,
    },
    items: {
      type: [Object, Array],
    },
  },
  data() {
    return {
      viewChange: "Today",
      show: false,
    };
  },
  methods: {
    clickOutside() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss">
.dropdown-chip-menu {
  position: relative;
  .menu-items {
    background-color: #fff;
    width: 107px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    top: -1px;
}
}
.chip-wrapper-com {
  background-color: #fff !important;
  width: 157px !important;
  z-index: 99999999999;
  border-radius: 6px !important;

  // padding: 10px;
  .chip-wrapper-inner {
    box-shadow: 0px 0 0.1rem 0.2rem #f1f1f1;
    // box-shadow: 0 1rem 0.8rem 0.8rem #000, 0.3 !important;
    border-radius: 6px !important;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
}
</style>
