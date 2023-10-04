<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
        <div class="pt-1 pb-1">
          <button-with-overlay
            sectionLabel="View: "
            :button-config="{ label: dateBtnLabel }"
            @on-click="leaveStatus($event)"
            v-slot="scope"
          >
            <div class="pt-1 pb-1 pl-05 pr-0">
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
      class="d-grid d-flex gap-1 py-1 pl-1"
      style="grid-template-columns: repeat(2, 1fr)"
    >

    <pending-timesheets-widget />

    <past-due-timesheets-widget />

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
import { getTimeAttendanceCustomRange } from "../../utils/functions/api_call/timeattendance/time";
import { DateTime } from "luxon";
import { debounce } from "lodash"
export default {
  data() {
    return {
      weekDates: { from: null, to: null },
      loading: true,
      employees: [],
      timesheetsList: [],
      showDatePicker: false,
      searchString: null,
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

  methods: {

    onSearchChange(event) {
      this.searchString = event
      if (this.loading) return;
      this.generateWeekDaysEntries()
    },

    dateBtnClick() {
      this.showDatePicker = !this.showDatePicker
    },
    async generateWeekDaysEntries() {
      const { searchString } = this

      this.loading = true;
      const { from, to } = this.weekDates;
      let timesheets = await getTimeAttendanceCustomRange({ from, to, searchString });
      timesheets = timesheets.map((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("weekDays");
      });
      this.timesheetsList = timesheets;
      this.loading = false;
    },

    formatDates({ from, to }) {
      const fromFormat = DateTime.fromISO(from).toUTC().toFormat('MMMM d, yyyy');
      const toFormat = DateTime.fromISO(to).toUTC().toFormat('MMMM d, yyyy');
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