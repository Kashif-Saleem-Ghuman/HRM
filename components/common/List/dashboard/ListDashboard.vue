<template>
  <bib-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="employees"
    :hide-no-column="true"
    :fixHeader="true"
    @employee-name-sort="sortColumn('name')"
    @employee-status-sort="sortColumn('status')"
    @employee-in-sort="sortColumn('in')"
    @employee-out-sort="sortColumn('out')"
    @employee-breaks-sort="sortColumn('breaks')"
    @employee-total-sort="sortColumn('total')"
  >
    <template #cell(name)="data">
      <div
        class="d-flex align-center text-left gap-05"
        style="position: relative"
      >
        <div
          style="cursor: pointer"
          v-on:mouseover="profiletab('id_' + data.value.id)"
          v-on:mouseleave="profiletab('id_' + data.value.id, true)"
        >
          <bib-avatar
            variant="secondary-sub3"
            :text="getEmployeeInitials(data.value)"
            text-variant="primary"
            size="2.3rem"
            v-show="data.value.photo === null"
            style="font-weight: 500"
          ></bib-avatar>
          <bib-avatar
            class="mt-auto mb-auto"
            shape="circle"
            :src="data.value.photo"
            v-show="data.value.photo != null"
            size="2.3rem"
          >
          </bib-avatar>
          <div :id="'id_' + data.value.id" style="" class="userCard">
            <user-info-card
              :user="data.value"
              @viewProfile="viewProfile(data.value.id)"
              @sendMeet.stop="makeCall(getUser.userId, data.value.userId)"
              @sendMessage="sendMessage(data.value.userId)"
              :active="data.value.active"
            ></user-info-card>
          </div>
        </div>
        <div
          class="info_wrapper"
          style="width: 100%; cursor: pointer"
          @click="handleItemClick_Table(data.value.id, $event)"
        >
          <div class="title" :title="getEmployeeFullName(data.value)">
            {{ getEmployeeFullName(data.value) | truncate(22, "...") }}
          </div>
          <div class="description">
            {{ data.value.jobTitle }}
          </div>
        </div>
      </div>
    </template>
    <template #cell(status)="data">
      <div class="" @click="handleItemClick_Table(data.value.id, $event)">
        <chips-list
          :title="getStatusTitle(data.value)"
          iconShow="iconShow"
          icon="add"
          :className="[getStatusClass(data.value)]"
        ></chips-list>
      </div>
    </template>
    <template #cell(in)="data">
      <div @click="handleItemClick_Table(data.value.id, $event)">
        <chips
          :title="
            data.value?.activityReport.in == null
              ? '--'
              : data.value.activityReport.in
          "
          :className="[
            data.value?.activityReport.in ? 'chip-wrapper__bgsucess' : '',
            data.value?.activityReport.vacation
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.activityReport.absent
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.activityReport.in == null ? 'chip-wrapper__bggray' : '',
          ]"
        ></chips>
      </div>
    </template>
    <template #cell(out)="data">
      <div @click="handleItemClick_Table(data.value.id, $event)">
        <chips
          :title="
            data.value?.activityReport.out == null
              ? '--'
              : data.value?.activityReport.out
          "
          :className="[
            data.value?.activityReport.out ? 'chip-wrapper__bgsucess' : '',
            data.value?.activityReport.out == null
              ? 'chip-wrapper__bggray'
              : '',
          ]"
        ></chips>
      </div>
    </template>
    <template #cell(breaks)="data">
      <div @click="handleItemClick_Table(data.value.id, $event)">
        <span>{{
          data.value?.activityReport.break == null
            ? "--"
            : data.value?.activityReport.break
        }}</span>
      </div>
    </template>
    <template #cell(total)="data">
      <div @click="handleItemClick_Table(data.value.id, $event)">
        <span>{{
          data.value?.activityReport.total == null
            ? "--"
            : getTotalHours(data.value?.activityReport.total)
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
import { DASHBOARD_DATA } from "../../../../utils/constant/DashboardData";
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
      localData: DASHBOARD_DATA,
      filteredData: [],
      sortByField: null,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser")
  },
  computed: {
    employees() {
      if (!this.sortByField) return this.userList;
      return sortColumn({ items: this.userList, field: this.sortByField });
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
    getStatusClass(data) {
      const timers = data.timers ?? [];
      const inEntry = data.activityReport?.in && data.activityReport?.out;

      if (timers.length || inEntry) {
        return "chip-list-wrapper__sucess";
      }

      return "chip-list-wrapper__light";
    },
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
    },
    tableItemClick(event, key, item) {
      const id = item?.id;
      if (id) {
        this.viewProfile(id);
      }
    },
    close() {
      this.timesheetModal = false;
    },
    getTotalHours(minutes) {
      if (minutes == 0 || !minutes) return 0;
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

    handleAction_Table(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
.table {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}
.table__hrow th:first-child {
  border-left: none !important;
  padding-left: 1.1rem !important;
}
.table__hrow th:last-child {
  border-right: none !important;
}
.table__irow td {
  color: #000 !important;
  border-right: none !important;
}
.table__irow td:first-child {
  padding-left: 0.9rem !important;
  border-left: none !important;
}
.table__hrow-fixed {
  position: sticky;
  top: -1px !important;
  z-index: 4;
  left: 0;
}
.table__hrow__active {
  border: none !important;
}
</style>
