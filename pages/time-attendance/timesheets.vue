<template>
  <div>
    <div
      class="d-flex justify-between align-center px-1 py-025 bottom_border_wrapper"
    >
        <div class="custom-date-picker">
          <button-with-overlay
            sectionLabel="View: "
            :button-config="{ label: dateBtnLabel }"
            @on-click="leaveStatus($event)"
            v-slot="scope"
          >
            <div class="pl-05">
              <week-date-picker @close="scope.close" :dates.sync="weekDates"></week-date-picker>
            </div>
        
          </button-with-overlay>
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
    <div
      class="d-grid d-flex gap-1 py-1 px-1"
      style="grid-template-columns: repeat(3, 1fr)"
    >
    <pending-timesheets-widget :startDate="weekDates.from" :endDate="weekDates.to" />

    <past-due-timesheets-widget  :startDate="weekDates.from" :endDate="weekDates.to" />

    </div>
    <div class="scroll_wrapper">
      <div>
        <list-timesheet :timesheetsList="timesheetsList" :startDate="weekDates.from" :endDate="weekDates.to"></list-timesheet>
        <loader :loading="loading"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import { TimesheetParser } from "../../utils/timesheet-parsers/timesheet-parser";
import { processEmployeeRequests } from "../../utils/requests/employee-request-processor";
import { getTimeAttendanceCustomRange } from "../../utils/functions/api_call/timeattendance/time";
import { weekToUTCWeek, getSystemWeekRangeInUtc } from "../../utils/functions/dates"
import { DateTime } from "luxon";
import {DATETIME_FORMAT} from "@/utils/functions/datetime-input";

export default {
  data() {
    return {
      weekDates: { from: null, to: null },
      loading: true,
      employees: [],
      timesheetsList: [],
      showDatePicker: false,
      searchString: null,
      pagination: {
        page: 1,
        limit: 10,
      },
    };
  },

  computed: {
    dateBtnLabel() {
      const weekDates = this.weekDates
      if (!weekDates || !weekDates?.from || !weekDates?.to) return ""
      const { from, to } = weekDates
      return this.formatDates({ from, to })
    }
  },
  mounted() {
    this.registerRootListener();
  },
  beforeDestroy() {
    this.unregisterRootListener();
  },
  methods: {
    weekToUTCWeek,
    getSystemWeekRangeInUtc,
    onSearchChange(event) {
      this.searchString = event
      if (this.loading) return;
      this.generateWeekDaysEntries()
    },

    unregisterRootListener() {
      this.$root.$off('get-time-attendance');
    },
    registerRootListener() {
      this.$root.$on('get-time-attendance', () => {
        this.generateWeekDaysEntries();
      })
    },
    dateBtnClick() {
      this.showDatePicker = !this.showDatePicker
    },
    async generateWeekDaysEntries() {
      const { searchString } = this

      this.loading = true;

      try {
        const { from, to } = this.getSystemWeekRangeInUtc({
          from: new Date(this.weekDates.from),
          to: new Date(this.weekDates.to),
        });
        let timesheets = await getTimeAttendanceCustomRange(
          { from,
            to,
            searchString,
            withPastDue: true,
          });
        timesheets = timesheets.map((employee) => {
          const parser = new TimesheetParser(employee);
          return parser.parse("weekDays");
        });

        timesheets.forEach((employee) => {
          const { leavesByDate, timesheets } = employee;

          if(timesheets.length <= 0) return;

          const timesheetDate = DateTime.fromISO(timesheets[0]?.start, { zone: "utc" }).toISODate();
          const timesheetLeaves = leavesByDate?.[timesheetDate];
          employee.weekData.leaves = timesheetLeaves;
        });

        this.timesheetsList = timesheets;
      } catch (error) {
        console.error('error:', error);
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }

      this.loading = false;
    },

    formatDates({ from, to }) {
      const fromFormat = DateTime.fromISO(from).toLocal().toFormat(DATETIME_FORMAT);
      const toFormat = DateTime.fromISO(to).toLocal().toFormat(DATETIME_FORMAT);
      return `${fromFormat} -> ${toFormat}`
    }
  },

  watch: {
    weekDates: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.showDatePicker = false;
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.generateWeekDaysEntries();
        }
      },
    },
  },
};
</script>

<style lang="scss">
.week-picker-wrapper {
  .vdp-datepicker {
    input {
      font-size: .7rem;
    }
  }
}
</style>
