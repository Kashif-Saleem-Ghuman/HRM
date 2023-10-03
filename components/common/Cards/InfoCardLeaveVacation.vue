<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">Available</div>
          <span>{{ balanceLeaveValue || '00' }}</span>

          <div class="subheading_footer">Days</div>
        </div>
        <div>
          <progress-circle
            :progressCount="getpercentageValue == 'Infinity' ? '0' : getpercentageValue"
            :progressPercentage="getpercentageValue == 'Infinity' ? '0' : getpercentageValue + '%'"
            :fill="fill"
            emptyfill="#f1f1f1"
          ></progress-circle>
        </div>
        <!-- <div v-show="item.photo == null ? '' : item.photo">
          <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
        </div> -->
      </div>
      <div class="footer-item d-flex">
        <div class="items">
          <label>Allowance</label>
          <span>{{ totalAllowance }}</span>
        </div>
        <div class="items">
          <label>Used</label>
          <span>{{ daysUsed }}</span>
        </div>
      </div>
      <div
        class="button-wrapper"
        :class="className"
        @click.stop="$emit('on-click')"
      >
        <bib-icon :icon="icon" :variant="variant" class="mr-05"></bib-icon>
        <span>{{ buttonLable }}</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    label: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    item: {
      type: [Object, Array],
    },
    buttonLable: {
      type: String,
    },
    icon: {
      type: String,
    },
    variant: {
      type: String,
    },
    title: {
      type: String,
    },
    className: {
      type: String,
    },
    totalAllowance: {
      type: [String, Number],
    },
    daysUsed:{
      type:Number
    }
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      balanceLeave: '00',
      progress:'0%'
    };
  },
  computed:{
    getpercentageValue(){
      return ( this.daysUsed / this.totalAllowance).toFixed(2) * 100 || '0'
    },
    balanceLeaveValue(){
      return this.balanceLeave = '' ? '00' : this.totalAllowance - this.daysUsed;
    }
  },
  async created(){
    // setTimeout(()=>{
    //   this.balanceLeave = '' ? '00' : this.totalAllowance - this.daysUsed;
    // },1000)
  },
  mounted(){
    
    console.log(this.daysUsed, "this.balanceLeave")
  },
  methods: {
    buttonAction(item) {
      alert("Called", item);
    },
  },
};
</script>
<style lang="scss">

</style>
