<template>
  <div v-intersect="{ onIntersect: () => $emit('handle-pagination-load') }" :class="['observer', 'position-relative', { 'pagination-loading': paginationLoading }]">
    <p class="text-center pb-05 font-md" v-if="hasNoMoreData">No more data...</p>
    <loader :loading="!hasNoMoreData && paginationLoading"></loader>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  props: {
    hasNoMoreData: {
      type: Boolean,
      default: false,
    },
    paginationLoading: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="scss">
.observer {
  height: 1px;
  margin-bottom: 1px;
}
.observer.pagination-loading {
  height: 40px;
  padding-top: 40px;
  padding-bottom: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
