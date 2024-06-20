<template>
  <div class="dropdown-menu">
    <div class="d-flex align-center">
      <label class="pr-05" v-show="sectionLabel">{{ sectionLabel }}</label>
      <div class="position-relative">
        <bib-button
          :label="String(label)"
          :variant="variant ?? $button.lightButton.variant"
          size="lg"
          @click="show = !show"
          v-click-outside="clickOutside"
        ></bib-button>
        <div class="menu-items">
          <ul v-if="show">
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
          </ul>
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
<style lang="scss">
.dropdown-menu {
  .menu-items {
    background-color: $white;
    width: 120px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: 999 !important;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      z-index: 9999999 !important;
      li {
        padding: 5px 10px;
        cursor: pointer;
        span{
          font-size: 14px;
        }
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
