<template>
  <div>
    <div
      class="d-flex justify-between align-center px-075 bottom_border_wrapper"
    >
        <div class="day-date-picker-wrapper pt-1 pb-1" >
          <button-with-overlay
            sectionLabel="View: "
            :button-config="{ label: dateBtnLabel, variant: 'light', }"
            v-slot="scope"
          >
          <div class="pt-05 pb-05 pl-05 pr-05">
            <bib-datepicker
              v-model="date"
              @input="onDateChange($event); scope.close()"
              class="custom-date-picker"
              size="sm"
              format="yyyy-MM-dd"
              style="min-width: 7vw;"
              :maxDate="maxDate"
            ></bib-datepicker>
          </div>
        </button-with-overlay>
        </div>

        <div class="d-flex align-center">

          <search-input :on-change-fn="onSearchChange" :debounce-ms="300"></search-input>

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

    <div class="scroll_wrapper">
      <div>
        <list-dashboard :userList="employees"></list-dashboard>
        <loader :showloader="loading"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import { getTimeAttendance } from "../../utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "../../utils/timesheet-parsers/timesheet-parser";
import { DateTime } from "luxon";
export default {
  data() {
    return {
      date: DateTime.now().toISO(),
      loading: true,
      employees: [],
      maxDate: DateTime.now().toJSDate(),
      searchString: null
    };
  },

  computed: {
    dateBtnLabel() {
      if (this.isDateToday(this.date)) {
        return `Today, ${this.formatDate(this.date)}`
      }
      return this.formatDate(this.date)
    }
  },

  methods: {
    onSearchChange(event) {
      this.searchString = event
      if (this.loading) return;
      this.generateOrganizationEntries(this.date)
    },
    isDateToday(date) {
      return DateTime.fromISO(date).hasSame(DateTime.local(), 'day')
    },
    formatDate(isoDate) {
      return DateTime.fromISO(isoDate).toFormat('EEEE, LLLL d, yyyy');
    },
    onDateChange(value) {
      this.date = DateTime.fromJSDate(value).toUTC().toISO();
      this.generateOrganizationEntries(this.date);
    },

    async generateOrganizationEntries(isoDate) {
      const { searchString } = this
      
      this.loading = true;
      const { employees = [] } = await getTimeAttendance({ date: isoDate, searchString });
      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      this.employees = employees;
      this.loading = false;
    },
  },

  created() {
    const nowIso = DateTime.now().toUTC().toISO()
    this.generateOrganizationEntries(nowIso);
  },
};
</script>

<style lang="scss">
.vdpComponent__input{
  background-color: #F2F2F5 !important;
  width: 300px !important;
}

.day-date-picker-wrapper .bib-datepicker .bib-datepicker__close-icon {
    display: none;
}
</style>