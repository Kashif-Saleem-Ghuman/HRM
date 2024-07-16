<template>
  <div>
    <custom-tabs-table
      :fields="tableFields"
      :sections="leavePendingList"
      :collapseObjs="collapseObj"
      :hide-no-column="true"
      @column-header-clicked="headerColumnClick($event.column)"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
      class="table"
      cellspacing="0"
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
              :text="getEmployeeInitials(data.value.employee)"
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
            <div :title="getEmployeeFullName(data.value.employee)">
              {{
                getEmployeeFullName(data.value.employee)
                  | truncate(truncateText, "...")
              }}
            </div>
            <div :class="isLightThemeCheck ? 'description' : 'text-gray1'">
              {{ data.value.request.employee.jobTitle }}
            </div>
          </div>
        </div>
      </template>
      <template #cell(type)="data">
        <div class="justify-between text-dark">
          <span>{{ $leaveTypeCheck(data.value.type) }}</span>
        </div>
      </template>
      <template #cell(from)="data">
        <div class="justify-between text-dark">
          <span>{{ onLoad(data.value.request.start) }}</span>
        </div>
      </template>
      <template #cell(to)="data">
        <div class="justify-between text-dark">
          <span>{{ onLoad(data.value?.request.end) }}</span>
        </div>
      </template>
      <template #cell(total)="data">
        <div class="justify-between text-dark">
          <span>{{ formatDuration(data.value.duration) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div
          class="d-flex align-center cursor-pointer"
         
          @click="leaveDetail(data.value)"
        >
          <div class="font-md d-flex align-center">
            <bib-icon
              :icon="getLeaveStatusIcon(data.value.status)"
              :variant="getStatusIconVariant(data.value.status)"
              class="mr-025"
            ></bib-icon>
            <aside :class="getTextVariant(data.value.status)">
              {{ getStatusLabel(data.value.status) }}
            </aside>
          </div>
        </div>
      </template>
      <template #cell(received)="data">
        <div class="justify-between text-dark">
          <span>{{ onLoad(data.value.start) }}</span>
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
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "../../../../utils/functions/common_functions";
import { sortColumn } from "../../../../utils/functions/table-sort";
import {
  meetLink,
  sendMessage,
  makeCall,
} from "../../../../utils/functions/functions_lib";
import fecha, { format } from "fecha";
import {
  getLeaveStatusIcon,
  getStatusIconVariant,
  getStatusLabel,
  getTextVariant,
} from "@/utils/functions/status-helpers";
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
          isCollapsed: false,
          label: "Due Today",
          variant: "primary",
          sections: this.getTodaySections(),
        },
        {
          isCollapsed: false,
          label: "Tomorrow",
          variant: "primary",
          sections: this.getTomorrowSections(),
        },
        {
          isCollapsed: false,
          label: "This Week",
          variant: "primary",
          sections: this.getThisWeekSections(),
        },
        {
          isCollapsed: false,
          label: "Next Week",
          variant: "primary",
          sections: this.getNextWeekSections(),
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
    getEmployeeFullName,
    getEmployeeInitials,
    meetLink,
    sendMessage,
    makeCall,
    getLeaveStatusIcon,
    getStatusIconVariant,
    getStatusLabel,
    getTextVariant,
    async leaveDetail(item) {
      const data = item.request;
      event.stopPropagation();
      this.$nuxt.$emit("open-sidebar", data);
      this.$nuxt.$emit("close-sidebar-main");
    },
    formatDuration(duration) {
      if (duration === null || duration === undefined) {
        return "N/A";
      } else {
        const days = Math.floor(duration);
        const hours = Math.round(days * 24);
        return `${days} day${days !== 1 ? "s" : ""} (${hours} hour${
          hours !== 1 ? "s" : ""
        })`;
      }
    },
   sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      console.log(field,"sortByFieldsortByFieldsortByFieldsortByFieldsortByField")
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
    parseDate(date) {
      if (!date) return null;
      const isoDate = DateTime.fromISO(date, { zone: "utc" });
      if (isoDate.isValid) return isoDate;
      return DateTime.fromFormat(date, "yyyy-MM-dd");
    },
    isToday(date) {
      const itemDate = this.parseDate(date);
      if (!itemDate) return false;
      const today = DateTime.local();
      return itemDate.hasSame(today, "day");
    },
    isTomorrow(date) {
      const itemDate = this.parseDate(date);
      if (!itemDate) return false;
      const tomorrow = DateTime.local().plus({ days: 1 });
      return itemDate.hasSame(tomorrow, "day");
    },
    isThisWeek(date) {
      const itemDate = this.parseDate(date);
      if (!itemDate) return false;
      const today = DateTime.local();
      const startOfWeek = today.startOf("week");
      const endOfWeek = today.endOf("week");
      return itemDate >= startOfWeek && itemDate <= endOfWeek;
    },
    isNextWeek(date) {
      const itemDate = this.parseDate(date);
      if (!itemDate) return false;
      const today = DateTime.local();
      const startOfNextWeek = today.plus({ weeks: 1 }).startOf("week");
      const endOfNextWeek = today.plus({ weeks: 1 }).endOf("week");
      return itemDate >= startOfNextWeek && itemDate <= endOfNextWeek;
    },
    getTodaySections() {
      return this.leavePendingList.filter((item) => this.isToday(item.start));
    },
    getTomorrowSections() {
      return this.leavePendingList.filter((item) => this.isTomorrow(item.start));
    },
    getThisWeekSections() {
      return this.leavePendingList.filter((item) => this.isThisWeek(item.start));
    },
    getNextWeekSections() {
      return this.leavePendingList.filter((item) => this.isNextWeek(item.start));
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
