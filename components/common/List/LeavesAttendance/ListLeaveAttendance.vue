<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="leaveData"
    :hide-no-column="true"
  >
    <template #cell(leavetype)="data">
      <div class="text-dark upper-case minus-ml">
        <chips
          :title="data.value.type == null ? 'N/A' : data.value.type"
          iconShow="iconShow"
          :icon="getLeaveTypeIcon(data.value.type)"
          :variantIcon="getStatusIconVariant(data.value.status)"
        ></chips>
      </div>
    </template>
    <template #cell(start)="data">
      <div class="justify-left text-dark">
        <span>{{ onLoad(data.value.start) }}</span>
      </div>
    </template>
    <template #cell(end)="data">
      <div class="justify-left text-dark">
        <span>{{ onLoad(data.value.end) }}</span>
      </div>
    </template>
    <template #cell(duration)="data">
      <div class="justify-left text-dark">
        <span>{{
          data.value.duration == null
            ? "No record Found"
            : data.value.duration / 24 + " days"
        }}</span>
        <span>{{
          data.value.duration == 12
            ? "Null value found"
            : "(" + data.value.duration + " hrs)"
        }}</span>
      </div>
    </template>
    <template #cell(status)="data">
      <div class="d-flex align-center">
        <div class="font-md d-flex align-center">
          <bib-icon
            :icon="getStatusIcon(data.value.status)"
            :variant="getStatusIconVariant(data.value.status)"
            class="mr-025"
          ></bib-icon>
          <aside :class="getTextVariant(data.value.status)">
            {{ getStatusLabel(data.value.status) }}
          </aside>
        </div>
      </div>
    </template>
  </custom-table>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import {
  getStatusIcon,
  getLeaveTypeIcon,
  getStatusIconVariant,
  getStatusLabel,
  getTextVariant,
} from "@/utils/functions/check_variant";
import { TABLE_HEAD } from "../../../../utils/constant/Constant";
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
      startDate: "",
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
  },

  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
    }),
  },
  methods: {
    getStatusIcon,
    getLeaveTypeIcon,
    getStatusIconVariant,
    getStatusLabel,
    getTextVariant,
    getTextVariant,
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
