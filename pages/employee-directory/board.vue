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
import { getEmployees } from "../../utils/functions/api_call/employees";
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
      const data = await getEmployees();
      const employees = data.employees;
      this.employees = employees;
      this.loading = false
    },
  },
};
</script>
