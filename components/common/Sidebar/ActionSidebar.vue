<template>
  <div :class="themeClassCommon">
    <div
      v-click-outside="handleClickOutside"
      id="side-panel"
      :class="'side-panel ' + 'side-panel__' + className"
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
          <label>Leave request</label> 
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
          <div class="sidebarBodyPadd sidebar-body-scroll-y" :class="borderClassBottom">
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
  .heightEdit {
    height: 38vh !important;
  }
}

@media (min-width: 600px) and (max-width: 799px) {
  .height {
    height: 40vh !important;
  }
  .heightEdit {
    height: 64vh !important;
  }
}

@media (min-width: 800px) and (max-width: 1199px) {
  .height {
    height: 60vh !important;
  }
  .heightEdit {
    height: 73vh !important;
  }
}

@media (min-width: 1200px) and (max-width: 1899px) {
  .height {
    height: 75vh !important;
  }
  .heightEdit {
    height: 85vh !important;
  }
}

@media (min-width: 1900px) and (max-width: 2999px) {
  .height {
    height: 78vh !important;
  }
  .heightEdit {
    height: 90vh !important;
  }
}

@media (min-width: 3000px) {
  .height {
    height: 85vh !important;
  }
  .heightEdit {
    height: 92vh !important;
  }
}

.sidebar-body {
  padding-bottom: 50px !important;
}
.sidebarBodyPadd {
  padding: 24px 24px 12px 24px;
}
</style>
