<template>
  <div class="dropdown-menu">
    <div class="d-flex align-center">
      <label class="pr-05" v-show="sectionLabel">{{ sectionLabel }}</label>
      <div class="position-relative">
        <bib-button
          :label="String(label)"
          :variant="variant ?? $button.blackButton.variant"
          size="lg"
          :icon-right="icon ?? $button.blackButton.icon"
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
    width: 120px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    // top: -1px;
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
