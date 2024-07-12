<template>
  <div>
    <div>
      <div id="people-action-wrapper">
        <loader :loading="loading"></loader>
        <no-record v-if="showNoData"></no-record>
        <div v-else-if="showTable">
          <directory-list :userList="employees"></directory-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";

export default {
  data() {
    return {
      localData: [],
      getCurrentDate: fecha.format(new Date(), "YYYY-MM-DD"),
      employees: [],
      loading: true,
    };
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
