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
        :buttonLable="status === 'not_submitted' && $store.state.token.isUser ? 'Submit Timesheet' : ''"
        @button-clicked="submitButtonClicked"
        v-if="id >= 0"
      >
        <template #cell(name)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <div class="description">
              {{ data.value.weekDayLabel }}
            </div>
          </div>
        </template>
        <template #cell(in)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ data.value.in }}</span>
          </div>
        </template>
        <template #cell(out)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ data.value.out }}</span>
          </div>
        </template>
        <template #cell(break)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ data.value.break }}</span>
          </div>
        </template>
        <template #cell(total)="data">
          <div class="d-flex px-1 align-center text-left gap-05 py-025">
            <span>{{ formatTime(data.value.total * 60, false) }}</span>
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
import { mapGetters } from "vuex"
import { DateTime } from "luxon";
import { TABLE_HEAD, WEEK_DAY, TIMESHEET_STATUS } from "@/utils/constant/Constant.js";
import { TIMESHEET_DATA } from "@/utils/constant/TimesheetData";
import { formatTime } from "@/utils/functions/clock_functions";
import { submitTimesheet } from "@/utils/functions/functions_lib_api";

export default {
  props: {
    activityReports: {
      type: Array,
      default() {
        return [];
      },
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
    }
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
      WEEK_DAY,
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
    activityReportsList() {
      return WEEK_DAY.map(({ label, value }) => {
        const report = this.activityReports
          .find((ar) => this.getWeekdayString(ar.date) === value)
          ?.activityReport;
        return {
          weekDayLabel: label,
          in: report?.in || "--:--",
          out: report?.out || "--:--",
          break: report?.break || "--:--",
          total: report?.total || 0,
        };
      });
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
      return WEEK_DAY[
        DateTime
          .fromJSDate(new Date(date + " 00:00"))
          .weekday
          % 7
      ].value
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