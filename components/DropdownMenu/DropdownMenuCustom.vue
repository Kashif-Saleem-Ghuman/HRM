<template>
  <div class="dropdown-menu">
    <div class="d-flex align-center px-1 py-05">
      <label class="pr-05">{{ sectionLabel }}</label>
      <div style="position: relative">
        <bib-button
          :label="buttonLabel"
          :variant="buttonVariant || 'light'"
          size="lg"
          @click="show = !show"
          :icon="buttonIconShow == true ? buttonIcon : false"
          v-click-outside="clickOutside"
          class="pr-05"
        ></bib-button>
        <div class="menu-items">
          <ul v-if="show">
            <li class="d-flex align-center" v-for="item in items">
              <bib-icon
                :icon="listIcon"
                :scale="0.7"
                :variant="listIconVariant || 'secondary'"
                v-show="listIcon == null ? false : true"
                class="mr-05"
              ></bib-icon>
              <span
                @click="$emit('on-click', item)"
                style="cursor: pointer"
                >{{ item.label }}</span
              >
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
    sectionLabel: {
      type: String,
    },
    items: {
      type: Array,
    },
    buttonLabel: {
      type: String,
    },
    buttonIconShow: {
      type: Boolean,
    },
    buttonVariant: {
      type: String,
    },
    buttonIcon: {
      type: String,
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
    left: 0px;
    top: 0px;
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
}
</style>
