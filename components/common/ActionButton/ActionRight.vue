<template>
  <div class="d-flex">
    <button-circle
      v-if="calander"
      icon="calendar"
      :scale="1"
      variant="secondary"
      icon_bg="bg-secondary-sub3"
      class="mr-05"
    ></button-circle>
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
    calander: {
      type: String,
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
  },
};
</script>

<style lang="scss">
.button-title {
  font-size: 0.8rem;
}
</style>
