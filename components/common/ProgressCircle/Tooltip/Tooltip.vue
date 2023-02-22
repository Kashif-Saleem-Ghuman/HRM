<template>
  <div class="p-05" >
    <header>Day 00-00-000</header>
    <div class="mt-05 mb-05 bg-light" style="height: 1px"></div>
    <div>
      <div class="tooltip_list">
        <span>In</span>
        <span>00.00</span>
      </div>
      <div class="tooltip_list">
        <span>Out</span>
        <span>00.00</span>
      </div>
      <div class="tooltip_list">
        <span>On</span>
        <span>00.00</span>
      </div>
      <div class="tooltip_list">
        <span>Off</span>
        <span>00.00</span>
      </div>
      <div class="mt-05 mb-05 bg-light" style="height: 1px"></div>
      <header>More details...</header>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        show:{
            type:Boolean
        }
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
  width: 140px;
  display: none;
  position: absolute;
  background-color: #fff;
  top:50px;
  z-index:1000;
  color:#999 !important
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
   span{
    color:#999 !important
   }
  }
}
</style>
