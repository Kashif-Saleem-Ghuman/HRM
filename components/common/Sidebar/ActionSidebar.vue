<template>
  <div
    id="side-panel"
    :class="'side-panel ' + 'side-panel__' + className"
    style="z-index: 10000"
  >
    <div
      class="d-flex justify-between align-center sidebar-header"
      style="padding: 24px"
    >
      <div class="d-flex justify-between align-center">
        <bib-icon
          icon="add"
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
        style="cursor: pointer"
      ></bib-icon>
    </div>
    <div style="height: 1px; background-color: #eee"></div>
    <div class="sidebar-body">
      <div class="of-scroll-x" style="height: 72vh">
        <div style="padding: 24px"><slot name="sidebar-body"></slot></div>
      </div>
      <div style="height: 1px; background-color: #eee"></div>
      <div
        class="sidebar-footer p-1"
        style="
          height: 10vh;
          display: flex;
          justify-content: end;
          align-items: end;
        "
      >
        <slot name="sidebar-footer">
          <!-- <div class="d-flex align-center" v-if="copyLink">
              <bib-icon
                icon="attachment"
                :scale="0.8"
                variant="success"
                style="margin-right: 5px"
              ></bib-icon>
              <span style="color: #2ba026; font-size: 14px">Copy Link</span>
            </div> -->
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActionSidebar",
  props: {
    className: {
      type: String,
    },
    heading: {
      type: String,
    },
    copyLink: {
      type: String,
    },
  },
  data() {
    return {
      property: {
        name: "File Name",
        colorLabel: "secondary-sub2",
        preview: "https://loremflickr.com/640/360",
        type: "Image",
        size: "234",
      },
      isFileFavorite: false,
    };
  },
  methods: {
    closeSidebar() {
      this.$nuxt.$emit("close-sidebar");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/variable.scss";
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
    // max-width: $sidebar-width - 120px;
    width: 35rem;
  }
}
@media (min-width: 1200px) {
  body {
    font-size: 12px !important;
  }
}
.side-panel {
  position: fixed;
  z-index: 1000;
  width: $sidebar-width;
  top: 65px;
  bottom: 0;
  background-color: $white;
  right: 0px;
  border-left: 1px solid #f2f2f5;
  label {
    font-size: 14px;
    font-weight: 600;
    color: #1d1d20;
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
}
</style>
