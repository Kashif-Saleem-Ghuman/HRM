<template>
  <div :class="themeClassCommon">
    <div
      v-click-outside="handleClickOutside"
      id="side-panel"
      :class="'side-panel ' + 'side-panel__' + className"
    >
      <div
        class="d-flex justify-between align-center py-1"
        :class="borderClassBottom"
      >
        <!-- Header Left Section -->
        <div class="d-flex align-center pl-1 flex-grow-1 pay-side-panel">
          <div class="pay-header-title">
            <bib-icon :icon="icon" :scale="1.2" class="mr-05"></bib-icon>
            <label>{{ heading }}</label>
          </div>
        </div>
        <div class="d-flex gap-05 align-center pr-1 pl-1" id="icons-wrapper-sidebar">
          <div
            v-for="icon in sidebarIcons"
            :key="icon.id"
            :class="getIconClass"
            class="p-025 cursor-pointer shape-circle width-2 height-2 d-flex align-center justify-center"
            :id="'header-icon-' + icon.id"
          >
            <div @click="handleIconClick(icon)">
              <bib-icon :icon="icon.icon" variant="gray5" :scale="1"></bib-icon>
            </div>
            <!-- Dropdown Menu -->
            <div
              v-if="icon.dropdown && visibleDropdown === icon.id"
              class="dropdown-menu"
            >
            <div class="list position-absolute">
            <span
              class="list__item"
                  v-for="item in icon.menuItems"
                  :key="item.action"
                  @click="$emit(item.action)"
                >
                  {{ item.label }}
            </span>
          </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar-body">
        <div :class="'sidebar-body-scroll-y ' + classMain">
          <div class="sidebarBodyPadd" :class="borderClassBottom">
            <slot name="sidebar-body"></slot>
          </div>
        </div>
        <div
          class="sidebar-footer px-1 py-1 d-flex justify-end align-end h-100"
          v-if="show == 'true'"
        >
          <slot name="sidebar-footer"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PAY_SIDEBAR_ICONS } from "../../../utils/constant/pay/PaySidebarHeaderActions";
export default {
  name: "ActionSidebar",
  props: {
    className: String,
    classMain: String,
    heading: String,
    icon: String,
    copyLink: String,
    show: String,
    openSidebar: Boolean,
  },
  data() {
    return {
      isFileFavorite: false,
      sidebarIcons: PAY_SIDEBAR_ICONS,
      visibleDropdown: null, // Tracks the currently open dropdown
    };
  },
  computed: {
    heightCalculate() {
      return this.classMain;
    },
    getIconClass() {
      return this.isLightThemeCheck
        ? "bg-light bg-hover-gray2"
        : "bg-dark-sub1 bg-hover-dark-sub3";
    },
  },
  methods: {
    handleClickOutside(event) {
      const ignoreClickOutsideElement = document.getElementById(
        "ignore-click-outside"
      );
      if (
        ignoreClickOutsideElement &&
        ignoreClickOutsideElement.contains(event.target)
      ) {
        return;
      }
      const sidePanel = document.getElementById("side-panel");
      if (sidePanel && !sidePanel.contains(event.target)) {
        this.$emit("close");
      }
      this.visibleDropdown = null; // Close the dropdown when clicking outside
    },
    handleIconClick(icon) {
      if (icon.dropdown) {
        this.visibleDropdown = this.visibleDropdown === icon.id ? null : icon.id;
      } else {
        this.$emit(icon.emitEvent);
      }
    },
  },
};
</script>

<style lang="scss">
.pay-side-panel {
  .pay-header-title {
    display: flex;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid $dark-sub3;
  }
}

.dropdown-menu {
  position: relative;
  .list{
    width: 200px;
  border: 1px solid $dark-sub3;
  border-radius: 6px;
  }
}
</style>
