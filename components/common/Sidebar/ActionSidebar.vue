<template>
  <div :class="themeClassCommon">
    <div
      v-click-outside="handleClickOutside"
      id="side-panel"
      :class="'side-panel ' + 'side-panel__' + className"
      @click.stop
    >
      <div
        class="d-flex justify-between align-center sidebar-header p-1 m-05"
        :class="borderClassBottom"
      >
        <div class="d-flex justify-between align-center">
          <bib-icon
            :icon="icon"
            :scale="0.9"
            class="mr-05"
            @click="$emit('close')"
          ></bib-icon>
          <label> {{ heading }}</label>
        </div>
        <bib-icon
          icon="close"
          :scale="1.25"
          @click="$emit('close')"
          class="cursor-pointer"
        ></bib-icon>
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
    };
  },
  computed: {
    heightCalculate() {
      return this.classMain;
    },
  },
  methods: {
    handleClickOutside() {
      const ignoreClickOutsideElement = document.getElementById(
        "ignore-click-outside"
      );
      if (
        ignoreClickOutsideElement &&
        ignoreClickOutsideElement.contains(event.target)
      ) {
        return;
      }
      this.$nuxt.$emit("close-sidebar-main");
      this.$nuxt.$emit("close-sidebar");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/variable.scss";
@media (max-width: 599px) {
  .height {
    height: 30vh !important;
  }
}

@media (min-width: 600px) and (max-width: 799px) {
  .height {
    height: 40vh !important;
  }
}

@media (min-width: 800px) and (max-width: 1199px) {
  .height {
    height: 60vh !important;
  }
}

@media (min-width: 1200px) and (max-width: 1899px) {
  .height {
    height: 75vh !important;
  }
}

@media (min-width: 1900px) and (max-width: 2999px) {
  .height {
    height: 78vh !important;
  }
}

@media (min-width: 3000px) {
  .height {
    height: 85vh !important;
  }
}

@media (max-width: 1900px) {
  .heightEdit {
    height: 82vh !important;
  }
}
@media (min-width: 1900px) {
  .heightEdit {
    height: 90vh !important;
  }
}
@media (min-width: 3000px) {
  .heightEdit {
    height: 92vh !important;
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
@media screen and (max-width: 1600px) {
  .side-panel {
    max-width: $sidebar-width - 120px;
    // width: 25rem;
  }
}
@media (min-width: 1200px) {
  body {
    font-size: 12px !important;
  }
}
.side-panel {
  position: fixed;
  z-index: 9999;
  width: $sidebar-width;
  top: 65px;
  bottom: 0;
  background-color: $white;
  right: 0px;
  border-left: 1px solid $secondary-sub3;
  label {
    font-size: 14px;
    font-weight: 600;
    color: $dark;
  }
  // box-shadow: 5px 2px 15px $gray6;
  &__slide-in {
    animation: slidein-right 0.8s;
  }
  &__slide-out {
    animation: slideout 0.8s;
  }
  &__header__actions {
    padding: 0.75rem 1.5rem;
  }
  .sidebar-body-scroll-y {
    overflow-y: auto;
  }
}
.sidebarBodyPadd {
  padding: 24px 24px 12px 24px;
}
</style>
