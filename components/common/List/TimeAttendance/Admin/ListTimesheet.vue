<template>
  <div class="remove-pad">
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="timesheetsList"
      :hide-no-column="true"
    >
      <template #cell(name)="data">
        <div
          class="d-flex px-1 align-center text-left gap-05 py-025"
          style="position: relative; width: 220px"
        >
          <div
            style="cursor: pointer"
            v-on:mouseover="profiletab('id_' + data.value.id)"
            v-on:mouseleave="profiletab('id_' + data.value.id, true)"
          >
          <bib-avatar
              variant="secondary-sub3"
              :text="
                data.value.firstName.slice(0, 1) +
                data.value.lastName.slice(0, 1)
              "
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
            <div :id="'id_' + data.value.id" style="" class="userCard">
              <user-info-card
                :user="data.value"
                @viewProfile="viewProfile(data.value.id)"
                @sendMeet="sendMeet(data.value.userId)"
                @sendMessage="sendMessage(data.value.userId)"
                :active="data.value.active"
              ></user-info-card>
            </div>
          </div>
          <div class="info_wrapper"  style="width: 100%; cursor: pointer;"
            @click="handleItemClick_Table(data.value.id, $event)">
            <div class="title" :title="getEmployeeFullName(data.value)">
              {{ getEmployeeFullName(data.value) | truncate(16, '...')}}
            </div>
            <div class="description">
              {{ data.value.jobTitle }}
            </div>
          </div>
        </div>
      </template>

      <template v-for="(day, dayIndex) in weekDays" #[`cell(${day})`]="data">
        <chips
          class=""
          :key="day"
          :title="getWeekdayValue(data.value?.weekData?.[dayIndex])"
          :className="[getWeekdayClassNames(data.value?.weekData?.[dayIndex]), 'd-align']"
        ></chips>
      </template>

      <template #cell(total)="data">
        <div class="justify-between pl-075">
          <span>{{ formatHoursToHHMM(data.value.total) }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <chips
            v-if="!data.value.timesheets?.length"
            :title="TIMESHEET_STATUS[getEmptyTimesheetStatus()].label"
            iconShow="iconShow"
            :icon="getStatusIcon(getEmptyTimesheetStatus())"
            :variant="[getStatusVariant(getEmptyTimesheetStatus())]"
            :defaultPointer="true"
            class=""
          ></chips>
          <chips
            v-else
            :title="TIMESHEET_STATUS[data.value.timesheets?.[0]?.status]?.label === 'Approve' ? 'Approved' : TIMESHEET_STATUS[data.value.timesheets?.[0]?.status]?.label"
            iconShow="iconShow"
            :icon="getStatusIcon(data.value.timesheets?.[0]?.status)"
            :variant="[getStatusVariant(data.value.timesheets?.[0]?.status)]"
            :defaultPointer="true"
            class=""
          ></chips>
        </div>
      </template>
    </custom-table>
    <time-sheet-modal
      @close="timesheetModal = false"
      :timesheetModal="timesheetModal"
      :items="filteredData"
    ></time-sheet-modal>
  </div>
</template>
  
  <script>
  import {
  sendMeet,
  sendMessage,
  handleItemClick_Table,
} from "../../../../../utils/functions/functions_lib";
import {
  TABLE_HEAD,
  TIMESHEET_STATUS,
  WEEK_DAY,
  TIMESHEET_STATUSES,
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_LABEL_VALUE
} from "../../../../../utils/constant/Constant.js";
import { getEmployeeFullName } from "../../../../../utils/functions/common_functions"

import { formatHoursToHHMM } from "../../../../../utils/functions/time";
import { getStatusIcon, getStatusVariant } from "../../../../../utils/functions/status";
export default {
  props: {
    timesheetsList: {
      type: Array,
      default: [],
    },
    startDate: {
      type: Date | String,
    },
    endDate: {
      type: Date | String,
    }
  },
  data() {
    return {
      modal3Opened: false,
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadTimesheet,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      filteredData: [],
      TIMESHEET_STATUS,
      weekDays: WEEK_DAY.map((day) => day.value.substring(0, 3)),
    };
  },
  methods: {
    formatHoursToHHMM,
    getStatusIcon,
    getStatusVariant,
    sendMeet,
    sendMessage,
    handleItemClick_Table,
    getEmployeeFullName,
    getEmptyTimesheetStatus() {
      const endDate = new Date(this.endDate)
      if (new Date() > endDate) {
        return TIMESHEET_STATUS.past_due.value
      }

      return TIMESHEET_STATUS.not_submitted.value
    },

    getWeekdayValue(data) {
      if (!data) return "--";

      for (const [, activity] of Object.entries(ACTIVITY_TYPE)) {
        if (data[activity]) return ACTIVITY_TYPE_LABEL_VALUE[activity]
      }
    
      if (data.totalHours) {
        return formatHoursToHHMM(data.totalHours);
      }

      return "--";
    },

    getWeekdayClassNames(data) {
      if (!data) {
        return "";
      }

      if (data.vacation) {
        return "chip-wrapper__bgvacation";
      }

      const totalHours = Number(data.totalHours);

      if (totalHours >= 8) {
        return "chip-wrapper__bgsucess";
      } else if (totalHours >= 5 && totalHours < 8) {
        return "chip-wrapper__bgabsent";
      } else if (totalHours <= 3) {
        return "chip-wrapper__bgabsentpink";
      } else {
        return "chip-wrapper__bgdefault";
      }
    },

    close() {
      this.timesheetModal = false;
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
    },
    mouseover() {
      this.showTooltip = true;
    },
    mouseleave() {
      this.showTooltip = false;
    },
    
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },
  },
};
</script>
  
  <style lang="scss">
  .d-align{
    display: flex;
    justify-content: center;
  }
.td_row_wrapper {
  padding: 4px 8px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  height: 65px !important;
  width: 100%;
  margin: -3px -5px 0 0px;

  &__sucess {
    background-color: #d5e8d4;
    span {
      color: #2ba026;
      font-weight: 500;
      font-size: 14px;
    }
  }

  &__absent {
    background-color: rgba(255, 171, 0, 0.16);
    span {
      color: #ffab00;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__vacation {
    background-color: rgba(31, 66, 162, 0.16);
    span {
      color: #1f42a2;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__absentpink {
    background-color: rgba(230, 0, 14, 0.16);
    span {
      color: #e6000e;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__default {
    background-color: #ffffff;
    span {
      color: #000;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
.info_wrapper {
  color: $black;
  font-weight: normal;
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.description {
  font-size: 14px;
  font-weight: normal;
  color: $black;
}
.remove-pad {
  table {
    tr {
      margin: 0px !important;
      padding: 0px !important;
    }
    td {
      margin: 0px !important;
      padding: 0px !important;
    }
  }
}
</style>