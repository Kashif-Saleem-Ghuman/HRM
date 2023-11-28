<template>
  <div class="remove-pad">
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="userList"
      :hide-no-column="true"
    >
      <template #cell(name)="data">
        <div
          class="d-flex px-05 p-025 align-center text-left gap-05"
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
              style="font-weight: 500"
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
          <div
            class="info_wrapper"
            style="width: 100%; cursor: pointer;"
            @click="handleItemClick_Table(data.value.id, $event)"
          >
            <div class="title" :title="data.value.firstName  + ' ' + data.value.lastName">
              {{ data.value.firstName  + ' ' + data.value.lastName  | truncate(16, '...')}}
            </div>
            <div class="description">
              {{ data.value.jobTitle }}
            </div>
          </div>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark pl-1">
          <chips-list
            :title="data.value.active == true ? 'Online' : 'Offline'"
            iconShow="iconShow"
            icon="add"
            :className="[
              data.value.active
                ? 'chip-list-wrapper__sucess'
                : 'chip-list-wrapper__light',
            ]"
          ></chips-list>
        </div>
      </template>
      <template #cell(in)="data">
        <div>
          <chips
            :title="
              data.value?.activityReport.in == null
                ? '--'
                : data.value.activityReport.in
            "
            :className="[
              data.value?.activityReport.in ? 'chip-wrapper__bgsucess' : '',
              data.value?.activityReport.vacation
                ? 'chip-wrapper__bgvacation'
                : '',
              data.value?.activityReport.absent
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value?.activityReport.in == null
                ? 'chip-wrapper__bggray'
                : '',
              'd-align',
            ]"
          ></chips>
        </div>
      </template>
      <template #cell(out)="data">
        <div>
          <chips
            :title="
              data.value?.activityReport.out == null
                ? '--'
                : data.value?.activityReport.out
            "
            :className="[
              data.value?.activityReport.out ? 'chip-wrapper__bgsucess' : '',
              data.value?.activityReport.out == null
                ? 'chip-wrapper__bggray'
                : '',
              'd-align',
            ]"
          ></chips>
        </div>
      </template>
      <template #cell(breaks)="data">
        <chips
          :title="
            data.value?.activityReport.break == null
              ? '--'
              : data.value?.activityReport.break
          "
          :className="[
            data.value?.activityReport.break >= '00:02'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.activityReport.break == null
              ? 'chip-wrapper__bggray'
              : '',
            'd-align',
          ]"
        ></chips>
      </template>
      <template #cell(total)="data">
        <chips
          :title="
            data.value?.activityReport.total == null
              ? '--'
              : getTotalHours(data.value?.activityReport.total)
          "
          style="height: auto; color: #000; text-align: right"
        ></chips>
      </template>
    </custom-table>
  </div>
</template>

<script>
import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
import { dateCheck } from "../../../../utils/functions/functions_lib";
import { DASHBOARD_DATA } from "../../../../utils/constant/DashboardData";
import { formatHoursToHHMM } from "../../../../utils/functions/time";
import {
  sendMeet,
  sendMessage,
  handleItemClick_Table,
} from "../../../../utils/functions/functions_lib";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      modal3Opened: false,
      showTooltip: false,
      tableFields: TABLE_HEAD.tHeadDashboard,
      activityReportClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      localData: DASHBOARD_DATA,
      filteredData: [],
    };
  },
  methods: {
    dateCheck,
    sendMeet,
    sendMessage,
    handleItemClick_Table,
    close() {
      this.timesheetModal = false;
    },
    getTotalHours(minutes) {
      if (minutes == 0 || !minutes) return 0;
      const hours = minutes / 60;
      return formatHoursToHHMM(hours);
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

    handleAction_Table(data) {
      console.log(data);
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
  text-transform: capitalize;
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
