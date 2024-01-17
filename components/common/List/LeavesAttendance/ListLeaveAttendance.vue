<template>
  <div>
    <bib-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="leaveData"
    :hide-no-column="true"
    :fixHeader=true
    >
      <template #cell(leavetype)="data">
        <div
          class="text-dark upper-case minus-ml cursor-pointer"
          @click="leaveDetail(data.value)"
        >
          <chips
            :title="data.value.type == null ? 'N/A' : data.value.type"
            iconShow="iconShow"
            :icon="getLeaveStatusIconVariant(data.value.type)"
            :variantIcon="getStatusIconVariant(data.value.status)"
          ></chips>
        </div>
      </template>
      <template #cell(start)="data">
        <div class="justify-left text-dark cursor-pointer" @click="leaveDetail(data.value)">
          <span>{{ onLoad(data.value.start) }}</span>
        </div>
      </template>
      <template #cell(end)="data">
        <div class="justify-left text-dark cursor-pointer" @click="leaveDetail(data.value)">
          <span>{{ onLoad(data.value.end) }}</span>
        </div>
      </template>
      <template #cell(duration)="data"> 
        <div class="justify-left text-dark cursor-pointer" @click="leaveDetail(data.value)">
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
    };
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
      this.$nuxt.$emit('open-sidebar', item)
      this.$nuxt.$emit('close-sidebar-main')
    },

    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
  },
};
</script>

<style lang="scss">
.minus-ml {
  margin-left: -8px;
}
.upper-case {
  text-transform: capitalize;
}
</style>
