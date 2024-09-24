<template>
  <div>
    <bib-table
      :fields="tableFields"
      :sections="leaveList"
      :hide-no-column="true"
      :fixHeader="true"
      :key="
        leaveList?.length && leaveList[0]?.id
          ? `list-${leaveList[0].id}`
          : 'empty-list-0'
      "
      @column-header-clicked="headerColumnClick($event.column)"
      class="table"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
    >
      <template #cell(leavetype)="data">
        <div
          class="upper-case cursor-pointer" style="margin-left: -5px;"
          @click="leaveDetail(data.value)"
        >
          <chips
            :title="$leaveTypeCheck(data.value.type)"
            :iconShowLeft="true"
            :icon="$getLeaveStatusIconVariant(data.value.type)"
            :variantIcon="$getStatusIconVariant(data.value.status)"
          ></chips>
        </div>
      </template>
      <template #cell(start)="data">
        <div
          class="justify-left cursor-pointer"
          @click="leaveDetail(data.value)"
        >
          <span>{{ formatDate(data.value.start) }}</span>
        </div>
      </template>
      <template #cell(end)="data">
        <div
          class="justify-left cursor-pointer"
          @click="leaveDetail(data.value)"
        >
          <span>{{ formatDate(data.value.end) }}</span>
        </div>
      </template>
      <template #cell(duration)="data">
        <div
          class="justify-left cursor-pointer"
          @click="leaveDetail(data.value)"
        >
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
        <leave-status :leaveStatusData="data" @click="leaveDetail(data.value)"></leave-status>
      </template>
    </bib-table>
    <leave-sidebar></leave-sidebar>
  </div>
</template>

<script>
import { sortColumn } from "../../../../utils/functions/table-sort";
import { TABLE_HEAD } from "@/utils/constant/Constant";
import { formatLeaveDate } from "../../../../utils/functions/leave-request-helper";

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
  computed: {
    leaveList() {
      if (!this.sortByField) return this.leaveData;

      return sortColumn({ items: this.leaveData, field: this.sortByField });
    },
  },
  methods: {
    async leaveDetail(item) {
      // event.stopPropagation();
      this.$nuxt.$emit("open-sidebar", item);
      // this.$nuxt.$emit("close-sidebar-main");
    },
    sortColumn(columnKey) {
      if (this.sortByField && this.sortByField.key != columnKey) {
        this.sortByField.header_icon.isActive = false;
      }
      const field = this.tableFields.find((field) => field.key === columnKey);
      console.log(
        columnKey,
        field,
        "sortByFieldsortByFieldsortByFieldsortByFieldsortByField"
      );
      field.header_icon.isActive = !field.header_icon.isActive;
      this.sortByField = field;
    },
    headerColumnClick(column) {
      this.sortColumn(column);
    },
    formatDate(isoDate) {
      return formatLeaveDate(isoDate);
    },
  },
};
</script>

<style lang="scss">
.table__hrow__active {
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
