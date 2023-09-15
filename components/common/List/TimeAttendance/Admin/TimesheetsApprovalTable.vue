<template>
  <div class="timesheets-approval-table-container">
    <loader v-if="loading" :showloader="loading"></loader>

    <div
      v-if="!loading && (!employees || !employees?.length)"
      class="no-data-container"
    >
      <p>No data available</p>
    </div>

    <custom-table-day-view
      v-else
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="employees"
      :hide-no-column="true"
      classTypeHead="table__hrow__default"
      classTypeBody=""
      customTitle="custom-title"
    >
      <!-- Timsheet date range -->
      <template #cell(name)="data">
        <div
          class="d-flex align-center text-left gap-05"
          style="position: relative"
        >
          <div class="info_wrapper p-1">
            {{ formatIsoDateToYYYYMMDD(data.value.start) }} ->
            {{ formatIsoDateToYYYYMMDD(data.value.end) }}
          </div>
        </div>
      </template>

      <!-- Weekday cells -->
      <template v-for="day in weekDays" #[`cell(${day})`]="data">
        <chips
          :key="day"
          :title="data.value[day] ? formatHoursToHHMM(data.value[day]) :  '--'"
          :className="[getDayClassName(data.value[day])]"
        ></chips>
      </template>

      <template #cell(total)="data">
        <chips
          :title="data.value.total ? formatHoursToHHMM(data.value.total) : '--'"
          :className="[
            getTotalClassName(data.value.total),
            data.value.status == TIMESHEET_STATUS['vacation'].value
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value.test == '--' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>

      <template #cell(status)="data">
        <div class="text-dark">
          <bib-input
            type="select"
            :value="data.value.status"
            :options="timesheetStatusOptions"
            label=""
            placeholder=""
            :disabled="false"
            @input="onStatusChange($event, data)"
          ></bib-input>
        </div>
      </template>
    </custom-table-day-view>
  </div>
</template>
  
<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import {
TABLE_HEAD,
TIMESHEET_STATUS,
WEEK_DAY,
} from "../../../../../utils/constant/Constant.js";
import {
approveTimesheet,
getPastDueTimesheets,
getPendingTimesheets,
rejectTimesheet,
} from "../../../../../utils/functions/api_call/timeattendance/time";
import { TimesheetParser } from "../../../../../utils/timesheet-parsers/timesheet-parser";
import { formatHoursToHHMM } from "../../../../../utils/functions/time";
const PENDING_TYPE = "pending";
const PAST_DUE_TYPE = "past_due";

const fetchTimesheetsFunctionMap = {
  [PENDING_TYPE]: getPendingTimesheets,
  [PAST_DUE_TYPE]: getPastDueTimesheets,
};
export default {
  props: {
    dates: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      WEEK_DAY,
      TIMESHEET_STATUS,
      timesheetStatusOptions: [
        TIMESHEET_STATUS.approved,
        TIMESHEET_STATUS.rejected,
      ],
      weekDays: WEEK_DAY.map((day) => day.value.substring(0, 3)),
      tableFields: TABLE_HEAD.tHeadTimesheet,
      employees: [],
      loading: true,
    };
  },
  mounted() {
    this.addTypeToTimesheetStatusOptions();
    this.getAndParseTimesheets();
  },
  methods: {
    formatIsoDateToYYYYMMDD,
    formatHoursToHHMM,

    addTypeToTimesheetStatusOptions() {
      this.timesheetStatusOptions = [
        TIMESHEET_STATUS[this.type],
        ...this.timesheetStatusOptions,
      ];
    },
    async onStatusChange(event, data) {
      const id = data?.value?.id;
      const confirm = window.confirm(
        `Are you sure you want to ${event} the selected timesheet?`
      );

      if (confirm) {
        if (event == TIMESHEET_STATUS["approved"].value) {
          await approveTimesheet({ id });
        } else if (event == TIMESHEET_STATUS["rejected"].value) {
          await rejectTimesheet({ id });
        }
      }
      this.getAndParseTimesheets();
    },

    async getAndParseTimesheets() {
      this.loading = true;
      const { from, to } = this.dates
      if (!from || !to) return 

      const employees = await fetchTimesheetsFunctionMap[this.type]({
        from,
        to,
      });

      employees.forEach((employee) => {
        employee.timesheets.forEach((timesheet) => {
          const parser = new TimesheetParser(timesheet);
          parser.parse("hours");
        });
      });

      this.employees = employees;
      this.loading = false;
    },

    getDayClassName(hours) {
      if (!hours) return "";

      if (hours >= "08") return "chip-wrapper__bgsucess";

      if (hours <= "07" && hours >= "05") return "chip-wrapper__bgabsent";

      if (hours <= "05") return "chip-wrapper__bgabsentpink";

      return "";
    },

    getTotalClassName(total) {
      if (total <= "10") return "chip-wrapper__bgabsentpink";

      if (total <= "35") return "chip-wrapper__bgabsent";

      if (total >= "40") return "chip-wrapper__bgsucess";

      return "";
    },

    getStatusIcon(status) {
      const iconStatusMap = {
        [TIMESHEET_STATUS.approved.value]: "check-all",
        [TIMESHEET_STATUS.pending.value]: "eye-open",
        [TIMESHEET_STATUS.past_due.value]: "help",
      };

      return iconStatusMap[status] || "";
    },

    getStatusVariant(status) {
      const variantStatusMap = {
        [TIMESHEET_STATUS.approved.value]: "chip-wrapper__bgsucess",
        [TIMESHEET_STATUS.pending.value]: "chip-wrapper__bgabsent",
        [TIMESHEET_STATUS.past_due.value]: "chip-wrapper__bgabsentpink",
        [TIMESHEET_STATUS.vacation.value]: "chip-wrapper__bgvacation",
      };

      return variantStatusMap[status] || "";
    },

    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/profile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
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

  watch: {
    dates: {
      deep: true,
      handler: function(newVal, oldVal) {
        //To make sure the dates really changed, avoid making useless api calls
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.getAndParseTimesheets()
        }
      }
    }
  },
};
</script>
  
<style lang="scss" scoped>
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

.no-data-container {
  width: 100%;
  height: 10vh;
  text-align: center;
  font-size: 5vh;
  padding-top: 5vh;
  color: #eee;
}
</style>