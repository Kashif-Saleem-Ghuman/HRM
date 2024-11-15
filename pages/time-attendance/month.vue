<template>
  <div>
    <div
      class="d-flex align-center py-025 px-1 bottom_border_wrapper"
    >
      <div class="py-05">
        <div class="custom_date_picker">
          <custom-date-selector
            :year.sync="year"
            :month.sync="month"
            :dates.sync="dates" />
        </div>
      </div>
    </div>

    <div class="scroll_wrapper">
      <div>
        <custom-timesheet-list
          :employees="timesheetsList"
          :loading="loading"
          @handle-pagination-load="handlePaginationLoad"
          :pagination-loading="paginationLoading"
          type="month"
        ></custom-timesheet-list>
        <intersect @handle-pagination-load="handlePaginationLoad" :has-no-more-data="hasNoMoreData" :pagination-loading="paginationLoading"></intersect>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import {
  getDatetimeCommonProps,
  DATETIME_FORMAT,
} from "../../utils/functions/datetime-input";
import {getWeekEnd, getWeekStart, weekToUTCWeek} from "@/utils/functions/dates";
import {getTimeAttendanceCustomRange, getTimesheets} from "@/utils/functions/api_call/timeattendance/time";
import {TimesheetParser} from "@/utils/timesheet-parsers/timesheet-parser";
import {MONTH_SELECTOR_DEFAULT} from "@/utils/constant/Constant";
import {processEmployeeRequests} from "@/utils/requests/employee-request-processor";
export default {
  data() {
    return {
      loading: false,
      weekDates: {
        from: null,
        to: null,
      },
      dates: {
        from: null,
        to: null,
      },
      format: DATETIME_FORMAT,
      year: null,
      month: null,
      timesheetsList: [],
      isFullYearList: false,

      timesheetDates: {
        from: null,
        to: null,
      },
      pagination: {
        page: 1,
        limit: 10,
      },
      remotePaginationData: null,
      paginationLoading: false,
      hasNoMoreData: false,
    };
  },

  computed: {
    dateBtnLabel() {
      if (!this.weekDates || !this.weekDates?.from || !this.weekDates?.to)
        return "";
      const { from, to } = this.weekDates;
      return this.formatDates({ from, to });
    },
  },

  methods: {
    weekToUTCWeek,
    async onCloseWeekRange() {
      await this.fillTimesheetEntries();
    },
    async weekSelectionInMonthView() {
      await this.fillTimesheetEntries(true);
    },
    async onWeeklyTimesheetSubmitted() {
      await this.fillTimesheetEntries();
    },

    async handlePaginationLoad() {

      if(this.hasNoMoreData || this.paginationLoading) return;

      this.pagination.page += 1;
      this.paginationLoading = true;
      await this.fillTimesheetEntries(false, true);

      if(this.remotePaginationData.next_page === null) {
        this.hasNoMoreData = true;
      }

      this.paginationLoading = false;
    },

    async fillTimesheetEntries(isWeekRange = false, isPaginationLoad = false) {
      const searchString = '';

      if(!isPaginationLoad) this.loading = true;
      const { from, to } = this.weekToUTCWeek({
        from: new Date(isWeekRange ? this.weekDates.from : this.timesheetDates.from),
        to: new Date(isWeekRange ? this.weekDates.to : this.timesheetDates.to),
      });

      try {

        const { data: employees, pagination } = await getTimeAttendanceCustomRange({
          from,
          to,
          searchString,
          withPastDue: true,
          pagination: this.pagination,
        });

        this.remotePaginationData = pagination;

        employees.forEach((employee) => {
        const { leavesByDate } = employee
        
        employee.timesheets.forEach((timesheet) => {
          const parser = new TimesheetParser(timesheet);
          parser.parse("hours");

          const timesheetDate = DateTime.fromISO(timesheet.start, { zone: "utc" }).toISODate();
          const timesheetLeaves = leavesByDate?.[timesheetDate]
          timesheet.leaves = timesheetLeaves
        });
      });

      this.timesheetsList = isPaginationLoad
        ? [...this.timesheetsList, ...employees]
        : employees

      function getWeekdayIndex(dateString) {
        const date = new Date(dateString);
        return date.getDay();
      }

      this.timesheetsList.forEach(employee => {
        employee.timesheets.forEach(timesheet => {
          timesheet.timeEntries.forEach(timeEntry => {
            const weekdayIndex = getWeekdayIndex(timeEntry.start);
            timeEntry.weekdayIndex = weekdayIndex;

            if(weekdayIndex === 0){
              timeEntry.weekdayIndex = 7;
            }
          });
        });
      });
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }

      if(!isPaginationLoad) this.loading = false;
    },
    setTimesheetDates(from, to) {
      this.timesheetDates = {from: from, to: to}
    },
  },
  watch: {
    dates(newval, old) {
      if(newval.from && newval.to) {
        this.setTimesheetDates(newval.from, newval.to);
        this.fillTimesheetEntries();
      }
    },
    month(val) {
      if(val === MONTH_SELECTOR_DEFAULT.value){
        this.isFullYearList = true;
      }else {
        this.isFullYearList = false;
      }
    },
  }

};
</script>

<style lang="scss">
.day-date-picker-wrapper .bib-datepicker .bib-datepicker__close-icon {
  display: none;
}
</style>
