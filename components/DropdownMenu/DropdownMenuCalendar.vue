<template>
  <div class="dropdown-chip-menu" @mouseleave="hideMenu">
    <div class="d-flex align-center">
      <label class="pr-05" v-show="sectionLabel">{{ sectionLabel }}</label>
      <div class="position-relative">
        <bib-button
          :label="String(label)"
          :variant="themeButtonVariant"
          :size="size"
          @click="show = !show"
          v-click-outside="clickOutside"
        ></bib-button>
        <div class="menu-items chip-wrapper-com" style="left: 0">
          <div v-if="show" class="chip-wrapper-inner">
            <div
              v-for="item in items"
              :key="item.key"
              class="cursor-pointer"
              @click="selectItem(item)"
              :class="{
                'disabled-opacity': item.value === selectedItem?.value,
              }"
            >
              <bib-button
                :label="item.label"
                :variant="isLightThemeCheck ? 'light' : 'dark'"
                size="lg"
                :icon="item.icon ?? ''"
                class="pr-05 mb-05 w-100"
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
    // General props
    label: {
      type: [Number, String],
    },

    size: {
      type: String,
      default: 'lg'
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
      selectedItem: null, // Initially set to null
    };
  },

  mounted() {
    this.$nextTick(() => {
    this.selectedItem = this.getCurrentYearOrMonthItem();
  });  },

  methods: {
  clickOutside() {
    this.show = false;
  },
  hideMenu() {
    this.show = false;
  },
  selectItem(item) {
    this.selectedItem = item;
    this.$emit("on-click", item);
  },
  getCurrentYearOrMonthItem() {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    let yearItem = null;
    let monthItem = null;
    if (Array.isArray(this.items)) {
      yearItem = this.items.find(item => item.label === currentYear);
      monthItem = this.items.find(item => item.label === currentMonth);
    }
    return this.selectedItem = yearItem || monthItem || this.items[0]; // Default to the first item if neither is found
  }
}

};
</script>

<style lang="scss">
.dropdown-menu {
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
  .menu-items {
    background-color: $white;
    width: 130px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: 9999 !important;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 0.5rem;
      }
    }
  }
  .button {
    .icon {
      margin-left: 10px;
      margin-right: -5px;
    }
  }
}
</style>
