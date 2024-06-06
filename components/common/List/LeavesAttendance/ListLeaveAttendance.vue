<template>
  <div>
    <bib-table
    :fields="tableFields"
    :sections="leaveList"
    :hide-no-column="true"
    :fixHeader=true
    :key="leaveList?.length && leaveList[0]?.id ? `list-${leaveList[0].id}` : 'empty-list-0'"
    @column-header-clicked="headerColumnClick($event.column)"
    >
      <template #cell(leavetype)="data">
        <div
          class="upper-case minus-ml cursor-pointer" 
          @click="leaveDetail(data.value)"
        >
          <chips
            :title="data.value.type == 'leave' ? 'Personal Leave' : data.value.type"
            iconShow="iconShow"
            :icon="getLeaveStatusIconVariant(data.value.type)"
            :variantIcon="getStatusIconVariant(data.value.status)"
          ></chips>
        </div>
      </template>
      <template #cell(start)="data">
        <div class="justify-left cursor-pointer" @click="leaveDetail(data.value)">
          <span>{{ onLoad(data.value.start) }}</span>
        </div>
      </template>
      <template #cell(end)="data">
        <div class="justify-left cursor-pointer" @click="leaveDetail(data.value)">
          <span>{{ onLoad(data.value.end) }}</span>
        </div>
      </template>
      <template #cell(duration)="data"> 
        <div class="justify-left cursor-pointer" @click="leaveDetail(data.value)">
          <span>{{
            data.value.duration == null
              ? "N/A"
              : `${data.value.duration} day${
                  data.value.duration > 1 ? "s" : ""
                }`
          }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="d-flex align-center cursor-pointer" @click="leaveDetail(data.value)">
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
    </bib-table>
    <leave-sidebar></leave-sidebar>
  </div>
</template>

<script>
import fecha, { format } from "fecha";
import {
  getLeaveStatusIcon,
  getLeaveStatusIconVariant,
  getStatusIconVariant,
  getStatusLabel,
  getTextVariant,
  getLeaveTypeIconVariant,
  getLeaveTypeClassName,
} from "@/utils/functions/status-helpers";
import { sortColumn } from "../../../../utils/functions/table-sort";

import {
  TABLE_HEAD,
} from "@/utils/constant/Constant";
export default {
  props: {
    leaveData: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadAttendanceUser,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      sortByField: null,
    };
  },
  computed:{
    leaveList() {
      if (!this.sortByField) return this.leaveData;

      return sortColumn({ items: this.leaveData, field: this.sortByField });
    },
  },
  methods: {
    getLeaveStatusIcon,
    getLeaveStatusIconVariant,
    getStatusIconVariant,
    getStatusLabel,
    getTextVariant,
    getLeaveTypeIconVariant,
    getLeaveTypeClassName,
    async leaveDetail(item) {
      event.stopPropagation();
      this.$nuxt.$emit('open-sidebar', item)
      this.$nuxt.$emit('close-sidebar-main')
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
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
  },
};
</script>

<style lang="scss">
.table__hrow__active{
  border-left: 1px solid var(--bib-gray4) !important;
  border-bottom: 1px solid !important;
}
body .table .table__hrow__active {
  border-bottom-color: var(--bib-gray4) !important;
}
.minus-ml {
  margin-left: -8px;
}
.upper-case {
  text-transform: capitalize;
}

</style>
