<template>
  <div id="dashborad-wrapper">
    <loader :loading="loading"></loader>

    <div class="d-flex justify-between align-center border-bottom-light">
      <section-header-left title="Dashboard"></section-header-left>
    </div>
    <div class="tab-wrapper">
      <div id="dashboard-inner-wrapper">
        <div id="tab_info_wrapper">
          <div class="container pt-1 pb-1 pl-1 pr-1">
            <div class="row">
              <div class="col-4">
                <attendance-admin-widget :employees="employees"></attendance-admin-widget>
              </div>
              <div class="col-4">
                <!-- <timesheets-admin-widget></timesheets-admin-widget> -->
                <!-- <absent-widget avatars-position="bottom"></absent-widget> -->
              </div>
              <div class="col-4">
                <celebrations-widget
                  avatars-position="center"
                ></celebrations-widget>
              </div>
            </div>
          </div>

          <div class="scroll_wrapper">
            <no-record v-if="showNoData"></no-record>

            <div v-else-if="showTable">
              <list-dashboard :userList="employees" ></list-dashboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import fecha, { format } from "fecha";
import { mapGetters } from "vuex";
import { getTimeAttendance } from "../../../utils/functions/functions_lib_api";

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
  },
  mounted() {
    this.getOrganizationEntries();
  },
  methods: {
    async getOrganizationEntries() {
      const date = this.getCurrentDate;
      const employees = await this.$store.dispatch("timeattendance/getEmployeesAttendance", { date });

      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      this.employees = employees;
      this.loading = false
    },
  },
};
</script>
