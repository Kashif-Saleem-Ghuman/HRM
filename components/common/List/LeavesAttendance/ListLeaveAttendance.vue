<template>
  <div>
    <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="leaveData"
    :hide-no-column="true"
  >
    <template #cell(leavetype)="data">
      <div class="text-dark upper-case minus-ml" @click="leaveDetail(data.value)">
        <chips
          :title="data.value.type == null ? 'N/A' : data.value.type"
          iconShow="iconShow"
          :icon="getLeaveStatusIconVariant(data.value.type)"
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
            ? "N/A"
            : `${data.value.duration} day${data.value.duration > 1 ? "s" : ""}`
        }}</span>
      </div>
    </template>
    <template #cell(status)="data">
      <div class="d-flex align-center">
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
    <template #cell(reason)="data">
      <div class="justify-left text-dark">
        <span>{{ data.value.refusalReason }}</span>
      </div>
    </template>
    <template #cell(action)="data">
      <div class="justify-left text-dark" v-if="data.value.status == 'pending'">
        <bib-button
          :icon="$button.delete.icon"
          :variant="$button.delete.variant"
          :scale="$button.delete.scale"
          :label="$button.delete.label"
          class="mr-05 w-50"
          @click="$emit('delete-item', data.value.id)"
        ></bib-button>
      </div>
    </template>
  </custom-table>
  <action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      heading="Leave Details"
      icon="pencil"
      v-show="openSidebar"
    >
      <template v-slot:sidebar-body>
        <add-leave
          :employeeName="employeeName"
          :allowanceDays="getAllownaceDataValue"
          :usedDays="useDaysDataValue"
          :employeeNameSelect="employeeNameSlectedValue"
          :employeesOptions="employeesOptions"
          :employeeNameSelectShow="employeeNameSelectShow"
          :key="addLeaveKey"
          :startDate="startDate"
          :endDate="endDate"
          :note="form.note"
          inActive="disabled"
          :edit="false"
        ></add-leave>
        <div class="row">
          <div class="col-12">
            <div>
              <info-card-success
                :label="getStatusLabel(leaveStatus)"
                :message="getMessage(leaveStatus)
                "
                :icon="getLeaveStatusIcon(leaveStatus)"
                :variant="getLeaveTypeIconVariant(leaveStatus)
                 
                "
                :className="getLeaveTypeClassName(leaveStatus)"
                :classNameWrapper="getTextVariant(leaveStatus)"
              ></info-card-success>
            </div>
          </div>
        </div>
      </template>
    </action-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
import { getEmployeeFullName } from "@/utils/functions/common_functions"
import { TABLE_HEAD, apiKeyUsedValue, apiKeyAllowanceValue  } from "@/utils/constant/Constant";
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
      openSidebar: false,
      form: {},
      slideClass: "slide-in",
      startDate: "",
      endDate: "",
      employeeNameSelect: "",
      employeeName: "",
      employeesOptions: [],
      apiUsedValue: apiKeyUsedValue,
      apiAllowanceValue: apiKeyAllowanceValue,
      leaveStatus: "",
      addLeaveKey: 0,
      employeeNameSelectShow: false,
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{label: "", value: ""}, ...reportTo];
      this.employeeNameSelectShow = true;
    });
  },

  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getLeaveAllowance: "leavesdata/getLeaveAllowance",
    }),
    useDaysDataValue() {
      const keyValue = this.apiUsedValue[this.leaveTypeActiveValue];
      return this.getLeaveAllowance[keyValue];
    },
    getAllownaceDataValue() {
      const keyValueAllowance =
        this.apiAllowanceValue[this.leaveTypeActiveValue];
      return this.getLeaveAllowance[keyValueAllowance];
    },
    employeeNameSlectedValue() {
      return this.employeeNameSelect;
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
    getEmployeeFullName,
    getMessage(MESSAGE){
      const messageStatus={
        approved : `Request approved by ${getEmployeeFullName(this.form.manager)}`,
        pending:'Pending',
        rejected:this.form.refusalReason
      }
      return MESSAGE = messageStatus[MESSAGE]
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    },
    async leaveDetail(item){
      this.slideClass = "slide-in";
      this.employeeNameSelectShow = true;
      this.addLeaveKey += 1;
      this.leaveTypeActiveValue = item.type
      await this.$store
      .dispatch("leavesdata/setLeaveVacationsAllowance", item.employeeId)
      .then((result) => {
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });
      this.leaveStatus = item.status;
      this.form = item
      this.employeeNameSelect = item.employeeId
      this.employeeName = this.getEmployeeFullName(item)
      this.startDate = fecha.format(new Date(this.form.start),"YYYY-MM-DD");
      this.endDate = fecha.format(new Date(this.form.end), "YYYY-MM-DD");
      this.openSidebar = true;
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
