<template>
  <div class="position-relative h-300">
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
    >
      <template #cell(name)="data">
        <div
          class="d-flex align-center text-left gap-05"
          style="position: relative"
        >
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
            <div :id="'id_' + data.value.id" style="" class="userCard">
              <user-info-card
                :user="data.value"
                @viewProfile="viewProfile(data.value.id)"
                @sendMeet="makeCall(getUser.userId, data.value.userId)"
                @sendMessage="sendMessage(data.value.userId)"
                :active="data.value.presence === 'in'"
              ></user-info-card>
            </div>
          </div>
          <div class="info_wrapper" style="width: 100%; cursor: pointer">
            <div class="title" title="getEmployeeFullName(data.value)">
              {{ getEmployeeFullName(data.value) | truncate(16, "...") }}
            </div>
            <div class="description">
              {{ data.value.jobTitle }}
            </div>
          </div>
        </div>
      </template>
      <template #cell(email)="data">
        <div class="text-dark cursor-pointer">
          <div class="justify-between text-dark">
            <span>{{ data.value.email }}</span>
          </div>
        </div>
      </template>
      <template #cell(telephone)="data">
        <div class="justify-between text-dark cursor-pointer">
          <span>{{
            data.value.phone === null
              ? "---"
              : data.value.phone || data.value.phone != ""
              ? data.value.phone
              : "---"
          }}</span>
        </div>
      </template>
      <template #cell(department)="data">
        <div class="justify-between text-dark cursor-pointer">
          <span>{{
            data.value.department == null ? "HRM" : data.value.department
          }}</span>
        </div>
      </template>
      <template #cell(hiredate)="data">
        <div class="justify-between text-dark cursor-pointer">
          <span>{{
            data.value.hireDate == null ? "---" : onLoad(data.value.hireDate)
          }}</span>
        </div>
      </template>
    </bib-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { TABLE_HEAD } from "../../../utils/constant/Constant.js";
import {
  sendMeet,
  sendMessage,
  handleItemClick_Table,
  meetLink,
  makeCall,
} from "../../../utils/functions/functions_lib";
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "../../../utils/functions/common_functions";

import { sortColumn } from "../../../utils/functions/table-sort";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadPeople,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      sortByField: null,
      columnSortDirection: {
        name: "asc",
        extension: "asc",
        updatedAt: "asc",
        owner: "asc",
      },
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
  },
  computed: {
    employees() {
      if (!this.sortByField) return this.userList;

      return sortColumn({ items: this.userList, field: this.sortByField });
    },
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  methods: {
    sendMeet,
    sendMessage,
    handleItemClick_Table,
    getEmployeeFullName,
    getEmployeeInitials,
    meetLink,
    makeCall,
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
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },

    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },
  },
};
</script>

<style lang="scss">
@media (min-width: 500px) {
  body {
    font-size: 10px;
  }
}
@media (min-width: 768px) {
  body {
    font-size: 11px;
  }
}

@media (min-width: 1400px) {
  body {
    font-size: 14px;
  }
}
.info_wrapper {
  color: $black;
  font-weight: normal;
}

.title {
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: $black;
}
</style>
