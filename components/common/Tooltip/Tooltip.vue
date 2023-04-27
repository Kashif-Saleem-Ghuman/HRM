<template>
  <div class="p-05">
    <header>Day 10-03-000</header>
    <div class="mt-05 mb-05 bg-light" style="height: 1px"></div>
    <div v-for="(item, keyI) in data">
      <div class="tooltip_list">
        <span>In</span>
        <span>{{ item.in }}</span>
      </div>
      <div class="tooltip_list">
        <span>Out</span>
        <span>{{ item.end }}</span>
      </div>
      <div class="tooltip_list">
        <span>On</span>
        <span>{{ item.start }}</span>
      </div>
      <div class="tooltip_list">
        <span>Off</span>
        <span>{{ item.end }}</span>
      </div>
    </div>
    <div class="mt-05 mb-05 bg-light" style="height: 1px"></div>
    <div style="text-align: left; width: 10px" class="custom-button">
      <bib-button
        label="More Details..."
        pill
        @click="$emit('vclick', $event)"
        style="padding: 0px"
      ></bib-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },
    time: {
      type: Boolean,
    },
    timeDuration: {
      type: Boolean,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.tooltip-wrapper {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  width: 150px;
  display: none;
  position: absolute;
  background-color: #fff;
  top: 50px;
  color: #1d1d20 !important;
  z-index: 9;
  //   left: 100px;
  header {
    font-size: 1rem;
    padding: 4px 0;
  }
  .tooltip_list {
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #1d1d20;
    }
  }
  .custom-button {
    button {
      padding: 0px !important;
    }
  }
}
</style>
