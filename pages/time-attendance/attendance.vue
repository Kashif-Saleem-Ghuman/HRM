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

    <div class="d-grid d-flex gap-1 py-1 px-1" style="grid-template-columns: repeat(3, 1fr)">
      
          <present-widget avatars-position="bottom"></present-widget>

          <on-leave avatars-position="bottom"></on-leave>

          <absent-widget avatars-position="bottom"></absent-widget>
          <!-- <celebrations-widget avatars-position="center"></celebrations-widget> -->
    </div>

    <div class="scroll_wrapper">
      <div>
        <list-dashboard :userList="employees" ></list-dashboard>
        <loader :loading="loading"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import PresentWidget from "../../components/orgamisms/TimeAttendance/PresentWidget.vue";
import {
  getDatetimeCommonProps,
  DATETIME_FORMAT,
} from "../../utils/functions/datetime-input";
export default {
  components: { PresentWidget },
  data() {
    return {
      date: DateTime.now().startOf('day').toFormat(DATETIME_FORMAT),
      loading: true,
      employees: [],
      maxDate: DateTime.now().toISO(),
      searchString: null,
      todayDate: DateTime.now().startOf("day").toFormat(DATETIME_FORMAT),
    };
  },

  computed: {
    dateBtnLabel() {
      if (this.isDateToday(this.date)) {
        return `Today, ${this.formatDate(this.date)}`;
      }
      return this.formatDate(this.date);
    },
  },

  methods: {
    getDatetimeCommonProps,
    onSearchChange(event) {
      this.searchString = event;
      if (this.loading) return;
      const isoDate = DateTime.fromFormat(this.date, DATETIME_FORMAT).toISO();
      this.generateOrganizationEntries(isoDate);
    },
    isDateToday(date) {
      return DateTime.fromFormat(date, DATETIME_FORMAT).hasSame(DateTime.local(), "day");
    },

    formatDate(isoDate) {
      return DateTime.fromFormat(isoDate, DATETIME_FORMAT).toFormat(
        DATETIME_FORMAT
      );
    },
    onDateChange(value) {
      if(((value === '' || value == this.todayDate ) && this.date == this.todayDate) || value == this.date) return;
      this.date = value === "" ? this.todayDate : value;
      this.generateOrganizationEntries(
        DateTime.fromFormat(this.date, DATETIME_FORMAT).toUTC().toISO()
      );
    },

    async generateOrganizationEntries(isoDate) {
      const date = DateTime.fromJSDate(new Date(isoDate)).toFormat('yyyy-MM-dd');
      const { searchString } = this;
      this.loading = true;
      this.employees = await this.$store.dispatch(
        "timeattendance/getEmployeesAttendance",
        { date, searchString }
      ).finally(() => {
        this.loading = false;
      });
    },
  },

  created() {
    const nowIso = DateTime.now().startOf("day").toUTC().toISO();
    this.generateOrganizationEntries(nowIso);
  },
};
</script>

<style lang="scss">
.day-date-picker-wrapper .bib-datepicker .bib-datepicker__close-icon {
  display: none;
}
</style>
