<template>
  <bib-table
    :fields="tableFields"
    class="border-gray4 bg-white"
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
  >
    <template #cell(name)="data">
      <div class="d-flex align-center text-left gap-05 position-relative">
        <div
          v-on:mouseover="profiletab('id_' + data.value.id)"
          v-on:mouseleave="profiletab('id_' + data.value.id, true)"
        >
          <bib-avatar
            variant="secondary-sub3"
            :text="getEmployeeInitials(data.value)"
            text-variant="primary"
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
          <div :id="'id_' + data.value.id" class="userCard">
            <user-info-card
              :user="data.value"
              @viewProfile="viewProfile(data.value.id)"
              @sendMeet.stop="makeCall(getUser.userId, data.value.userId)"
              @sendMessage="sendMessage(data.value.userId)"
              :active="data.value.active"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper cursor-pointer w-100">
          <div class="title" :title="getEmployeeFullName(data.value)">
            {{ getEmployeeFullName(data.value) | truncate(truncateText, "...") }}
          </div>
          <div class="description">
            {{ data.value.jobTitle }}
          </div>
        </div>
      </div>
    </template>
    <template #cell(status)="data">
      <div class="cursor-pointer">
        <chips-list
          :title="getStatusTitle(data.value)"
          iconShow="iconShow"
          icon="add"
          :className="[getStatusClass(data.value)]"
        ></chips-list>
      </div>
    </template>
    <template v-for="(day, dayIndex) in inOutAction" #[`cell(${day})`]="data">
      <div class="cursor-pointer">
        <chips
          :title="getInOutValue(data.value?.activityReport?.[day])"
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
          getTotalHours(data.value?.activityReport.total) ?? "--"
        }}</span>
      </div>
    </template>
  </bib-table>
</template>

<script>
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
import {
  dateCheck,
  meetLink,
  makeCall,
} from "../../../../utils/functions/functions_lib";
import { formatHoursToHHMM } from "../../../../utils/functions/time";
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "../../../../utils/functions/common_functions";
import { sortColumn } from "../../../../utils/functions/table-sort";

import {
  sendMeet,
  sendMessage,
  handleItemClick_Table,
} from "../../../../utils/functions/functions_lib";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      modal3Opened: false,
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadDashboard,
      activityReportClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      filteredData: [],
      sortByField: null,
      inOutAction: TABLE_HEAD.tHeadDashboard.map((day) =>
        day.key.substring(0, 3)
      ),
    };
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
  },
  computed: {
    employees() {
      if (!this.sortByField) return this.userList;
      return sortColumn({ items: this.userList, field: this.sortByField });
    },
    truncateText(){
      var screenWidth = window.screen.width;
      if (screenWidth >= "1920") {
      return 30;
    } else {
      return 20;
    }
    },
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  methods: {
    dateCheck,
    sendMeet,
    sendMessage,
    handleItemClick_Table,
    getEmployeeFullName,
    getEmployeeInitials,
    meetLink,
    makeCall,
    getStatusTitle(data) {
      const timers = data.timers ?? [];
      const inEntry = data.activityReport?.in && data.activityReport?.out;

      if (timers.length || inEntry) {
        return "Present";
      }

      return "Absent";
    },

    getInOutValue(data) {
      return data ?? "--";
    },
    getStatusClass(data) {
      const timers = data.timers ?? [];
      const inEntry = data.activityReport?.in && data.activityReport?.out;

      if (timers.length || inEntry) {
        return "chip-list-wrapper__sucess";
      }

      return "chip-list-wrapper__light";
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
        this.viewProfile(id);
      }
    },
    getTotalHours(minutes) {
      if (minutes == 0 || !minutes) return '00:00';
      const hours = minutes / 60;
      return formatHoursToHHMM(hours);
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
