<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 py-025 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker">
          <date-selector :dates.sync="dates" />
        </div>
      </div>

      <div class="d-flex align-center">

        <search-input :on-change-fn="onSearchChange" :debounce-ms="300"></search-input>

        <!-- <div class="d-flex align-center">
          <div style="" class="mr-05">Show:</div>
          <button
            type="button"
            @click="$emit('on-click')"
            class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
          >
            All
          </button>
        </div> -->
      </div>
    </div>
    <div class="scroll_wrapper">
      <div>
        <timesheets-approval-table
          v-if="dates.from && dates.to"
          type="pending"
          :dates.sync="dates"
          :searchString="searchString"
        ></timesheets-approval-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: { from: null, to: null },
      searchString: null
    };
  },

  methods: {
    onSearchChange(value) {
      this.searchString = value
    }
  }
  
};
</script>

<style>
</style>