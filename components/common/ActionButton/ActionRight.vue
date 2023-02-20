<template>
  <div class="d-flex">
    <!-- <button-circle
      icon="arrowhead-down"
      :scale="1"
      variant="secondary"
      icon_bg="bg-secondary-sub3"
      @on-click="changeViewName('sort')"
      class="mr-05"
    ></button-circle> -->
    <!-- <button-circle icon="techno" :scale="1" variant="secondary" icon_bg="bg-secondary-sub3"></button-circle> -->
          <dropdown-menu
            :items="items"
            @click="$emit('vclick', $event)"
            style="margin-left: -10px"
            dropDowmMenu="dropDowmMenu"
            popIcon="arrowhead-down"
          ></dropdown-menu>
  </div>
</template>

<script>
import { TABLE_FIELDS } from "../../../utils/constant/Constant.js";

export default {
  props: {
    moreIcon: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
    },
    bookmark: {
      type: String,
      default: "",
    },
  },
  name: "ActionRight",

  return: {
    TABLE_FIELDS: TABLE_FIELDS,
    key: "sort",
  },
  methods: {
    changeViewName($event) {
      // alert($event)
      this.$emit("change-sort", $event);
    },
    //     employe(){
    //     this.TABLE_FIELDS.sort();
    //     console.log(TABLE_FIELDS, "called")
    //   }
  },
};
</script>

<style lang="scss">
.button-title {
  font-size: 0.8rem;
}
</style>
