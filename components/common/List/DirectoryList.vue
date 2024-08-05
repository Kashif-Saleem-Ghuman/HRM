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
        <div class="d-flex align-center text-left gap-05 position-relative">
          <div>
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
            <!-- <div :id="'id_' + data.value.id" class="userCard">
              <user-info-card
                :user="data.value"
                @viewProfile="viewProfile(data.value.id)"
                @sendMeet="makeCall(getUser.userId, data.value.userId)"
                @sendMessage="sendMessage(data.value.userId)"
                :active="data.value.presence === 'in'"
              ></user-info-card>
            </div> -->
          </div>
          <div class="info_wrapper w-100 cursor-pointer">
            <div
              class="title"
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
      <template #cell(email)="data">
        <div class="cursor-pointer">
          <div class="justify-between">
            <span>{{ data.value?.email }}</span>
          </div>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="cursor-pointer">
          <attendance-status :attendanceStatusData="data.value" minWidth="min-width: 85px !important;"></attendance-status>
        </div>
      </template>
      <template #cell(jobTitle)="data">
        <div class="justify-between cursor-pointer">
          <span>{{ data.value.jobTitle }}</span>
        </div>
      </template>
      <template #cell(department)="data">
        <div class="justify-between cursor-pointer">
          <span>{{
            data.value.department
          }}</span>
        </div>
      </template>
      <template #cell(location)="data">
        <div class="justify-between cursor-pointer">
          <span>{{
            data.value.address.country
          }}</span>
        </div>
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
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadDirectory,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      sortByField: null,
      employeeData: TABLE_HEAD.tHeadDirectory.slice(2, 6),
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
    getValue(value) {
      return value ?? "--";
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
    getStatusTitle(data) {
      const presence = data.presence;
      // const leaveRequest =
      //   data.requests && data.requests.length > 0
      //     ? data.requests[0].type
      //     : null;
      // if (leaveRequest) {
      //   return (
      //     "On Leave" +
      //     " - " +
      //     (leaveRequest.charAt(0).toUpperCase() + leaveRequest.slice(1))
      //   );
      // }
      if (presence === 'in') {
        return "Present";
      }
      if (presence === 'out') {
        return "Offline";
      }
    },
    getStatusClass(data) {
      const presence = data.presence;
      if (presence === 'in') {
        return "chip-list-wrapper__sucess";
      }

      return "chip-list-wrapper__light";
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
