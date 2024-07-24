<template>
  <li @click="handleEmployeeClick(item)">
    <bib-avatar :src="item.photo" class="mx-05"></bib-avatar>
    <div :title="getEmployeeFullName(item)" style="width: 70%;">{{ getEmployeeFullName(item) | truncate(55, "...") }}</div>
  </li>
</template> 

<script>
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "@/utils/functions/common_functions";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    getEmployeeFullName,
  getEmployeeInitials,
    handleEmployeeClick(item) {
      const { id } = item
      this.$router.push(`/profile/${id}`);
    }
  }

}
</script>

<style></style>