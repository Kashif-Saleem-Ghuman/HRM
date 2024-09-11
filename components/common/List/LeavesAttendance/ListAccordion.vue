<template>
  <div>
    <custom-tabs-table
      :fields="tableFields"
      :sections="leavePendingList"
      :collapseObjs="collapseObj"
      :hide-no-column="true"
      @column-header-clicked="headerColumnClick($event.column)"
      @change-open-collapse="changeOpenCollapse"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
      class="table"
      cellspacing="0"
      :fixHeader="true"
    >
      <template #cell(name)="data">
        <div class="d-flex align-center text-left gap-05 position-relative">
          <div
            class="cursor-pointer"
            v-on:mouseover="profiletab('id_' + data.value.employee.id)"
            v-on:mouseleave="profiletab('id_' + data.value.employee.id, true)"
          >
            <bib-avatar
              variant="secondary-sub3 font-w-600"
              :text="$getEmployeeInitials(data.value.employee)"
              text-variant="primary"
              size="2.7rem"
              v-show="data.value.employee.photo === null"
            ></bib-avatar>
            <bib-avatar
              class="mt-auto mb-auto"
              shape="circle"
              :src="data.value.employee.photo"
              v-show="data.value.employee.photo != null"
              size="2.7rem"
            ></bib-avatar>
            <div :id="'id_' + data.value.employee.id" class="userCard">
              <user-info-card
                :user="data.value.employee"
                @viewProfile="viewProfile(data.value.employee.id)"
                @sendMeet.stop="
                  makeCall(getUser.userId, data.value.employee.userId)
                "
                @sendMessage="sendMessage(data.value.employee.userId)"
              ></user-info-card>
            </div>
          </div>
          <div class="info_wrapper">
            <div :title="$getEmployeeFullName(data.value.employee)">
              {{
                $getEmployeeFullName(data.value?.employee)
                  | truncate(truncateText, "...")
              }}
            </div>
            <div :class="isLightThemeCheck ? 'description' : 'text-gray1'">
              {{ data.value?.employee?.jobTitle }}
            </div>
          </div>
        </div>
      </template>
      <template #cell(type)="data">
        <div class="justify-between cursor-pointer" @click.stop.prevent="$leaveDetail(data.value, this)">
          <span>{{ $leaveTypeCheck(data.value.type) }}</span>
        </div>
      </template>
      <template #cell(from)="data">
        <div class="justify-between cursor-pointer" @click.stop.prevent="$leaveDetail(data.value, this)">
          <span>{{ onLoad(data.value.start) }}</span>
        </div>
      </template>
      <template #cell(to)="data">
        <div class="justify-between cursor-pointer" @click.stop.prevent="$leaveDetail(data.value, this)">
          <span>{{ onLoad(data.value?.end) }}</span>
        </div>
      </template>
      <template #cell(total)="data">
        <div class="justify-between cursor-pointer" @click.stop.prevent="$leaveDetail(data.value, this)">
          <span>{{ formatDuration(data.value.duration) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div
          class="d-flex align-center cursor-pointer"
          @click.stop.prevent="$leaveDetail(data.value, this)"
        >
          <div class="font-md d-flex align-center">
            <leave-status :leaveStatusData="data" @click.stop.prevent="$leaveDetail(data.value)"></leave-status>
          </div>
        </div>
      </template>
      <template #cell(received)="data">
        <div class="justify-between">
          <span>{{ getDateTimeFormat(data.value.created_at) }}</span>
        </div>
      </template>
    </custom-tabs-table>
    <leave-sidebar></leave-sidebar>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../../../utils/constant/Constant";
import { sortColumn } from "../../../../utils/functions/table-sort";
import {
  meetLink,
  sendMessage,
  makeCall,
} from "../../../../utils/functions/functions_lib";
import fecha, { format } from "fecha";
import {getDateTimeFormat} from "../../../../utils/functions/time";
export default {
  props: {
    listPending: {
      type: [Array, Object],
      default: "",
    },
    checked: {
      type: Boolean,
    },
    checkedAll: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadComingUp.slice(1),
      sortByField: null,
      openCollapses: {
        due_today: {
          collapse: false,
        },
        tomorrow: {
          collapse: false,
        },
        this_week: {
          collapse: false,
        },
        next_week: {
          collapse: true,
        },
        this_month: {
          collapse: true,
        }
      },
    };
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
  },
  computed: {
    leavePendingList() {
      if (!this.sortByField) return this.listPending;

      return sortColumn({ items: this.listPending, field: this.sortByField });
    },

    collapseObj() {
      return [
        {
          value: 'due_today',
          isCollapsed: this.openCollapses.due_today.collapse,
          label: "Due Today",
          variant: this.getIconThemeCheck(),
          sections: this.leavePendingList.filter((item) => item.isToday()),
        },
        {
          value: 'tomorrow',
          isCollapsed: this.openCollapses.tomorrow.collapse,
          label: "Tomorrow",
          variant:  this.getIconThemeCheck(),
          sections: this.leavePendingList.filter((item) => item.isTomorrow()),
        },
        {
          value: 'this_week',
          isCollapsed: this.openCollapses.this_week.collapse,
          label: "This Week",
          variant:  this.getIconThemeCheck(),
          sections: this.leavePendingList.filter((item) => item.isThisWeek()),
        },
        {
          value: 'next_week',
          isCollapsed: this.openCollapses.next_week.collapse,
          label: "Next Week",
          variant:  this.getIconThemeCheck(),
          sections: this.leavePendingList.filter((item) => item.isNextWeek()),
        },
        {
          value: 'this_month',
          isCollapsed: this.openCollapses.this_month.collapse,
          label: "This Month",
          variant:  this.getIconThemeCheck(),
          sections: this.leavePendingList.filter((item) => item.isThisMonth()),
        },
      ];
    },
    truncateText() {
      return window.screen.width >= 1920 ? 40 : 25;
    },
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
    }),
  },
  methods: {
    getDateTimeFormat,
    meetLink,
    sendMessage,
    makeCall,

    changeOpenCollapse(type) {
      if (this.openCollapses[type]) {
        this.openCollapses[type].collapse = !this.openCollapses[type].collapse;
      }
    },
    formatDuration(duration) {
      if (duration === null || duration === undefined) {
        return "N/A";
      } else {
        return `${duration} day${duration !== 1 ? "s" : ""}`;
      }
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
      this.sortColumn(column.key);
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
    getIconThemeCheck(){
      return this.isLightThemeCheck ? 'dark' : 'light'
    },
    toggleCollapse(index) {
      this.$set(
        this.collapseObj[index],
        "isCollapsed",
        !this.collapseObj[index].isCollapsed
      );
    },
  },
};
</script>
