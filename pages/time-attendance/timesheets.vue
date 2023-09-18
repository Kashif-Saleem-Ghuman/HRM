<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker">
          <div class="mr-05">Date:</div>
          <bib-datetime-picker
            v-model="date"
            @input="onDateChange"
            class="custom_date_picker"
          ></bib-datetime-picker>
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
import fecha, { format } from "fecha";
import { TimesheetParser } from "../../utils/timesheet-parsers/timesheet-parser";
import { DateTime } from "luxon";
import { ABSENT_INFO_CARD_DATA } from "../../utils/constant/DashboardData";
import { getWeekStartEndDates } from "../../utils/functions/dates";
import { getTimeAttendanceCustomRange } from "../../utils/functions/api_call/timeattendance/time";
export default {
  data() {
    return {
      format: "MMM D, YYYY",
      date: format(new Date(), "dddd, MM MMMM, YYYY"),
      loading: true,
      employees: [],
      maxDate: DateTime.now().endOf("day").toISO(),
      absentPresentCardData: ABSENT_INFO_CARD_DATA,
      timesheetsList: [],
    };
  },

  methods: {
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },

    onDateChange(value) {
      const date = value ? format(new Date(value), "YYYY-MM-DD") : null;
      this.date = date;
      this.generateWeekDaysEntries();
    },

    async generateWeekDaysEntries() {
      this.loading = true;
      const date =  format(new Date(), "YYYY-MM-DD")

      const { from, to } = getWeekStartEndDates(date);

      let timesheets = await getTimeAttendanceCustomRange({ from, to });
      timesheets = timesheets.map((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("weekDays");
      });
      this.timesheetsList = timesheets;
      this.loading = false;
    },
  },

  created() {
    this.generateWeekDaysEntries();
  },
};
</script>

<style lang="scss" scoped></style>