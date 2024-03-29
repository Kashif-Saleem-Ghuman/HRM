<template>
  <div class="dropdown-menu">
    <div class="d-flex align-center">
      <label class="pr-05" v-show="sectionLabel">{{ sectionLabel }}</label>
      <div class="position-relative">
        <bib-button
          :label="buttonConfig?.label"
          :variant="buttonConfig?.variant || 'light'"
          size="lg"
          @click="show = !show"
          :icon="buttonConfig?.icon ?? ''"
          :class="className"
          v-click-outside="clickOutside"
        ></bib-button>

        <!-- @click.stop is to prevent v-click-outside to trigger -->
        <div class="btn-overlay" v-show="show" @click.stop="() => {}">
          <slot :close="clickOutside"></slot>
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
    sectionLabel: {
      type: String,
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
    clickOutside() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss">
.dropdown-menu {
  z-index: 99999;
  .button-items {
    display: flex;
    align-items: center;

    label {
      padding-right: 5px;
      font-size: 14px;
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid $secondary-sub3;
      border-radius: 0.2rem;
      background-color: $secondary-sub3;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: $white;
        color: #6d7278;
      }
    }
  }
  .btn-overlay {
    // box-shadow: rgba(133, 132, 132, 0.16) 1px 1px 2px;
    border-radius: 4px;
    position: absolute;
    background-color: $light;
    top: 0px;
    bottom: 0;
    min-width: 100%;
    height: 50px;
    border: solid 1px $light;
    padding: 0px;
    z-index: 9999;
    box-shadow: 0 0 0.2rem 1px #e8e8e8;
  }
}
</style>
