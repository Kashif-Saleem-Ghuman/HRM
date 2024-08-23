<template>
  <div>
    <div
      class="d-flex justify-between align-center py-025 px-1 bottom_border_wrapper"
    >
      <div class="day-date-picker-wrapper">
        <button-with-overlay
          sectionLabel="View: "
          :button-config="{ label: dateBtnLabel, variant: 'light' }"
          v-slot="scope"
        >
          <div class="pl-05 pr-05">
            <bib-datetime-picker
              :value="date"
              @input="
                onDateChange($event);
                scope.close();
              "
              class="custom-date-picker"
              size="sm"
              style="min-width: 7vw"
              :maxDate="maxDate"
              hide-quick-select
              v-bind="{ ...getDatetimeCommonProps() }"
            ></bib-datetime-picker>
          </div>
        </button-with-overlay>
      </div>
      <div class="d-flex align-center">
        <search-input
          :on-change-fn="onSearchChange"
          :debounce-ms="300"
        ></search-input>
      </div>
    </div>

    <div>
      <base-widget-admin
        @clickedWidget="generateOrganizationEntries"
        :visibleWidgetKeys="[
          'employees_present_count',
          'employees_absent_count',
          'employees_on_leave_count',
        ]"
        :totalData="widgetUser"
        :progressCountShow="true"
      ></base-widget-admin>
    </div>

    <div class="scroll_wrapper">
      <div class="position-relative">
        <no-record v-if="showNoData"></no-record>
        <list-dashboard v-else :userList="employees"></list-dashboard>
        <loader :loading="loading"></loader>
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
export default {
  data() {
    return {
      date: DateTime.now().startOf("day").toFormat(DATETIME_FORMAT),
      loading: true,
      employees: [],
      maxDate: DateTime.now().toISO(),
      searchString: null,
      todayDate: DateTime.now().startOf("day").toFormat(DATETIME_FORMAT),
      widgetUser: [],
    };
  },

  computed: {
    dateBtnLabel() {
      if (this.isDateToday(this.date)) {
        return `Today, ${this.formatDate(this.date)}`;
      }
      return this.formatDate(this.date);
    },
    showNoData() {
      return !this.loading && (!this.employees || !this.employees?.length);
    },
  },

  methods: {
    getDatetimeCommonProps,
    onSearchChange(event) {
      this.searchString = event;
      if (this.loading) return;
      const isoDate = DateTime.fromFormat(this.date, DATETIME_FORMAT).toISO();
      this.generateOrganizationEntries();
    },
    isDateToday(date) {
      return DateTime.fromFormat(date, DATETIME_FORMAT).hasSame(
        DateTime.local(),
        "day"
      );
    },

    formatDate(isoDate) {
      return DateTime.fromFormat(isoDate, DATETIME_FORMAT).toFormat(
        DATETIME_FORMAT
      );
    },
    onDateChange(value) {
      if (
        ((value === "" || value == this.todayDate) &&
          this.date == this.todayDate) ||
        value == this.date
      )
        return;
      this.date = value === "" ? this.todayDate : value;
      this.generateOrganizationEntries();
    },

    async generateOrganizationEntries(actionKey = null, actionValue = null) {
      const date = DateTime.fromFormat(this.date, DATETIME_FORMAT).toISODate();
      const { searchString } = this;
      this.loading = true;
      this.employees = await this.$store
        .dispatch("timeattendance/getEmployeesAttendance", { date, [actionKey]: actionValue, searchString: searchString })
        .finally(() => {
          this.loading = false;
        });
      console.log('loggg==', actionKey, actionValue);
      if(actionKey == null){
        this.widgetUser = this.employees;
      }
    },
  },

  created() {
    this.generateOrganizationEntries();
  },
};
</script>

<style lang="scss">
.day-date-picker-wrapper .bib-datepicker .bib-datepicker__close-icon {
  display: none;
}
</style>
