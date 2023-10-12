<template>
    <div class="remove-pad">
      <custom-table
        :fields="tableFields"
        class="border-gray4 bg-white"
        :sections="activityReportsList"
        :hide-no-column="true"
        :showTotal=true
        :colspan="4"
        :totalValue="totalValue"
        :status="TIMESHEET_STATUS[status]?.label"
        :buttonLable="status === 'not_submitted' ? 'Submit Timesheet' : ''"
        @button-clicked="submitButtonClicked"
      >
        <template #cell(name)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <div class="title">
              {{ data.value.weekday }}
            </div>
            <div class="description">
              {{ getWeekdayString(data.value.date) }}
            </div>
          </div>
        </template>
        <template #cell(in)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ data.value.activityReport.in }}</span>
          </div>
        </template>
        <template #cell(out)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ data.value.activityReport.out }}</span>
          </div>
        </template>
        <template #cell(break)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ data.value.activityReport.break }}</span>
          </div>
        </template>
        <template #cell(total)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ formatTime(data.value.activityReport.total * 60, false) }}</span>
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
import { DateTime } from "luxon";
import { TABLE_HEAD, WEEK_DAY, TIMESHEET_STATUS } from "@/utils/constant/Constant.js";
import { TIMESHEET_DATA } from "@/utils/constant/TimesheetData";
import { formatTime } from "@/utils/functions/clock_functions";
import { submitTimesheet } from "@/utils/functions/functions_lib_api";

export default {
  props: {
    activityReports: {
      type: Array,
      default: [],
    },
    totalWork: {
      type: String,
      default: "--:--",
    },
    status: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: -1,
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
      submitTimesheet,
      TIMESHEET_STATUS,
    };
  },
  computed: {
    activityReportsList() {
      return this.activityReports || []
    },
    totalValue() {
      return this.totalWork || "--:--"
    },
    statusValue() {
      return this.status;
    },
  },
  methods: {
    formatTime,
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
    async submitButtonClicked() {
      const response = await this.submitTimesheet(this.id);
      if (response) {
        this.$emit("timesheet-submitted");
      }
    }
  },
};
</script>
  
<style lang="scss">

</style>