<template>
  <div class="dropdown-menu dropdown-menu-chip">
    <div class="d-flex align-center px-1 py-05">
      <div style="position: relative">
        <bib-button
          :label="buttonConfig.label"
          :variant="buttonConfig.variant"
          size="lg"
          @click="show = !show"
          :icon="buttonConfig.icon ?? ''"
          v-click-outside="clickOutside"
          class="pr-05"
        ></bib-button>
        <div class="menu-items">
          <div v-if="show">
            <div v-for="item in items" :key="item.key">
              <bib-button
                :label="item.label"
                :variant="item.variant"
                size="lg"
                @click="$emit('on-click', item)"
                :icon="item.icon ?? ''"
                v-click-outside="clickOutside"
                style="min-width: 120px"
                class="pr-05 mb-025"
              ></bib-button>
            </div>
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
      type: Object
    },

    items: {
      type: Array,
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

</style>
