<template>
  <div class="dropdown-menu" style="z-index: 99">
    <div class="d-flex align-center">
      <label class="pr-05" v-show="sectionLabel">{{ sectionLabel }}</label>
      <div style="position: relative; z-index: 99">
        <bib-button
          :label="label"
          :variant="variant ?? 'light'"
          size="lg"
          :icon="icon ?? ''"
          @click="show = !show"
          v-click-outside="clickOutside"
          :class="className"
        ></bib-button>
        <div class="menu-items">
          <ul v-if="show">
            <li
              class="d-flex align-center"
              v-for="item in items"
              @click="$emit('on-click', item)"
              style="cursor: pointer"
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
    label: {
      type: String,
    },
    variant: {
      type: String,
    },
    icon: {
      type: String,
    },
    sectionLabel: {
      type: String,
    },
    className: {
      type: String,
    },
    items: {
      type: Array,
    },
    listIcon: {
      type: String,
    },
    listIconVariant: {
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
      border: 1px solid #f2f2f5;
      border-radius: 0.2rem;
      background-color: #f2f2f5;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: #fff;
        color: #6d7278;
      }
    }
  }
  .menu-items {
    background-color: #fff;
    width: 107px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: -1px;
    top: -1px;
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
  .button-wrapper {
    &__bgblack {
      background-color: #000 !important;
      color: #fff !important;
      svg {
        fill: #fff !important;
      }
      span {
        color: #fff !important;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
}
</style>
