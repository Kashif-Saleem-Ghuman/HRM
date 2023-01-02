<template>
    <div class="d-flex">
        <button-circle icon="arrowhead-down" :scale="1" variant="secondary"  icon_bg="bg-secondary-sub3" @on-click="changeViewName('sort')" class="mr-05"></button-circle>
        <button-circle icon="techno" :scale="1" variant="secondary" icon_bg="bg-secondary-sub3"></button-circle>
    </div>
</template>

<script>
  import {TABLE_FIELDS} from '../../../utils/constant/Constant.js'

export default {
    name: 'ActionRight',  
     
    return:{
        TABLE_FIELDS:TABLE_FIELDS,
        key:"sort"

    },
    methods:{
        changeViewName($event) {
            // alert($event)
      this.$emit("change-sort", $event)
    },
    //     employe(){
    //     this.TABLE_FIELDS.sort();
    //     console.log(TABLE_FIELDS, "called")
    //   }
    }
}
</script>

<style lang="scss">
.button-title{
    font-size: 0.8rem;
}
</style>