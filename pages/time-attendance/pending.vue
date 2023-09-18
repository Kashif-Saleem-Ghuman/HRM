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