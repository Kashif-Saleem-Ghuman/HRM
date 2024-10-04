<template>
  <bib-table
    :fields="tableFields"
    :sections="employees"
    :hide-no-column="true"
    :fixHeader="true"
    @column-header-clicked="headerColumnClick($event.column)"
    :key="
      employees?.length && employees[0]?.id
        ? `list-${employees[0].id}`
        : 'empty-list-0'
    "
    @item-clicked="tableItemClick"
    class="table"
    :class="{
      'table--light': isLightThemeCheck,
      'table--dark': !isLightThemeCheck,
    }"
  >
    <template #cell(name)="data">
      <div class="d-flex align-center text-left gap-05 position-relative">
        <div
          v-on:mouseover="profiletab('id_' + data.value.id)"
          v-on:mouseleave="profiletab('id_' + data.value.id, true)"
        >
          <div  class="avtar-contain">
            <bib-avatar
            variant="secondary-sub3"
            :text="$getEmployeeInitials(data.value)"
            size="2.3rem"
            v-show="data.value.photo === null"
          ></bib-avatar>
          <bib-avatar
            class="mt-auto mb-auto"
            shape="circle"
            :src="data.value.photo"
            v-show="data.value.photo != null"
            size="2.3rem"
          >
          </bib-avatar>
          </div>
          <div :id="'id_' + data.value.id" class="userCard">
            <user-info-card
              :user="data.value"
              @viewProfile="viewProfile(data.value.id)"
              @sendMeet.stop="makeCall(getUser.userId, data.value.userId)"
              @sendMessage="sendMessage(data.value.userId)"
              :active="data.value.active"
              :contactButtons="$isActiveUser(data.value.id)"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper cursor-pointer w-100">
          <div
            class="employee-name-label"
            :title="$getEmployeeFullName(data.value)"
            :class="isLightThemeCheck ? 'text-dark' : 'light'"
          >
            {{
              $getEmployeeFullName(data.value) | truncate(truncateText, "...")
            }}
          </div>
          <div :class="isLightThemeCheck ? 'text-dark' : 'light'">
            {{ data.value.jobTitle }}
          </div>
        </div>
        <notifications
          @clock-in-reminder="$clockInReminder({ employeeIds: [data.value.id] })"
          :timesheetSubmitReminderIcon="false"
          :clockInReminderIcon="shouldShowClockInReminderIcon(data)"
          iconName="time-alarm-solid"
        ></notifications>
      </div>
    </template>
    <template #cell(status)="data">
      <div class="cursor-pointer button-override">
        <attendance-status
          :attendanceStatusData="data.value"
        ></attendance-status>
      </div>
    </template>
    <template v-for="(day, dayIndex) in inOutAction" #[`cell(${day})`]="data">
      <div class="cursor-pointer">
        <chips
          :title="getInOutActivityTime(data.value, day)"
          :className="[getInOutClass(data.value?.activityReport?.[day])]"
        ></chips>
      </div>
    </template>
    <template #cell(breaks)="data">
      <div class="cursor-pointer">
        <span>{{ data.value?.activityReport.break ?? "--" }}</span>
      </div>
    </template>
    <template #cell(total)="data">
      <div>
        <span>{{
          updateTotalWorkedHours(data.value?.activityReport) ?? "--"
        }}</span>
      </div>
    </template>
    <template #cell_action="data">
      <bib-button
        pop="horizontal-dots"
        :iconVariant="isLightThemeCheck ? '' : 'light'"
        @click.native.stop
      >
        <template v-slot:menu>
          <div class="list">
            <span
              class="list__item"
              v-for="(key, index) in Object.keys(peopleActionItems)"
              :key="key"
              v-if="$isActiveUser(data.value.id) || index < 1"
              @click.stop="callAction(data, peopleActionItems[key])"
            >
              {{ peopleActionItems[key] }}</span
            >
          </div>
        </template>
      </bib-button>
    </template>
  </bib-table>
</template>

<script>
import { mapGetters } from "vuex";
import {
  TABLE_HEAD,
  PEOPLE_ACTION_ITEMS,
} from "../../../../utils/constant/Constant.js";
import {
  dateCheck,
  meetLink,
  makeCall,
} from "../../../../utils/functions/functions_lib";
import { formatHoursToHHMM } from "../../../../utils/functions/time";
import { sortColumn } from "../../../../utils/functions/table-sort";
import timezoneAbbr from "@/utils/constant/timezoneAbbreviations";

import {
  sendMessage,
  handleItemClick_Table,
} from "../../../../utils/functions/functions_lib";

import { DateTime } from "luxon";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
    gettodayDate: {
      type: String,
      default: DateTime.now().toISODate(),
    },
  },
  data() {
    return {
      modal3Opened: false,
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadDashboard,
      peopleActionItems: PEOPLE_ACTION_ITEMS,
      activityReportClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      filteredData: [],
      sortByField: null,
      inOutAction: TABLE_HEAD.tHeadDashboard.map((day) =>
        day.key.substring(0, 3)
      ),
      leaveType: "",
    };
  },
  beforeDestroy() {
    this.resetTableFields();
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
    const totalField = this.tableFields.find((field) => field.key === "total");
    totalField.header_icon.isActive = true; // Set total hours as active by default
    this.sortByField = totalField; // Set sortByField to totalField by default
  },
  computed: {
    employees() {
      if (!this.sortByField) return this.userList;
      return sortColumn({ items: this.userList, field: this.sortByField });
    },
    truncateText() {
      var screenWidth = window.screen.width;
      if (screenWidth >= "1920") {
        return 52;
      } else {
        return 25;
      }
    },
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  methods: {
    sendMessage,
    handleItemClick_Table,
    meetLink,
    makeCall,
    shouldShowClockInReminderIcon(data) {
      const currentDate = DateTime.now().toFormat("yyyy-MM-dd");
      const reportDate = DateTime.fromISO(this.gettodayDate).toFormat(
        "yyyy-MM-dd"
      );
      return (
        data?.value?.activityReport?.in == null &&  !data?.value?.requests.length  && reportDate === currentDate
      );
    },
    async callAction(data, value) {
      if (value === "View Profile") return this.viewProfile(data.value.id);
      if (value === "Send Message") return this.sendMessage(data.value.userId);
      if (value === "Meet")
        return await this.makeCall(data.value.userId, this.getUser.userId);
    },
    getStatusTitle(data) {
      const timers = data.timers ?? [];
      const inEntry = data.activityReport?.in;
      const outEntry = data.activityReport?.out;
      const leaveRequest =
        data.requests && data.requests.length > 0
          ? this.$leaveTypeCheck(data.requests[0].type)
          : null;
      if (leaveRequest) {
        return (
          "On Leave" +
          " - " +
          (leaveRequest.charAt(0).toUpperCase() + leaveRequest.slice(1))
        );
      }
      if (inEntry && outEntry) {
        return "Shift End";
      }

      if (timers.length > 0 || inEntry) {
        return "Present";
      }

      return "Absent";
    },

    resetTableFields() {
      this.tableFields.forEach(field => {
        if(field.hasOwnProperty('header_icon')){
          field.header_icon.isActive = false;
        }
      })
    },

    getInOutActivityTime(employee, activityType) {
      return (
        this.getInOutValue(employee?.activityReport?.[activityType]) +
        this.getTimezoneInOut(employee, activityType)
      );
    },

    getInOutValue(data) {
      return data ?? "--";
    },
    getTimezoneInOut(employee, activityType) {
      const now = DateTime.now();
      const zoneName = employee.timezone ?? now.zoneName;

      const emplZoneAbbr = this.getTimeAbbrByTimezoneName(zoneName);
      const clientZoneAbbr = this.getTimeAbbrByTimezoneName(now.zoneName);

      if (
        !employee?.activityReport?.[activityType] ||
        !employee.timezone ||
        clientZoneAbbr === emplZoneAbbr
      ) {
        return "";
      }
      let inOutTimeEntry = employee.timers.length
        ? employee.timers.find((timeEntry) => timeEntry.type === "in")
        : employee.timeEntries.find((timeEntry) => timeEntry.activity === "in");
      let time;
      if (activityType === "in") {
        time = DateTime.fromISO(inOutTimeEntry?.start, { zone: zoneName });
      } else {
        time = DateTime.fromISO(inOutTimeEntry?.end, { zone: zoneName });
      }

      if (!time.isValid) return "";

      return (
        " (" +
        time.toFormat("HH:mm") +
        (emplZoneAbbr ? " " + emplZoneAbbr : "") +
        ")"
      );
    },

    getTimeAbbrByTimezoneName(timeZoneName) {
      return timezoneAbbr.get(timeZoneName);
    },
    getInOutClass(data) {
      const inEntry = data;
      const outEntry = data;
      if (inEntry) {
        return "chip-wrapper__bgsucess";
      }
      if (outEntry === null) {
        return "chip-wrapper__bggray";
      }
      return "chip-wrapper__bggray";
    },
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
    },
    headerColumnClick(column) {
      this.sortColumn(column);
    },
    tableItemClick(event, key, item) {
      const id = item?.id;
      if (id) {
        this.viewAttendance(id);
      }
    },
    getTotalHours(minutes) {
      if (minutes == 0 || !minutes) return "00:00";
      const hours = minutes / 60;
      return formatHoursToHHMM(hours);
    },
    calculateWorkedMinutes(inTime) {
      const inDate = new Date();
      const [inHours, inMinutes] = inTime.split(":").map(Number);
      inDate.setHours(inHours, inMinutes, 0, 0);

      const currentDate = new Date();
      const diffMs = currentDate - inDate;
      const diffMinutes = Math.floor(diffMs / 1000 / 60);
      return diffMinutes;
    },
    updateTotalWorkedHours(activityReport) {
      if (activityReport.total == 0 || !activityReport.total) {
        if (activityReport.in == 0 || !activityReport.in || (activityReport.total == 0 && activityReport.out)) return "00:00";
        const workedMinutes = this.calculateWorkedMinutes(activityReport.in);
        return this.getTotalHours(workedMinutes);
      } else {
        return this.getTotalHours(activityReport.total);
      }
    },
    viewAttendance(id) {
      this.$router.push("/profile/" + id + "/time-attendance-profile-tab?view=day");
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
