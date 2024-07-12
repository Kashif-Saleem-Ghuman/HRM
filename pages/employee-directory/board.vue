<template>
  <div>
    <div>
      <div id="employee-directory-wrapper">
        <loader :loading="loading"></loader>
        <no-record v-if="showNoData"></no-record>
        <div v-else-if="showTable">
          <card-list :userList="employees"></card-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import fecha, { format } from "fecha";

export default {
  data() {
    return {
      employees: [],
      loading: true,
      getCurrentDate: fecha.format(new Date(), "YYYY-MM-DD"),
    };
  },
  async created() {
    // this.getCurrentDate = this.date2;
  },

  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      activeTabSidebar: "token/getActiveTab",
    }),
    showTable() {
      return !this.loading && this.employees?.length;
    },
    showNoData() {
      return !this.loading && (!this.employees || !this.employees?.length);
    },
    isAdmin() {
      return this.$store.state.token.isAdmin;
    },
    isUser() {
      return this.$store.state.token.isUser;
    },
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
