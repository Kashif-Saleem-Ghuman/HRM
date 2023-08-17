<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">Available</div>
          <span>{{ balanceLeave || '00' }}</span>

          <div class="subheading_footer">Days</div>
        </div>
        <div>
          <progress-circle
            :progressCount="( daysUsed / this.totalAllowance).toFixed(2) * 100"
            :progressPercentage="(daysUsed / this.totalAllowance ).toFixed(1) * 100 + '%'"
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
        class="button-wrapper mb-1"
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
  name: "Chips",
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
      type: String,
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
  async created(){
    setTimeout(()=>{
      this.balanceLeave = '' ? '00' : this.totalAllowance - this.daysUsed;
    },1000)
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
.info-card-leave-wrapper {
  padding: 12px 12px 0px 12px;
  font-size: 14px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e2e3;
  overflow-wrap: break-word;
  label {
    font-size: 1rem;
    font-weight: 600;
  }
  .info-card-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .subheading {
      font-weight: 500;
      color: #b1b1b4;
      margin-bottom: -10px;
    }
    span {
      font-size: 56px;
      font-weight: 500;
      margin-left: -4px;
    }
    .subheading_footer {
      font-weight: 500;
      color: #b1b1b4;
      margin-top: -10px;
    }
    &_desc {
      font-size: 10px;
    }
  }
  .footer-item {
    padding-top: 16px;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    .items {
      display: flex;
      justify-content: space-between;
      width: 50%;
      padding-right: 10px;
      align-items: center;
      label {
        color: #b1b1b4;
        font-weight: normal;
      }
      span {
        font-weight: 600;
      }
    }
  }
}
.button-wrapper {
  background-color: $light;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &__bgsucess {
    background-color: #2ba026;
    svg {
      fill: #fff !important;
    }
    span {
      color: #fff;
      font-weight: 400;
      font-size: 14px;
    }
  }
  &__bgalert {
    background-color: #ea4a4a;
    svg {
      fill: #fff !important;
    }
    span {
      color: #fff;
      font-weight: 400;
      font-size: 14px;
    }
  }
  &__bgwarnning {
    background-color: #fabc2a;
    svg {
      fill: #fff !important;
    }
    span {
      color: #fff;
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>
