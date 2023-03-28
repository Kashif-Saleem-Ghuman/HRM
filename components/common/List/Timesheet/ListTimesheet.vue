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
          class="d-flex align-center text-left gap-05"
          style="position: relative"
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
      <template #cell(mon)="data">
        <div
          class="text-dark td_row_wrapper"
          style="position: relative"
          v-on:mouseover="timeInfotab('timesheetid_' + data.value.id)"
          v-on:mouseleave="timeInfotab('timesheetid_' + data.value.id, true)"
          :class="[
            data.value?.weekData?.mon?.totalHours >= '8'
              ? 'td_row_wrapper__sucess'
              : '',
            data.value?.weekData?.mon?.totalHours <= '7'
              ? 'td_row_wrapper__absent'
              : '',
            data.value.test == '00:00' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value?.weekData?.mon?.totalHours }}</span>
          <div
            :id="'timesheetid_' + data.value.id"
            class="tooltip-wrapper"
            style="z-index: 100000"
          >
            <div v-if="data.value?.weekData?.mon?.timeData">
              <tooltip
                :data="data.value?.weekData?.mon?.timeData"
                @vclick="itemCliked(data.value.id)"
              ></tooltip>
            </div>
          </div>
        </div>
      </template>

      <template #cell(tue)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value?.weekData?.tue?.totalHours >= '8'
              ? 'td_row_wrapper__sucess'
              : '',
            data.value?.weekData?.tue?.totalHours <= '7'
              ? 'td_row_wrapper__absent'
              : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value?.weekData?.tue?.totalHours }}</span>
        </div>
      </template>

      <template #cell(wed)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value?.weekData?.wed?.totalHours >= '8'
              ? 'td_row_wrapper__sucess'
              : '',
            data.value?.weekData?.wed?.totalHours <= '7'
              ? 'td_row_wrapper__absent'
              : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value?.weekData?.wed?.totalHours }}</span>
        </div>
      </template>
      <template #cell(thu)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value?.weekData?.thu?.totalHours >= '8'
              ? 'td_row_wrapper__sucess'
              : '',
            data.value?.weekData?.thu?.totalHours <= '7'
              ? 'td_row_wrapper__absent'
              : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value?.weekData?.thu?.totalHours }}</span>
        </div>
      </template>
      <template #cell(fri)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value?.weekData?.fri?.totalHours >= '8'
              ? 'td_row_wrapper__sucess'
              : '',
            data.value?.weekData?.fri?.totalHours <= '7'
              ? 'td_row_wrapper__absent'
              : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value?.weekData?.fri?.totalHours }}</span>
        </div>
      </template>
      <template #cell(sat)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value?.weekData?.sat?.totalHours }}</span>
        </div>
      </template>
      <template #cell(sun)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '']"
        >
          <span>{{ data.value?.weekData?.sat?.totalHours }}</span>
        </div>
      </template>
      <template #cell(total)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.totalHour >= '40' ? 'td_row_wrapper__sucess' : '',
            data.value.totalHour <= '35' && data.value.totalHour >= '31'
              ? 'td_row_wrapper__absent'
              : '',
            data.value.totalHour <= '30' && data.value.totalHour >= '15'
              ? 'td_row_wrapper__absentpink'
              : '',
            data.value.totalHour <= '0' ? 'test' : '',
          ]"
        >
          <span>{{ data.value.totalHour }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <chips
            :title="data.value.status"
            iconShow="iconShow"
            :icon="
              data.value.status == 'Approve'
                ? 'check-all'
                : '' || data.value.status == 'Approve'
                ? 'warning'
                : '' || data.value.status == 'Pending'
                ? 'urgent-solid'
                : '' || data.value.status == 'Past due'
                ? 'help'
                : ''
            "
            :variant="[
              data.value.status == 'Approve'
                ? 'chip-wrapper-bg-same__bgsucess'
                : '',
              data.value.status == 'Pending'
                ? 'chip-wrapper-bg-same__bgabsent'
                : '',
              data.value.status == 'Past due'
                ? 'chip-wrapper-bg-same__bgabsentpink'
                : '',
              data.value.status == 'Vacation'
                ? 'chip-wrapper-bg-same__bgvacation'
                : '',
            ]"
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
import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
import { mapGetters } from "vuex";
import {
  TIMESHEET_DATA,
} from "../../../../utils/constant/TimesheetData";
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
      tableFields: TABLE_HEAD.tHeadTimesheet,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      localData:TIMESHEET_DATA,
      filteredData: '',
    };
  },
  // async craeted(){
  //   await this.$store.dispatch("employee/setUserList");
  //   this.localData = this.userList;
  // },
  // computed: {
  //   ...mapGetters({
  //     userList: "employee/GET_USERS_LIST"
  //   }),
  // },
  methods: {
    close() {
      alert("sadjlaksjdlasldkjlasjdl");
      this.timesheetModal = false;
    },
    itemCliked(item){
      this.timesheetModal = true
      var users = this.localData.find((items) => items.id === item);
      this.filteredData = users
    },
    handleItemClick_Table(event, keyI, item) {
      event.preventDefault();
      console.log(event, "askdnasdakjsdkjashdjkashd");
      this.$router.push("/myprofile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/myprofile/" + id);
    },
    vclick() {
      alert("callled");
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
    timeInfotab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
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
