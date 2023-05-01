<template>
  <div
    id="side-panel"
    :class="'side-panel ' + 'side-panel__' + className"
  >
    <div class="d-flex p-1 justify-between align-center sidebar-header">
      <div class="d-flex justify-between align-center">
        <bib-icon
          icon="add"
          style="margin-right: 4px;"
          :scale="0.9"
          @click="$emit('close')"
        ></bib-icon>
        <label> {{ heading }}</label>
      </div>
      <bib-icon icon="close" :scale="1.25" @click="$emit('close')" style="cursor: pointer;"></bib-icon>
    </div>
    <div style="height: 1px; background-color: #eee"></div>
    <div class="sidebar-body">
      <div class="of-scroll-x p-1">
        <slot name="sidebar-body"></slot>
      </div>
      <div style="height: 1px; background-color: #eee"></div>
      <div class="sidebar-footer p-1">
        <slot name="sidebar-footer"></slot>
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
      console.log("close");
      this.$emit("close-sidebar");
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
    max-width: $sidebar-width - 160px;
    width: 35rem;
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
