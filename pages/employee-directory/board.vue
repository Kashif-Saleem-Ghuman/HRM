<template>
  <div>
    <div>
      <div id="employee-directory-wrapper">
        <loader :loading="loading"></loader>
        <no-record v-if="showNoData"></no-record>
        <div v-else-if="showTable">
          <list :userList="employees"></list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PEOPLE_TAB } from "../../utils/constant/Constant.js";
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { getEmployees } from "../../utils/functions/api_call/employees";

export default {
  data() {
    return {
      localData: [],
      departmentOptions: "",
      newMessageSidebar: false,
      peopleTabItem: PEOPLE_TAB,
      activeTab: "Directory",
      slideClass: "slide-in",
      updateForm: {},
      isFlag: false,
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
      getCurrentDate: "",
      employees: [],
      loading: true,
    };
  },
  async created() {
    this.getCurrentDate = this.date2;
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
      this.loading = true;
      const data = await getEmployees();
      const employees = data.employees;

      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      this.employees = employees;
      this.loading = false;
    },
    sendMeet() {
      window.open("https://dev-connect.business-in-a-box.com/", "_blank");
    },
    sendMessage() {
      window.open(
        "https://dev-chat.business-in-a-box.com/directs/" + this.form.userId,
        "_blank"
      );
    },
    userId(id) {
      if (id) {
        this.$router.push("/profile/" + id);
      } else {
        this.$router.push("/profile/");
      }
    },
  },
};
</script>
