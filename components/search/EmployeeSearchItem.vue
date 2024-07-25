<template>
  <div class="d-flex align-center p-05" @click="handleEmployeeClick(item)">
    <bib-avatar :src="item.photo" class="mr-05" size="1.5rem" style="margin-left: 2px;"></bib-avatar>
    <div :title="getEmployeeFullName(item)" class="font-md" style="width: 70%;" :class="isLightThemeCheck ? 'text-gray1' : 'text-light'">{{ getEmployeeFullName(item) | truncate(55, "...") }}</div>
  </div>
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