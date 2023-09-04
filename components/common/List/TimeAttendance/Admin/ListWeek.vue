<template>
    <div class="remove-pad">
      <custom-table
        :fields="tableFields"
        class="border-gray4 bg-white"
        :sections="activityReports"
        :hide-no-column="true"
        :showTotal=true
      >
        <template #cell(name)="data">
          <div class="info_wrapper text-left pl-1">
              <div class="title">
                {{ data.value.weekday }}
              </div>
              <div class="description">
                {{ getWeekdayString(data.value.date) }}
           
              </div>
            </div>
        </template>
        <template #cell(in)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.activityReport.in }}</span>
      </div>
        </template>
  
        <template #cell(break)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.activityReport.break }}</span>
      </div>
        </template>
  
        <template #cell(out)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.activityReport.out }}</span>
      </div>
        </template>
        
        <template #cell(total)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.activityReport.total }}</span>
      </div>
        </template>
      </custom-table>
      <time-sheet-modal
        @close="timesheetModal = false"
        :timesheetModal="timesheetModal"
        :items="filteredData"
      ></time-sheet-modal>
    </div>
  </template>
  
  <script>
  import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
  import { DateTime } from "luxon";
  import { TABLE_HEAD, WEEK_DAY } from "../../../../../utils/constant/Constant.js";
  import { TIMESHEET_DATA } from "../../../../../utils/constant/TimesheetData";
  import { getTimeAttendanceWeek } from "../../../../../utils/functions/api_call/timeattendance/time";

  export default {
    props: {
      listWeek: {
        type: [Array, Object],
        default: "",
      },
    },
    data() {
      return {
        modal3Opened: false,
        showTooltip: false,
        tableFields: TABLE_HEAD.tHeadWeekView,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
        timesheetModal: false,
        localData: TIMESHEET_DATA,
        filteredData: [],
        parsedTimesheets: null
      };
    },

   computed: {
      activityReports() {
        return this.parsedTimesheets?.activityReports ?? []
      },

      total() {
        return this.parsedTimesheets?.total ?? 0
      }
   },


    created() {
      this.getAndParseTimesheets()
    },
    methods: {
      async getAndParseTimesheets() {
        //TODO take dates from calendar
        const from = "2023-08-27T00:00:00.000Z"
        const to = "2023-09-02T00:00:00.000Z"

        const timesheets = await getTimeAttendanceWeek({ from, to })
        this.parsedTimesheets = (new TimesheetParser(timesheets)).parse('week')
      },

      // TODO could be in in utils to reuse in other components
      getWeekdayString(date) {
        return WEEK_DAY[DateTime.fromISO(date).weekday - 1].label
      },

      close() {
        alert("sadjlaksjdlasldkjlasjdl");
        this.timesheetModal = false;
      },
      itemCliked(item) {
        document.querySelector("#timesheetid_" + item).style = "display:none";
        this.timesheetModal = true;
        var users = this.localData.find((items) => items.id === item);
        this.filteredData = users;
      },
      handleItemClick_Table(event, keyI, item) {
        event.preventDefault();
        this.$router.push("/profile/" + item.id);
      },
      viewProfile(id) {
        this.$router.push("/profile/" + id);
      },
      vclick() {
        alert("callled");
      },
      mouseover() {
        this.showTooltip = true;
      },
      mouseleave() {
        this.showTooltip = false;
      },
      sendInvite() {
        alert("send invite api call");
      },
      timeInfotab(name, isLeave) {
        document.querySelector("#" + name).style.display = isLeave
          ? "none"
          : "block";
      },
      profiletab(name, isLeave) {
        document.querySelector("#" + name).style.display = isLeave
          ? "none"
          : "block";
      },
  
      handleAction_Table(data) {
        console.log(data);
      },
    },
  };
  </script>
  
  <style lang="scss">
  .td_row_wrapper {
    padding: 4px 8px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    height: 65px !important;
    width: 100%;
    margin: -3px -5px 0 0px;
  
    &__sucess {
      background-color: #d5e8d4;
      span {
        color: #2ba026;
        font-weight: 500;
        font-size: 14px;
      }
    }
  
    &__absent {
      background-color: rgba(255, 171, 0, 0.16);
      span {
        color: #ffab00;
        font-weight: 500;
        font-size: 14px;
      }
    }
    &__vacation {
      background-color: rgba(31, 66, 162, 0.16);
      span {
        color: #1f42a2;
        font-weight: 500;
        font-size: 14px;
      }
    }
    &__absentpink {
      background-color: rgba(230, 0, 14, 0.16);
      span {
        color: #e6000e;
        font-weight: 500;
        font-size: 14px;
      }
    }
    &__default {
      background-color: #ffffff;
      span {
        color: #000;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  .info_wrapper {
    color: $black;
    font-weight: normal;
  }
  
  .title {
    font-size: 14px;
    font-weight: 600;
  }
  
  .description {
    font-size: 14px;
    font-weight: normal;
    color: $black;
  }
  .remove-pad {
    table {
      tr {
        margin: 0px !important;
        padding: 0px !important;
      }
      td {
        margin: 0px !important;
        padding: 0px !important;
      }
    }
  }
  </style>