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
import { getEmployees } from "../../utils/functions/api_call/employees";

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
      try {
        const data = await getEmployees({ currentLeaveType: true });
        const employees = data.employees;
        this.employees = employees;
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }
      this.loading = false
    },
   
  },
};
</script>
