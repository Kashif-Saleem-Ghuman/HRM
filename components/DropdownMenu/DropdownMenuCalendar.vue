<template>
  <div class="dropdown-chip-menu">
    <div class="d-flex align-center">
      <label class="pr-05" v-show="sectionLabel">{{ sectionLabel }}</label>
      <div class="position-relative">
        <bib-button
          :label="String(label)"
          :variant="isLightThemeCheck ? 'light' : 'dark'"
          size="lg"
          :icon-right="icon ?? $button.blackButton.icon"
          @click="show = !show"
          v-click-outside="clickOutside"
        ></bib-button>
        <div class="menu-items chip-wrapper-com">
          <div v-if="show" class="chip-wrapper-inner">
            <div v-for="item in items" :key="item.key" @click="$emit('on-click', item)" class="cursor-pointer">
              <bib-button
                :label="item.label"
                :variant="isLightThemeCheck ? 'light' : 'dark'"
                size="lg"
                :icon="item.icon ?? ''"
                class="pr-05 mb-05 w-100"
                :disabled="disabled"
              ></bib-button>
            </div>
          </div>
          <!-- <ul v-if="show">
            <li
              class="d-flex align-center cursor-pointer"
              v-for="item in items"
              @click="$emit('on-click', item)"
            >
              <bib-icon
                :icon="listIcon"
                :scale="0.7"
                :variant="listIconVariant || 'secondary'"
                v-show="listIcon == null ? false : true"
                class="mr-05"
              ></bib-icon>
              <span>{{ item.label }}</span>
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // General props
    label: {
      type: [Number, String],
    },
    variant: String,
    icon: String,
    className: String,

    // Props related to sections
    sectionLabel: String,

    // Props related to items and lists
    items: Array,
    listIcon: String,
    listIconVariant: String,
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

