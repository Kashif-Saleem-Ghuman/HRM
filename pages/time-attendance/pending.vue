<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker pt-1">
          <date-selector :dates.sync="dates" />
        </div>
      </div>

    </div>
    <div class="scroll_wrapper">
      <div>
        <timesheets-approval-table
          v-if="dates.from && dates.to"
          type="pending"
          :dates.sync="dates"
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
    };
  },
};
</script>

<style>
</style>