<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker pt-1">
          <week-date-picker :dates.sync="weekDates"></week-date-picker>
        </div>
      </div>

      <div class="d-flex align-center">
        <div class="d-flex align-center mr-05">
          <span class="mr-05">Search:</span>
          <bib-input size="sm" type="text" test_id="srchInput01"> </bib-input>
        </div>
        <div class="d-flex align-center">
          <div style="font-size: 14px" class="mr-05">Show:</div>
          <button
            type="button"
            @click="$emit('on-click')"
            class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
          >
            All
          </button>
        </div>
      </div>
    </div>
    <div class="scroll_wrapper">
      <div>
        <timesheets-approval-table
          type="pending"
          :dates.sync="weekDates"
        ></timesheets-approval-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekDates: { from: null, to: null },
    };
  },
};
</script>

<style>
</style>