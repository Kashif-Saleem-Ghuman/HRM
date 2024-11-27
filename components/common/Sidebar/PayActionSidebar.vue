<template>
  <div :class="themeClassCommon">
    <div
      v-if="isSidebarExpanded"
      class="overlay"
      @click.stop="resetSidebar"
    ></div>

    <div
      v-click-outside="handleClickOutside"
      id="side-panel"
      :class="['side-panel', 'side-panel__' + className, expandSidebarClass]"
    >
      <div
        class="d-flex justify-between align-center py-1"
        :class="borderClassBottom"
      >
        <div class="d-flex align-center pl-1 flex-grow-1 pay-side-panel">
          <div class="pay-header-title">
            <bib-icon :icon="icon" :scale="1.2" class="mr-05"></bib-icon>
            <label>{{ heading }}</label>
          </div>
        </div>
        <div
          class="d-flex gap-05 align-center pr-1 pl-1"
          id="icons-wrapper-sidebar"
        >
          <div
            v-for="icon in sidebarIcons"
            :key="icon.id"
            :class="getIconClass"
            class="p-025 cursor-pointer shape-circle width-2 height-2 d-flex align-center justify-center"
            :id="'header-icon-' + icon.id"
          >
            <div v-if="!icon.component" @click="handleIconClick(icon)">
              <bib-icon
                :icon="icon.icon"
                variant="gray5"
                :scale="0.9"
              ></bib-icon>
            </div>
            <div v-else>
              <component
                :is="icon.component"
                :menuItems="icon.menuItems"
                @click="handleIconClick(icon)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar-body">
        <div :class="'sidebar-body-scroll-pay ' + classMain">
          <div class="sidebarBodyPadd">
            <slot name="sidebar-body"></slot>
          </div>
        </div>
        <div
          class="sidebar-footer px-1 py-1 d-flex justify-end align-end h-100"
          v-if="show === 'true'"
        >
          <slot name="sidebar-footer"></slot>
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
      visibleDropdown: null,
      isSidebarExpanded: false,
    };
  },
  computed: {
    getIconClass() {
      return this.isLightThemeCheck
        ? "bg-light bg-hover-gray2"
        : "bg-dark-sub1 bg-hover-dark-sub3";
    },
    expandSidebarClass() {
      return this.isSidebarExpanded
        ? "sidebar-expanded sidebar-slide-center"
        : "sidebar-slide-default";
    },
  },
  methods: {
    resetSidebar() {
      this.isSidebarExpanded = false;
      this.sidebarIcons = this.sidebarIcons.map((item) =>
        item.id === "expand"
          ? {
              ...item,
              icon: this.isSidebarExpanded
                ? "collapse-fullscreen"
                : "expand-fullscreen",
            }
          : item
      );
    },
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
      if (
        !this.isSidebarExpanded &&
        sidePanel &&
        !sidePanel.contains(event.target)
      ) {
        this.$emit("close");
      }
      this.visibleDropdown = null;
    },
    handleIconClick(icon) {
      if (icon.id === "expand") {
        this.isSidebarExpanded = !this.isSidebarExpanded;
        this.sidebarIcons = this.sidebarIcons.map((item) =>
          item.id === "expand"
            ? {
                ...item,
                icon: this.isSidebarExpanded
                  ? "collapse-fullscreen"
                  : "expand-fullscreen",
              }
            : item
        );
        return;
      }

      if (icon.id === "close" && this.isSidebarExpanded) {
        this.resetSidebar();
        return;
      }

      this.visibleDropdown = icon.dropdown
        ? this.visibleDropdown === icon.id
          ? null
          : icon.id
        : this.$emit(icon.emitEvent);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/variable.scss";

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

@keyframes slidein-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideout {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.side-panel {
  position: fixed;
  z-index: 9999;
  width: $pay-sidebar-width !important;
  top: 65px;
  bottom: 0;
  background-color: $white;
  right: 0;
  border-left: 1px solid $secondary-sub3;
  transition: transform 0.8s ease;

  &__slide-in {
    animation: slidein-right 0.8s;
  }
  &__slide-out {
    animation: slideout 0.8s;
  }
  &.sidebar-slide-default {
    transform: translateX(0);
  }
  &.sidebar-expanded {
    transform: translateX(-100%);
    top: 0 !important;
    border: 1px solid $dark-sub3;
  }
}
.sidebar-body-scroll-pay{
  overflow: auto;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9998;
}
.sidebarBodyPaddPay {
  padding: 12px;
}
</style>
