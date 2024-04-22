<template>
  <div>
    <bib-table
      :fields="tableFields"
      :sections="timesheetList"
      :hide-no-column="true"
      :fixHeader="true"
      @column-header-clicked="headerColumnClick($event.column)"
    >
      <template #cell(date)="data">
        <div
          class="d-flex flex-d-column text-left gap-05"
        >
          <div class="font-md font-w-700">Week {{ getWeekNumber(data.value.end) }}</div>
          <div class="font-w-400 text-black">
            {{ formatIsoDateToYYYYMMDD(data.value.start) }} ->
            {{ formatIsoDateToYYYYMMDD(data.value.end) }}
          </div>
        </div>
      </template>

      <template v-for="day in weekDays" #[`cell(${day.value})`]="data">
        <chips
          :key="day.value"
          :title="getWeekdayValue(data.value.weekData, day)"
          :class="getWeekdayClassNames(data.value.weekData, day)"
        ></chips>
      </template>

      <template #cell(total)="data">
        <div>
          {{ data.value.refusalReason }}
          <span>{{ formatHoursToHHMM(data.value.total) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <dropdown-menu-chip
            :items="timesheetStatusOptions.slice(1)"
            :button-config="statusButtonConfig(data.value?.status)"
            @on-click="deleteConfirmation($event, data)"
          ></dropdown-menu-chip>
        </div>
      </template>
    </bib-table>
    <time-sheet-modal
      @close="timesheetModal = false"
      :timesheetModal="timesheetModal"
      :items="filteredData"
    ></time-sheet-modal>
  </div>
</template>
<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import { sortColumn } from "@/utils/functions/table-sort";
import {
  TABLE_HEAD,
  TIMESHEET_STATUS,
  WEEK_DAY,
  TIMESHEET_STATUSES,
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_LABEL_VALUE,
} from "@/utils/constant/Constant.js";
import { formatHoursToHHMM } from "@/utils/functions/time";
import {DateTime} from "luxon";
import {buttonVariant as TIMESHEET_DELETE_CONFIRMATION_MESSAGE} from "@/utils/constant/DropdownMenu";
export default {
  props: {
    timesheetsList: {
      type: Array,
      default: [],
    },
    startDate: {
      type: Date | String,
    },
    endDate: {
      type: Date | String,
    },
  },
  data() {
    return {
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadTimesheetListWeekTab,
      timesheetModal: false,
      filteredData: [],
      weekDays: WEEK_DAY.map((day) => ({
        ...day,
        value: day.value.substring(0, 3),
      })),
      sortByField: null,
      timesheetStatusOptions: [
        TIMESHEET_STATUS.approved,
        TIMESHEET_STATUS.rejected,
      ],
    };
  },
  computed: {
    timesheetList() {
      if (!this.sortByField) return this.timesheetsList;
      return sortColumn({
        items: this.timesheetsList,
        field: this.sortByField,
      });
    },
  },
  methods: {
    formatIsoDateToYYYYMMDD,
    formatHoursToHHMM,
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
    },
    statusButtonConfig(type) {
      if (!type) return {};
      return this.$button[type];
    },
    headerColumnClick(column) {
      this.sortColumn(column);
    },
    getEmptyTimesheetStatus() {
      const endDate = new Date(this.endDate);
      if (new Date() > endDate) {
        return TIMESHEET_STATUS.past_due.value;
      }
      return TIMESHEET_STATUS.not_submitted.value;
    },
    getWeekNumber(start) {
      const startDateTime = DateTime.fromISO(start);
      const weekNumber = startDateTime.weekNumber;
      return weekNumber;
    },
    async enableRefusalModal() {
      this.showRefusalModal = true;
    },
    deleteConfirmation(event, data) {
      this.event = event;
      this.data = data;
      if (event.key === "approved") {
        this.confirmastionMessageModal = true;
        this.showRefusalModal = false;
        this.deleteModalContent =
          TIMESHEET_DELETE_CONFIRMATION_MESSAGE.approved;
        this.variantButton = "success";
        return;
      } else {
        // this.deleteModalContent =
        //   TIMESHEET_DELETE_CONFIRMATION_MESSAGE.rejected;
        this.enableRefusalModal()
      }
    },
    getWeekdayValue(weekData, day) {
      if (!weekData) return "--";
      const data = weekData[day.weekday];
      if (!data) return "--";
      if (typeof data.totalHours === "number") {
        return formatHoursToHHMM(data.totalHours);
      }
      for (const [, activity] of Object.entries(ACTIVITY_TYPE)) {
        if (data[activity]) return ACTIVITY_TYPE_LABEL_VALUE[activity];
      }
      return "--";
    },
    getWeekdayClassNames(weekData, day) {
      if (!weekData) return "chip-wrapper__bggray";
      const data = weekData[day.weekday];
      if (!data) {
        return "chip-wrapper__bggray";
      }
      if (data.vacation) {
        return "chip-wrapper__bgvacation";
      }
      const totalHours = Number(data.totalHours);
      if (totalHours >= 8) {
        return "chip-wrapper__bgsucess";
      } else if (totalHours >= 5 && totalHours < 8) {
        return "chip-wrapper__bgabsent";
      } else if (totalHours <= 3) {
        return "chip-wrapper__bgabsentpink";
      } else {
        return "chip-wrapper__bgdefault";
      }
    },
    close() {
      this.timesheetModal = false;
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    mouseover() {
      this.showTooltip = true;
    },
    mouseleave() {
      this.showTooltip = false;
    },
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },
  },
};
</script>
