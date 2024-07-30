<template>
  <div id="dashboard-wrapper">
    <loader :loading="loading"></loader>
    <section-header-left title="Dashboard"></section-header-left>
    <div class="tab-wrapper">
      <div id="dashboard-inner-wrapper">
        <div id="tab_info_wrapper">
          <div>
            <base-widget-admin @clickedWidget="getOrganizationEntries"></base-widget-admin>
          </div>
          <div class="scroll_wrapper">
            <no-record v-if="showNoData"></no-record>
            <div v-else-if="showTable">
              <list-dashboard :userList="employees"></list-dashboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import fecha from "fecha";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      id: "",
      activeUserName: "",
      localData: [],
      getCurrentDate: "",
      date: null,
      format: "MMM D, YYYY",
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
      employees: [],
      loading: true,
    };
  },

  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      activeDate: "date/getActiveDate",
    }),
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
    async getOrganizationEntries(actionKey) {
      const date = this.getCurrentDate;
      const employees = await this.$store.dispatch(
        "timeattendance/getEmployeesAttendance",
        { date, actionKey }
      );

      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        parser.parse("day");
      });

      this.employees = employees;
      this.loading = false;
    },
  },
};
</script>
