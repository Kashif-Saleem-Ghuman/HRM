<template>
  <div>
    <bib-table
      :fields="tableFields"
      :sections="leavePendingList"
      :hide-no-column="true"
      :fixHeader="true"
      :key="
        leavePendingList?.length && leavePendingList[0]?.id
          ? `list-${leavePendingList[0].id}`
          : 'empty-list-0'
      "
      @column-header-clicked="headerColumnClick($event.column)"
      class="table"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
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
                $getEmployeeFullName(data.value.employee)
                  | truncate(45, "...")
              }}
            </div>
            <div :class="isLightThemeCheck ? 'description' : 'text-gray1'">
              {{ data.value.request.employee.jobTitle }}
            </div>
          </div>
        </div>
      </template>
      <template #cell(type)="data">
        <div class="justify-between" @click="$leaveDetail(data.value, this)">
          <span>{{ $leaveTypeCheck(data.value.type) }}</span>
        </div>
      </template>
      <template #cell(from)="data">
        <div class="justify-between" @click="$leaveDetail(data.value, this)">
          <span>{{ onLoad(data.value.request.start) }}</span>
        </div>
      </template>
      <template #cell(to)="data">
        <div class="justify-between" @click="$leaveDetail(data.value, this)">
          <span>{{ onLoad(data.value?.request.end) }}</span>
        </div>
      </template>
      <template #cell(total)="data">
        <div class="justify-between" @click="$leaveDetail(data.value, this)">
          <span>{{ formatDuration(data.value.duration) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div
          class="d-flex align-center cursor-pointer"
          @click="$leaveDetail(data.value, this)"
        >
          <div class="font-md d-flex align-center">
            <leave-status :leaveStatusData="data" @click="$leaveDetail(data.value)"></leave-status>
          </div>
        </div>
      </template>
      <template #cell(received)="data">
        <div class="justify-between" @click="$leaveDetail(data.value, this)">
          <span>{{ getDateTimeFormat(data.value.statusChangeDate) }}</span>
        </div>
      </template>
    </bib-table>
    <leave-sidebar></leave-sidebar>
  </div>
</template>

<script>
import fecha, { format } from "fecha";
import { sortColumn } from "../../../../utils/functions/table-sort";
import { TABLE_HEAD } from "@/utils/constant/Constant";
import {DateTime} from "luxon";
import {DATETIME_FORMAT} from "@/utils/functions/datetime-input";
import {getDateTimeFormat} from "../../../../utils/functions/time";
export default {
  props: {
    listPending: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadComingUp,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
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
  },
  methods: {
    getDateTimeFormat,
    async leaveDetail(item, event) {
      event.stopPropagation();
      this.$nuxt.$emit("open-sidebar", item);
      this.$nuxt.$emit("close-sidebar-main");
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
    formatDuration(duration) {
      if (duration === null || duration === undefined) {
        return "N/A";
      } else {
        const hours = Math.round(duration * 24);
        return `${duration} day${duration !== 1 ? "s" : ""} (${hours} hour${
          hours !== 1 ? "s" : ""
        })`;
      }
    },
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },
  },
};
</script>
