<template>
  <div class="info-card-success-wrapper">
      <span>Leave status</span>
    <div class="info-card-inner-wrapper" :class="[classNameWrapper]">
      <div
        class="d-flex align-center cursor-pointer shape-circle mr-05"
        style="padding: 10px"
        @click.stop="$emit('on-click')"
        :class="[className]"
      >
        <bib-icon :icon="icon" :variant="variant" :scale="1"></bib-icon>
      </div>
      <div>
        <div class="label">{{label}}</div>
        <div class="info-card-inner-wrapper_desc" v-if="label==='Rejected'">Request denied on {{ deniedRequest(data) }}</div>
        <div class="info-card-inner-wrapper_desc"><!--Request approved by + --> {{message}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getEmployeeFullName } from "@/utils/functions/common_functions";
import { DateTime } from 'luxon';

export default {
  name: "Chips",
  props: {
    label: {
      type: String,
    },
    message: {
      type: String,
    },
    icon: {
      type: String,
    },
    variant: {
      type: String,
    },
    className:{
      type:String
    },
    classNameWrapper:{
      type:String
    },
    data:{
      type:Array
    }
  },
  data() {
    return {
      manager:'',
    };
  },
  methods:{
    getEmployeeFullName,
    deniedRequest(data){
      var name = this.getEmployeeFullName(data.manager)
      const statusChangeDate = DateTime.fromISO(data.statusChangeDate).toFormat('dd-MM-yyyy');
      return `${statusChangeDate} by ${name} `
    }
  }
};
</script>
<style lang="scss">
.info-card-success-wrapper {
  padding: 8px 0 0px 0;
  font-size: 14px;
  span {
    font-size:14px;
    font-weight: 600;
    color: #85858F;
  }
  .info-card-inner-wrapper {
    display: flex;
    background-color: $light;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 8px;
    .label {
      font-weight: 600;
      font-size: 14px;
    }
    &_desc {
      font-size: 12px;
    }
  }
}
</style>
