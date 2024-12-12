<template>
  <div class="align-wrapper-week"> 
    <bib-table
      :fields="tableFields"
      class="table table-week"
      :class="{
      'table--light': isLightThemeCheck,
      'table--dark': !isLightThemeCheck,
    }"
      :sections="activityReportsList"
      :hide-no-column="true"
      :showTotal="true"
      :fixHeader="true"
      v-if="id >= 0"
      
      @item-clicked="tableItemClick"
    >
      <template #cell(name)="data">
        <div class="font-md text-left font-w-500 cursor-pointer" :class="isLightThemeCheck ? 'text-gray1' : 'text-gray5'" @click="redirectDayView(data)">
          <div :class="getClassName(data.value.date)">
            {{ getWeekDay(data.value.weekDayLabel) }}
          </div>
          <div :class="getClassName(data.value.date)">
            {{ dateFormat(data.value.date) }}
          </div>
        </div>
      </template>
      <template #cell(in)="data">
        <div class="week-list">
          <timesheet-field
          :timeEntry="data.value.timeEntryIn"
          :value="data.value.in"
          :date="data.value.date"
          :activity="activityIn"
          :data="data.value"
          placeholder="00:00"
          :status="status"
          :entryExists="data.value.entryExists"
          @onInput="handleClickTimeEntry"
        ></timesheet-field>
        </div>
      </template>
      <template #cell(break)="data">
        <div class="cursor-pointer" @click="redirectDayView(data)">
          <chips
            :defaultPointer="true"
            :title="getInOut(data.value.break)"
            :className="getInOutClass(data.value.entryExists)"
            class="d-align text-center"
            centerAlign="d-align"
          ></chips>
        </div>
      </template>
      <template #cell(out)="data">
        <div class="week-list">
        <timesheet-field
          :timeEntry="data.value.timeEntryIn"
          :value="data.value.out"
          :date="data.value.date"
          :activity="activityOut"
          :data="data.value"
          :status="status"
          :entryExists="data.value.entryExists"
          placeholder="00:00"
          @onInput="handleClickTimeEntry"
        ></timesheet-field>
      </div>
      </template>
      <template #cell(total)="data">
        <div
          :class="[
            'd-flex',
            'align-center',
            data.value.entryExists ? 'text-bold' : 'disabled',
          ]"
          class="cursor-pointer"
        >
          <span>{{ getDayTotalHour(data.value) }}</span>
        </div>
      </template>
    </bib-table>
    <timesheet-table-footer
      v-if="id >= 0"
      :status="status"
      :refusalReasonData="refusalReasonData"
      :totalValue="totalValue"
      @button-clicked="submitButtonClicked"
    ></timesheet-table-footer>
    <time-sheet-modal
      @close="timesheetModal = false"
      :timesheetModal="timesheetModal"
      :items="filteredData"
    ></time-sheet-modal>
  </div>
</template>

<script>
import {
  makeTimeEntry,
  editTimeEntry,
  deleteTimeEntry,
} from "@/utils/functions/functions_lib_api";
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
import {
  ACTIVITY_TYPE,
  TABLE_HEAD,
  WEEK_DAY,
  TIMESHEET_STATUS, FILL_WEEKLY_ENTRY_EVENT,
} from "@/utils/constant/Constant.js";
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";
import { formatTime } from "@/utils/functions/clock_functions";
import { submitTimesheet } from "@/utils/functions/functions_lib_api";
import {getDateDiffInSeconds, getTimeFromDate, isToday, parseDate} from "../../../../utils/functions/dates";

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
    refusalReasonData: {
      type: Object,
      default: null,
    },
    id: {
      type: Number,
      default: -1,
    },
    startOfWeek: {
      type: String,
      default: DateTime.now().startOf("week").toISODate(),
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
      filteredData: [],
      submitTimesheet,
      TIMESHEET_STATUS,
      WEEK_DAY,
      todayDate: DateTime.now().toFormat(DATETIME_FORMAT),
      activityIn: ACTIVITY_TYPE.IN,
      activityOut: ACTIVITY_TYPE.OUT,
      endTimeRecords: [],
      startTimeRecords: [],
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
      getTimerData: "timeattendance/getTimerData"
    }),
    activityReportsList() {
      return WEEK_DAY.map(({ label, value }, index) => {
        const report = this.activityReports.find(
          (ar) => this.getWeekdayString(ar.date) === value
        )?.activityReport;
        return {
          weekDayLabel: label,
          in: report?.in || null,
          out: report?.out || null,
          break: report?.break || "00:00",
          total: report?.total || 0,
          entryExists: Boolean(report),
          date: DateTime.fromISO(this.startOfWeek)
            .plus({ days: index })
            .toFormat("yyyy-MM-dd"),
          timeEntryIn: report?.timeEntryIn[0],
          timeEntryBreak: report?.timeEntryBreak[0],
          isTimeEntryCompleted: report?.isTimeEntryCompleted,
        };
      });
    },
    totalValue() {
      return this.totalWork || "--:--";
    },
    statusValue() {
      return this.status;
    },
    isTimerActive() {
      return this.getTimerData?.active
    },
    isSelectedDateCurrentWeek() {
      const startWeek = DateTime.fromISO(this.startOfWeek).plus({days: 1});
      const now = DateTime.now();
      return startWeek.weekNumber === now.weekNumber && startWeek.year === now.year;
    },
  },
  methods: {
    makeTimeEntry,
    editTimeEntry,
    formatTime,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },



    updateTimeRecords(recordType, date, timeValue) {
      const findIndex = this[recordType].findIndex((dateRecord) => dateRecord.date === date);
      if (findIndex !== -1) {
        this[recordType][findIndex] = { date: date, time: timeValue };
      } else {
        this[recordType].push({
          date: date,
          time: timeValue,
        });
      }
    },
    setEndTimeRecords(date, endDate) {
      this.updateTimeRecords('endTimeRecords', date, endDate);
    },

    setStartTimeRecords(date, startDate) {
      this.updateTimeRecords('startTimeRecords', date, startDate);
    },

    adjustEndTime(start, end) {
      const startDate = parseDate(start);
      const endDate = parseDate(end);


      const startTime = getTimeFromDate(start);
      const endTime = getTimeFromDate(end);

      const duration = getDateDiffInSeconds(start, end);

      if (endDate && endDate < startDate) {
        return endDate.plus({ days: 1 });
      }else if(endDate > startDate && (startTime  === endTime || duration / 3600 >= 24)) {
        return endDate.minus({ days: 1 });
      }
      return endDate;
    },

    adjustStartTime(start, end) {
      return parseDate(start);
    },

    endDateRecord(date) {
      return this.endTimeRecords.find(record => record.date === date);
    },
    startDateRecord(date) {
      return this.startTimeRecords.find(record => record.date === date);
    },

    handleClickTimeEntry(entryDetail, activity, timeEntry) {
      let startTime = entryDetail?.startDate ?? timeEntry?.start;
      let endTime = entryDetail?.endDate ?? timeEntry?.end;


      if(!timeEntry && activity === ACTIVITY_TYPE.IN && !isToday(entryDetail.date) && this.endDateRecord(entryDetail.date) === undefined){
        this.setStartTimeRecords(entryDetail.date, entryDetail.startDate);
        return;
      }

      if (!timeEntry && activity === ACTIVITY_TYPE.OUT && this.startDateRecord(entryDetail.date) === undefined) {
        this.setEndTimeRecords(entryDetail.date, entryDetail.endDate);
        return;
      }


      if (timeEntry) {
        startTime = this.adjustStartTime(startTime, endTime);
        endTime = this.adjustEndTime(startTime, endTime);

        this.editThisTimeEntry({
          date: entryDetail.date,
          id: timeEntry.id,
          start: startTime?.toUTC()?.toISO(),
          end: endTime?.toUTC()?.toISO(),
          activity: ACTIVITY_TYPE.IN
        });
      } else {
        let endDateRecord = null;
        let startDateRecord = null;

        if(activity === ACTIVITY_TYPE.OUT){
          startDateRecord = this.startDateRecord(entryDetail.date)?.time;
        }
        if(activity === ACTIVITY_TYPE.IN) {
          endDateRecord = this.endDateRecord(entryDetail.date)?.time;
        }

        startTime = this.adjustStartTime(startDateRecord || startTime, endTime);
        endTime = this.adjustEndTime(startTime, endDateRecord || endTime);

        this.makeNewTimeEntry(
          ACTIVITY_TYPE.IN,
          entryDetail.date,
          startTime?.toUTC()?.toISO(),
          endTime?.toUTC()?.toISO()
        );
      }
    },
    async makeNewTimeEntry(activity, date, startDate, endDate) {
      this.$nuxt.$emit('loading', true);
      try {
        const newEntry = await this.makeTimeEntry(
          activity,
          date,
          startDate,
          endDate
        );

        if (newEntry) {
          this.openPopupNotification({
            text: "Time entry added successfully",
            variant: "primary",
          });
        }
        await this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
      } catch (error) {
        console.log('error', error);
        await this.$nuxt.$emit('month-force-rerender');
      }
      this.$nuxt.$emit('loading', false);
    },
    async editThisTimeEntry(payload) {
      this.$nuxt.$emit('loading', true);
      try {
        const editedEntry = await this.editTimeEntry(payload);

        if (editedEntry) {
          this.openPopupNotification({
            text: "Time entry updated successfully",
            variant: "primary",
          });
          this.$emit("edit-entry", editedEntry);
        }
        await this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
      } catch (error) {
        await this.$nuxt.$emit('month-force-rerender');
      }
      this.$nuxt.$emit('loading', false);
    },
    // TODO could be in in utils to reuse in other components
    getWeekdayString(date) {
      return WEEK_DAY[
        DateTime.fromJSDate(new Date(date + " 00:00")).weekday % 7
      ].value;
    },

    getDayTotalHour(timeEntry) {
      if(timeEntry.out === "00:00" && !(timeEntry.isTimeEntryCompleted)){
        return "00:00";
      }
      return formatTime(timeEntry.total * 60, false);
    },
    getTodayDate() {
      this.todayDate;
    },
    tableItemClick(event, key, item) {
      this.$emit("day-view", item);
    },
    redirectDayView(item) {
      this.$emit("redirect-dayview", item.value);
    },
    dateFormat(item) {
      return item == null
        ? "---"
        : DateTime.fromISO(item).toFormat(DATETIME_FORMAT);
    },
    getClassName(value) {
      return this.todayDate === this.dateFormat(value) ? (this.isLightThemeCheck ? "text-bold text-black" : "text-bold text-white") : "";
    },
    getWeekDay(day) {
      return day;
    },
    getInOut(inOut) {
      return inOut;
    },
    getInOutClass(value) {
      return value
        ? "chip-wrapper__bggray text-bold"
        : "chip-wrapper__bggray disabled";
    },

    async submitButtonClicked() {

      if(this.isTimerActive && this.isSelectedDateCurrentWeek) {
        this.$openPopupNotification({
          text: "Please clock out to submit the timesheet",
          variant: "danger"
        })
        return;
      }
      const response = await this.submitTimesheet(this.id);
      if (response) {
        this.$emit("timesheet-submitted");
        this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
      }
    },
  },
  async mounted() {
    await this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
  }
};
</script>
<style lang="scss">
.table-week{
  td{
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  .chip-wrapper__bggray{
    height: 40px !important;
    border-radius: 4px !important;
  }
  
}
.align-wrapper-week {
  tr.table__hrow {
    th {
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        span {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
