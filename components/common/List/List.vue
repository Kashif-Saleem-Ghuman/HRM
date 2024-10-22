<template>
  <div class="position-relative h-300">
    <bib-table
      :fields="tableFields"
      class="table"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
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
        <div class="d-flex align-center text-left gap-05 position-relative cursor-pointer">
          <div
            v-on:mouseover="$profiletab('id_' + data.value.id)"
            v-on:mouseleave="$profiletab('id_' + data.value.id, true)"
          >
          <div class="avtar-contain">
            <bib-avatar
              variant="secondary-sub3"
              :text="$getEmployeeInitials(data.value)"
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
          </div>
            <div :id="'id_' + data.value.id" class="userCard">
              <user-info-card
                :user="data.value"
                @viewProfile="viewProfile(data.value.id)"
                @sendMeet="makeCall(getUser.userId, data.value.userId)"
                @sendMessage="sendMessage(data.value.userId)"
                :active="data.value.presence === 'in'"
                :contactButtons="$isActiveUser(data.value.id)"
              ></user-info-card>
            </div>
          </div>
          <div class="info_wrapper w-100"  @click="tableItemClick(data.value)">
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
        </div>
      </template>
      
      <template
        v-for="(day,) in employeeData"
        #[`cell(${day.key})`]="data"
      >
        <div>
          <div class="justify-between">
            <span>{{ getEmployeeDataValue(data.value, day.key) }}</span>
          </div>
        </div>
      </template>
      <template #cell(dateOfBirth)="data">
        <div class="justify-between">
          <span>{{
            onLoad(data.value.dateOfBirth)
          }}</span>
        </div>
      </template>
      <template #cell(hiredate)="data">
        <div class="justify-between">
          <span>{{
            onLoad(data.value.hireDate)
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import {
  TABLE_HEAD,
  PEOPLE_ACTION_ITEMS,
} from "../../../utils/constant/Constant.js";
import {
  sendMessage,
  handleItemClick_Table,
  meetLink,
  makeCall,
} from "../../../utils/functions/functions_lib";

import { sortColumn } from "../../../utils/functions/table-sort";
import { DateTime } from "luxon";
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";
import { getDepartmentsString } from "../../../utils/functions/employees-helper.js";

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
      employeeData: TABLE_HEAD.tHeadPeople.slice(2, 6),
      peopleActionItems: PEOPLE_ACTION_ITEMS,
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
    truncateText() {
      var screenWidth = window.screen.width;
      if (screenWidth >= "1920") {
        return 40;
      } else {
        return 25;
      }
    },
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  beforeDestroy() {
    this.$resetTableFieldsHeaderIcon(this.tableFields);
  },
  methods: {
    sendMessage,
    handleItemClick_Table,
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
    getEmployeeDataValue(data, key) {
      if (key === 'department') {
        return getDepartmentsString(data?.departments)
      }
      return data[key];
    },
    headerColumnClick(column) {
      this.sortColumn(column);
    },
    tableItemClick(item) {
      const id = item?.id;
      if (id) {
        this.viewProfile(id);
      }
    },

    onLoad(item) {
      if(!item) return '---';
      return DateTime.fromISO(item).toFormat(DATETIME_FORMAT);
    },

    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    callAction(data, value) {
      if (value === "View Profile") return this.viewProfile(data.value.id);
      if (value === "Send Message") return this.sendMessage(data.value.userId);
      if (value === "Meet")
        return this.makeCall(data.value.userId, this.getUser.userId);
    },
  },
};
</script>

<style lang="scss">
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
