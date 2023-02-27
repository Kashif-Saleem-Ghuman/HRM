<template>
  <div class="flex_grid py-2 px-1">
    <div class="card-wrapper mb-2 mr-2" v-for="(item, index) in items">
      <div class="card-header-icon">
        <div class="card-shadow-box-one"></div>
        <div class="card-shadow-box-two"></div>
        <div class="card-shadow-box-three"></div>
      </div>
      <div class="card-items-title">{{item.label}}</div>
      <div class="card-footer-item"># {{ item.hashItem }}</div>
    </div>
    
  </div>
</template>
<!-- :class="[
          variant ? 'chip-wrapper' + variant : '',
          shapeCircle ? 'chip-wrapper' + shapeCircle : ''
          ]" -->
<script>
export default {
  name: "Chips",
  props: {
    label: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    items:{
        type:Array
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.card-wrapper {
  padding: 16px;
  font-size: 14px;
  width: 204.8px;
  background: #f8f8f9;
  border-radius: 8px;
  .card-header-icon {
    position: relative;
    min-height: 40px;
    .card-shadow-box-one {
      background: #e2e2e3;
      height: 28px;
      width: 28px;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .card-shadow-box-two {
      background: #e2e2e3;
      height: 28px;
      width: 28px;
      border-radius: 4px;
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      opacity: 0.32;
    }
    .card-shadow-box-three {
      background: #e2e2e3;
      height: 28px;
      width: 28px;
      border-radius: 4px;
      position: absolute;
      top: 1rem;
      left: 1rem;
      opacity: 0.16;
    }
  }
  .card-items-title {
    font-weight: 500;
   padding: 28px 0;
    display: flex;
    align-items: center;
  }
  .card-footer-item {
    font-weight: 400;
  }
}
</style>
