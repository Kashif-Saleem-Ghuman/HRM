<template>
    <div id="dashborad-wrapper">
      <div
        class="d-flex justify-between align-center bottom_border_wrapper"
      >
      
        <section-header-left
          :title="`Welcome to your HR dashboard `"
        ></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div id="dashboard-inner-wrapper">
          <div id="tab_info_wrapper">
            <div class="container pt-1 pb-1 pl-1 pr-1">
              <div class="row">
                <div class="col-4">
                  <attendance-admin-widget></attendance-admin-widget>
                </div>
                <div class="col-4">
                  <timesheets-admin-widget></timesheets-admin-widget>
                </div>
                <div class="col-4">
                  <celebrations-widget avatars-position="center"></celebrations-widget>
                </div>
              </div>
            </div>

            <div class="scroll_wrapper">
              <div style="z-index: 1">
                <list-dashboard :userList="employees"></list-dashboard>
                <loader :loading="loading"></loader>
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
        loading:false,
        localData: [],
        getCurrentDate: "",
        date: null,
        format: "MMM D, YYYY",
        date2: fecha.format(new Date(), "YYYY-MM-DD"),
        employees: []
      };
    },
  
    computed: {
      ...mapGetters({
        getUser: "employee/GET_USER",
        getAccessToken: "token/getAccessToken",
        activeDate: "date/getActiveDate",
      }),
    },
    async created() {
      this.getCurrentDate = this.date2;
      await this.$store.dispatch("employee/setActiveUser")
      var users = this.getUser;
      this.id = users.id;
      this.activeUserName = users.firstName + " " + users.lastName;
    },
  mounted(){
    this.getOrganizationEntries();
  },
    methods: {
      async getOrganizationEntries() {
        this.loading = true
        const date = this.getCurrentDate
        const data = await getTimeAttendance({ date });
        const employees = data.employees

        employees.forEach(employee => {
          const parser = new TimesheetParser(employee)
          return parser.parse('day')
        });
        
        this.employees = employees
        this.loading = false
      },
      
      parseDate(dateString, format) {
        return fecha.parse(dateString, format);
      },
      formatDate(dateObj, format) {
        return fecha.format(dateObj, format);
      },
      onChange(value) {
        let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
        this.$store.dispatch("date/setActiveDate", date);
        this.getCurrentDate = date;
        this.getTimeAttandance();
      },
    },
  };
  </script>
  
  