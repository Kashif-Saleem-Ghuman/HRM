<template>
    <div class="d-flex">
      <div class="info-card-leave-wrapper" style="width: 100%">
        <div>
          <label>My status</label>
        </div>
        <div class="info-card-items mt-05">
          <div>
            <div class="subheading">in 00:00:00</div>
            <span>00:00:00</span>
  
            <div class="subheading_footer">out 00:00:00</div>
          </div>
        </div>
        <div class="footer-item d-flex">
        <div class="items">
          <label>Break</label>
          <span>00:00</span>
        </div>
        <div class="items">
          <label>Total work</label>
          <span>00:00</span>
        </div>
      </div>
      <div
        class="button-wrapper mb-1"
        :class="className"
        @click.stop="$emit('on-click')"
      >
        <bib-icon :icon="icon"  class="mr-05"></bib-icon>
        <span>{{ buttonLable }}</span>
      </div>
      </div>
      
    </div>
  </template>
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
      item: {
        type: Object,
      },
      buttonLable: {
        type: String,
      },
      icon: {
        type: String,
      },
      buttonVariant: {
        type: String,
      },
      className:{
        type:String
      }
    },
    data() {
      return {
        fill: { gradient: ["#ffb700", "#47b801"] },
      };
    },
    methods: {
      buttonAction(item) {
        alert("Called", item);
      },
    },
  };
  </script>
  <style lang="scss">
.items{
    border-bottom: 1px solid #eee;
    height: 40px;
    border-right: 33px solid #fff;
}

</style>
  