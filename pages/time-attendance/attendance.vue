<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="mr-05">Date:</div>
        <bib-datetime-picker
          v-model="date"
          @input="onDateChange"
          :maxDate="maxDate"
          class="custom-date-picker"
        ></bib-datetime-picker>
      </div>

      <div class="d-flex">
        <div class="d-flex align-center">
          <div class="mr-05">Show:</div>
          <button
            type="button"
            class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
          >
            All
          </button>
        </div>
      </div>
    </div>

    <div class="scroll_wrapper">
      <div>
        <list-dashboard :userList="employees"></list-dashboard>
        <loader :showloader="loading"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import fecha, { format } from "fecha";
import { getTimeAttendance } from "../../utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "../../utils/timesheet-parsers/timesheet-parser";
import { DateTime } from "luxon";
export default {
  data() {
    return {
      format: "dddd, MM MMMM, YYYY",
      date: format(new Date(), "dddd, MM MMMM, YYYY"),
      loading: true,
      employees: [],
      maxDate: DateTime.now().endOf("day").toISO(),
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
      const date = value ? format(new Date(value), "DD-MM-YYYY") : null;
      this.date = date;
      this.generateOrganizationEntries();
    },

    async generateOrganizationEntries() {
      this.loading = true;
      let date = this.date;
      date = format(new Date(), "YYYY-MM-DD")
      console.log(date, "YYYY-MM-DDYYYY-MM-DDYYYY-MM-DD")
      const { employees } = await getTimeAttendance({ date });
      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      this.employees = employees;
      this.loading = false;
    },
  },

  created() {
    this.generateOrganizationEntries();
  },
};
</script>

<style lang="scss">
.vdpComponent__input{
  background-color: #F2F2F5 !important;
  width: 300px !important;
}
</style>