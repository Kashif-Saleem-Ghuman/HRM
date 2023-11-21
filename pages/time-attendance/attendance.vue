<template>
  <div>
    <div class="d-flex justify-between align-center px-075 bottom_border_wrapper">
      <div class="day-date-picker-wrapper py-05">
        <button-with-overlay sectionLabel="View: " :button-config="{ label: dateBtnLabel, variant: 'light', }"
          v-slot="scope">
          <div class="pl-05 pr-05">
            <bib-datetime-picker v-model="date" @input="onDateChange($event); scope.close()" class="custom-date-picker"
              size="sm" style="min-width: 7vw;" :maxDate="maxDate"></bib-datetime-picker>
          </div>
        </button-with-overlay>
      </div>
      <div class="d-flex align-center">
        <search-input :on-change-fn="onSearchChange" :debounce-ms="300"></search-input>
      </div>
    </div>

    <div class="attendance-widgets-container container pt-1 pb-1 pl-1 pr-1">
      <div class="row">
        <div class="col-4">
          <present-widget avatars-position="bottom"></present-widget>
        </div>

        <div class="col-4">
          <absent-widget avatars-position="bottom"></absent-widget>
        </div>
        <div class="col-4"></div>
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
import { DateTime } from "luxon";
import PresentWidget from '../../components/orgamisms/TimeAttendance/PresentWidget.vue';
export default {
  components: { PresentWidget },
  data() {
    return {
      date: DateTime.now().startOf('day').toUTC().toFormat("yyyy-MM-dd"),
      loading: true,
      employees: [],
      maxDate: DateTime.now().toISO(),
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
      this.date = value
      this.generateOrganizationEntries(DateTime.fromISO(value).toUTC().toISO());
    },

    async generateOrganizationEntries(isoDate) {
      const { searchString } = this
      this.loading = true;
      this.employees = await this.$store.dispatch("timeattendance/getEmployeesAttendance", { date: isoDate, searchString })
      this.loading = false;
    },
  },

  created() {
    const nowIso = DateTime.now().startOf('day').toUTC().toISO()
    this.generateOrganizationEntries(nowIso);
  },
};
</script>

<style lang="scss">
.day-date-picker-wrapper .bib-datepicker .bib-datepicker__close-icon {
  display: none;
}
</style>