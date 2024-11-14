<template>
  <div id="dashboard-wrapper">
    <loader :loading="loading"></loader>
    <div
      class="d-flex align-center nav_wrapper_border"
      :class="[
        isLightThemeCheck ? 'bg-light-sub2' : 'bg-dark',
      ]"
    >
      <div class="d-flex align-center">
        <section-header-left
          :title="
            'Welcome to your HR dashboard, ' +
            $getEmployeeFullName(getActiveUser) +
            '! Here is your '
          "
          subDetail="Daily summary"
          customStyle="customStyle"
          style="border-bottom: none !important"
        ></section-header-left>
        <label class="pr-05 font-md">for</label>
        <div class="custom_date_picker">
          <bib-datetime-picker
            v-model="todayDate"
            :maxDate="maxDate"
            :minDate="minDate"
            size="sm"
            @input="dateSelection($event)"
            hide-quick-select
            v-bind="{ ...getDatetimeCommonProps() }"
          ></bib-datetime-picker>
        </div>
      </div>
    </div>
    <div class="tab-wrapper">
      <div id="dashboard-inner-wrapper">
        <div id="tab_info_wrapper">
          <div>
            <base-widget-admin
              @clickedWidget="getOrganizationEntries"
            ></base-widget-admin>
          </div>
          <div class="scroll_wrapper">
            <no-record v-if="showNoData"></no-record>
            <div v-else-if="showTable">
              <list-dashboard :userList="employees" :gettodayDate="getCurrentDate"></list-dashboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { DateTime } from "luxon";
import { mapGetters } from "vuex";
import {
  getDatetimeCommonProps,
  DATETIME_FORMAT,
} from "@/utils/functions/datetime-input";

export default {
  data() {
    return {
      id: "",
      activeUserName: "",
      localData: [],
      getCurrentDate: "",
      date: null,
      format: "MMM D, YYYY",
      date2: DateTime.now().toFormat("yyyy-MM-dd"),
      employees: [],
      loading: true,
      todayDate: DateTime.now().toFormat(DATETIME_FORMAT),
      maxDate: DateTime.now().toISO(),
      previousDate: DateTime.now().toFormat(DATETIME_FORMAT),
    };
  },

  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      activeDate: "date/getActiveDate",
      getActiveUser: "employee/GET_ACTIVE_USER",
    }),
    minDate() {
      return this.$minDate();
    },
    showTable() {
      return !this.loading && this.employees?.length;
    },
    showNoData() {
      return !this.loading && (!this.employees || !this.employees?.length);
    },
  },
  async created() {
    this.getCurrentDate = this.date2;
    await this.getOrganizationEntries();
  },
  methods: {
    getDatetimeCommonProps,
    async getOrganizationEntries(actionKey, actionValue) {

      try {
        const date = this.getCurrentDate;
        const employees = await this.$store.dispatch(
          "timeattendance/getEmployeesAttendance",
          { date, [actionKey]: actionValue }
        );

        employees.forEach((employee) => {
          const parser = new TimesheetParser(employee);
          parser.parse("day");
        });

        this.employees = employees;
        
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }
      this.loading = false;
    },

    setPreviousDate(date) {
      this.previousDate = date;
    },

    async dateSelection(event) {
      
      const now = DateTime.now().toFormat(DATETIME_FORMAT);
      this.todayDate = event === "" ? now : event;

      const date = DateTime.fromJSDate(new Date(event || now));
      this.getCurrentDate = date.toISODate();

      if(this.todayDate === this.previousDate) {
        return;
      }

      this.setPreviousDate(this.todayDate);
      if (DateTime.fromISO(this.getCurrentDate).isValid) {
        await this.getOrganizationEntries();
      } else {
        console.error("Invalid date format:", this.getCurrentDate);
      }
    },
  },
};
</script>
