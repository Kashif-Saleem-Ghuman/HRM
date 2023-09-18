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
        class="d-flex px-1 align-center text-left gap-05"
        style="position: relative; width: 220px"
      >
        <div
          style="cursor: pointer"
          v-on:mouseover="profiletab('id_' + data.value.id)"
          v-on:mouseleave="profiletab('id_' + data.value.id, true)"
        >
          <bib-avatar
            class="mt-auto mb-auto"
            shape="circle"
            :src="data.value.photo"
            size="3rem"
          >
          </bib-avatar>
          <div :id="'id_' + data.value.id" style="" class="userCard">
            <user-info-card
              :src="data.value.photo"
              :firstName="data.value.firstName"
              :lastName="data.value.lastName"
              :jobTitle="data.value.jobTitle"
              :email="data.value.email"
              :phone="data.value.phone"
              @viewProfile="viewProfile(data.value.id)"
              @sendInvite="sendInvite"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper">
          <div class="title">
            {{ data.value.firstName }} {{ data.value.lastName }}
          </div>
          <div class="description">
            {{ data.value.jobTitle }}
          </div>
        </div>
      </div>
      </template>

      <template v-for="(day, dayIndex) in weekDays" #[`cell(${day})`]="data">
          <chips
            class="pt-1 pb-0"
            :key="day"
            :title="getWeekdayValue(data.value?.weekData?.[dayIndex])"
            :className="[getWeekdayClassNames(data.value?.weekData?.[dayIndex])]"
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
              :title="TIMESHEET_STATUS[data.value.timesheets?.[0]?.status]?.label"
              iconShow="iconShow"
              :icon="getStatusIcon(data.value.timesheets?.[0]?.status)"
              :variant="[getStatusVariant(data.value.timesheets?.[0]?.status)]"
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
  import { TABLE_HEAD, TIMESHEET_STATUS, WEEK_DAY, TIMESHEET_STATUSES } from "../../../../../utils/constant/Constant.js";
  import { formatHoursToHHMM } from "../../../../../utils/functions/time";
  export default {
    props: {
      timesheetsList: {
        type:  Array,
        default: [],
      },
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

      getStatusIcon(status) {
        const iconStatusMapper = {
          [TIMESHEET_STATUSES.APPROVED]: 'check-all',
          [TIMESHEET_STATUSES.PENDING]: 'warning',
          [TIMESHEET_STATUSES.REJECTED]: 'urgent-solid',
          [TIMESHEET_STATUSES.PAST_DUE]: 'help',
          [TIMESHEET_STATUSES.NOT_SUBMITTED]: 'help',
        }
        return iconStatusMapper[status] || ""
      },

      getStatusVariant(status) {
        const variantStatusMapper = {
          [TIMESHEET_STATUSES.APPROVED]: 'chip-wrapper__bgsucess',
          [TIMESHEET_STATUSES.PENDING]: 'chip-wrapper__bgabsent',
          [TIMESHEET_STATUSES.REJECTED]: 'chip-wrapper__bgabsentpin',
          [TIMESHEET_STATUSES.PAST_DUE]: 'chip-wrapper__bgvacation',
          [TIMESHEET_STATUSES.NOT_SUBMITTED]: 'chip-wrapper__bgvacation',
        }
        return variantStatusMapper[status] || ""
      },

      getWeekdayValue(data) {
        if (!data) return "--"

        if (data.vacation) return "Vacation"

        if (data.totalHours) {
          return formatHoursToHHMM(data.totalHours)
        }

        return "--"
      },

      getWeekdayClassNames(data) {
        if (!data) {
          return '';
        }
        
        if (data.vacation) {
          return 'chip-wrapper__bgvacation';
        }

        const totalHours = Number(data.totalHours);
        
        if (totalHours >= 8) {
          return 'chip-wrapper__bgsucess';
        } else if (totalHours >= 5 && totalHours < 8) {
          return 'chip-wrapper__bgabsent';
        } else if (totalHours <= 3) {
          return 'chip-wrapper__bgabsentpink';
        } else {
          return 'chip-wrapper__bgdefault';
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
      sendInvite() {
        alert("send invite api call");
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