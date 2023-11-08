<template>
    <div id="dashborad-wrapper">
      <div
        class="d-flex justify-between align-center bottom_border_wrapper"
      >
      
        <section-header-left
          :title="`Welcome to your HR dashboard ` + activeUserName"
          :avatar="getUser.photo"
        ></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div id="dashboard-inner-wrapper">
          <div class="" id="tab_info_wrapper">
            <!-- <div
              class="d-flex justify-between align-center px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <div class="custom_date_picker">
                  <div class="mr-05">Date:</div>
                  <bib-datetime-picker
                    v-model="date2"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    @input="onChange"
                    class="custom_date_picker"
                  ></bib-datetime-picker>
                </div>
              </div>
              <div class="d-flex align-center">
                <div class="d-flex align-center mr-05">
                  <span class="mr-05">Search:</span>
                  <bib-input size="sm" type="text" test_id="srchInput01">
                  </bib-input>
                </div>
                <div class="d-flex align-center">
                  <div style="font-size: 14px" class="mr-05">Show:</div>
                  <button
                    type="button"
                    @click="$emit('on-click')"
                    class="cursor-pointer shape-rounded d-flex align-center border-0 px-1 py-025"
                  >
                    All
                  </button>
                </div>
              </div>
            </div> -->
            <div class="px-1 py-05">
          <div
            class="d-grid d-flex gap-1 py-05"
            style="grid-template-columns: repeat(3, 1fr)"
            
          >
                <absent-present-card
                  :item="infoCardData[0]"
                  buttonLable="Active Users"
                  icon="table"
                  title="Active User"
                  profilePic="profilePic"
                  buttonVariant="light"
                ></absent-present-card>
                <info-card-one
                  :item="infoCardData[1]"
                  buttonLable="Timesheet"
                  title="Birthday"
                  icon="table"
                  buttonVariant="light"
                  profilePic="profilePic"
                ></info-card-one>
                <info-card-one
                  :item="infoCardData[2]"
                  buttonLable="Open inbox"
                  icon="mail-new"
                  profilePic="profilePic"
                  buttonVariant="light"
                ></info-card-one>
              </div>
            </div>
            <div class="scroll_wrapper">
              <div style="z-index: 1">
                <list-dashboard :userList="employees"></list-dashboard>
                <loader v-bind:showloader="loading"></loader>
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
  import {
  DASHBOARD_DATA,
  INFO_CARD_DATA,
  } from "../../../utils/constant/DashboardData";
  import { getTimeAttendance } from "../../../utils/functions/functions_lib_api";
  
  export default {
    data() {
      return {
        id: "",
        activeUserName: "",
        infoCardData: INFO_CARD_DATA,
        dashboardData: DASHBOARD_DATA,
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
        userList: "employee/GET_USERS_LIST",
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
  
  