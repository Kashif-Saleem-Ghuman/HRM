<template>
  <div class="d-grid gap-1" style="grid-template-columns: repeat(4, 1fr)">
    <div class="info-card-leave-wrapper" v-for="(item, index) in items">
      <div>
        <label>{{ item.title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">Available</div>
          <!-- <label>{{ item.numberData }}</label> -->
          <span>23</span>

          <div class="subheading_footer">Days</div>
          <!-- <bib-avatar src="https://placekitten.com/300/300"></bib-avatar> -->
        </div>
        <div>
          <progress-circle
            :progressCount="70"
            :fill="fill"
            emptyfill="#D5E8D4"
          ></progress-circle>
        </div>
      </div>
      <div class="footer-item d-flex">
       <div class="items">
        <label>Allowance</label>
        <span>31</span>
       </div>
       <div class="items">
        <label>Used</label>
        <span>4</span>
       </div>
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
    items: {
      type: Array,
    },
  },
  data() {
    return {
        //   fill : { gradient: [ "#FABC2A", "#FF0E00", "#2BA026"] },
        
      };
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
  .footer-item{
        padding-top: 16px;
        padding-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        .items{
            display: flex;
            justify-content: space-between;
            width: 50%;
            padding-right: 10px;
            align-items: center;
            label{
                color: #B1B1B4;
                font-weight: normal;
            }
            span{
                font-weight: 600;
            }
        }
    }
}
</style>
