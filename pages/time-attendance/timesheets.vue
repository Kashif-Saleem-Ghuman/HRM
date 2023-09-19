<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker">
          <week-date-picker :dates.sync="weekDates"></week-date-picker>
        </div>
      </div>

      <div class="d-flex align-center">
        <div class="d-flex align-center mr-05">
          <span class="mr-05">Search:</span>
          <bib-input size="sm" type="text" test_id="srchInput01"> </bib-input>
        </div>
        <div class="d-flex align-center">
          <div style="" class="mr-05">Show:</div>
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
    <div
      class="d-grid d-flex gap-1 py-1 px-1"
      style="grid-template-columns: repeat(3, 1fr)"
    >
      <absent-present-card
        :item="absentPresentCardData[0]"
        title="Timesheet past due"
      ></absent-present-card>
      <absent-present-card
        :item="absentPresentCardData[1]"
        title="Timesheets pending"
      ></absent-present-card>
    </div>
    <div class="scroll_wrapper">
      <div>
        <list-timesheet :timesheetsList="timesheetsList"></list-timesheet>
        <loader v-bind:showloader="loading"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import { TimesheetParser } from "../../utils/timesheet-parsers/timesheet-parser";
import { ABSENT_INFO_CARD_DATA } from "../../utils/constant/DashboardData";
import { getTimeAttendanceCustomRange } from "../../utils/functions/api_call/timeattendance/time";
export default {
  data() {
    return {
      weekDates: { from: null, to: null },
      loading: true,
      employees: [],
      absentPresentCardData: ABSENT_INFO_CARD_DATA,
      timesheetsList: [],
    };
  },

  methods: {
    async generateWeekDaysEntries() {
      this.loading = true;
      const { from, to } = this.weekDates;
      let timesheets = await getTimeAttendanceCustomRange({ from, to });
      timesheets = timesheets.map((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("weekDays");
      });
      this.timesheetsList = timesheets;
      this.loading = false;
    },
  },

  watch: {
    weekDates: {
      deep: true,
      handler: function (newVal, oldVal) {
        console.log({ newVal, oldVal });
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.generateWeekDaysEntries();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>