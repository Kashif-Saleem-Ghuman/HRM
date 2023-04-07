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
          style="position: relative;"
        >
          <div
            style="cursor: pointer"
            v-on:mouseover="profiletab('id_' + data.value.id)"
            v-on:mouseleave="profiletab('id_' + data.value.id, true)"
            class="ml-05"
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
      <template #cell(status)="data">
        <div class="text-dark">
          <chips
            :title="
              data.value.activeStatus == null ? '---' : data.value.activeStatus
            "
            :className="[
              data.value.activeStatus === 'Punched in'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value.activeStatus === 'Absent'
                ? 'chip-wrapper__bgabsent'
                : '',
              data.value.activeStatus === 'Vacation'
                ? 'chip-wrapper__bgvacation'
                : '',
              data.value.activeStatus == 'Pending'
                ? 'chip-wrapper__bgdefault'
                : '',
            ]"
          ></chips>
         
        </div>
      </template>
      <template #cell(mon)="data">
        <div v-on:mouseover="timeInfotab('timesheetid_' + data.value.id)"
          v-on:mouseleave="timeInfotab('timesheetid_' + data.value.id, true)" style="position: relative">
        <chips
          :title="data.value?.weekData?.mon?.hourStatus"
          shapeCircle="__shape-round"
          :className="[
            data.value?.weekData?.mon?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.mon?.hourStatus <= '7' &&
            data.value?.weekData?.mon?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
            data.value?.weekData?.mon?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.mon?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.mon?.hourStatus == null
              ? 'chip-wrapper__bggray'
              : '',
          ]"
        ></chips>
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
        <chips
          :title="data.value?.weekData?.tue?.hourStatus == null ? 'N/A' : data.value?.weekData?.tue?.hourStatus"
          shapeCircle="__shape-round"
          :className="[
            data.value?.weekData?.tue?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.tue?.hourStatus <= '7' &&
            data.value?.weekData?.tue?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.tue?.hourStatus <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.tue?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.tue?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.tue?.hourStatus == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(wed)="data">
        <chips
          :title="data.value?.weekData?.wed?.hourStatus == null ? 'N/A' : data.value?.weekData?.wed?.hourStatus"
          shapeCircle="__shape-round"
          :className="[
            data.value?.weekData?.wed?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.wed?.hourStatus <= '7' &&
            data.value?.weekData?.wed?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.wed?.hourStatus <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.wed?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.wed?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.wed?.hourStatus == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(thu)="data">
        <chips
          :title="data.value?.weekData?.thu?.hourStatus == null ? 'N/A' : data.value?.weekData?.thu?.hourStatus"
          shapeCircle="__shape-round"
          :className="[
            data.value?.weekData?.thu?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.thu?.hourStatus <= '7' &&
            data.value?.weekData?.thu?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.thu?.hourStatus <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.thu?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.thu?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.thu?.hourStatus == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(fri)="data">
        <chips
          :title="data.value?.weekData?.fri?.hourStatus == null ? 'N/A' : data.value?.weekData?.fri?.hourStatus"
          shapeCircle="__shape-round"
          :className="[
            data.value?.weekData?.fri?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.fri?.hourStatus <= '7' &&
            data.value?.weekData?.fri?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.fri?.hourStatus <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.fri?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.fri?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.fri?.hourStatus == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(sat)="data">
        <chips
          :title="data.value?.weekData?.sat?.hourStatus == null ? 'N/A' : data.value?.weekData?.sat?.hourStatus"
          shapeCircle="__shape-circle"
          :className="[
            data.value?.weekData?.sat?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.sat?.hourStatus <= '7' &&
            data.value?.weekData?.sat?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.sat?.hourStatus <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.sat?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.sat?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.sat?.hourStatus == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(sun)="data">
        <chips
          :title="data.value?.weekData?.sun?.hourStatus == null ? 'N/A' : data.value?.weekData?.sun?.hourStatus"
          shapeCircle="__shape-circle"
          :className="[
            data.value?.weekData?.sun?.hourStatus >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.sun?.hourStatus <= '7' &&
            data.value?.weekData?.sun?.hourStatus >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.sun?.hourStatus <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.sun?.hourStatus === 'V'
              ? 'chip-wrapper__bgvacation'
              : '',
            data.value?.weekData?.sun?.hourStatus === 'A'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.weekData?.sun?.hourStatus == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(total)="data">
        <chips
          :title="data.value?.totalWeekHour == null ? 'N/A' : data.value?.totalWeekHour"
          shapeCircle="__shape-circle"
          :className="[
            data.value?.totalWeekHour >= '40'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.totalWeekHour <= '30' &&
            data.value?.totalWeekHour >= '20'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.totalWeekHour <= '20'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.totalWeekHour == null
              ? 'chip-wrapper__bgwhite'
              : '',
          ]"
        ></chips>
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
import { DASHBOARD_DATA } from "../../../../utils/constant/DashboardData";
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
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      timesheetModal: false,
      localData: DASHBOARD_DATA,
      filteredData: "",
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
    itemCliked(item) {
      document.querySelector("#timesheetid_" + item).style = "display:none";
      this.timesheetModal = true;
      var users = this.localData.find((items) => items.id === item);
      console.log(users.id, item, "asdkskahkdhshadakdhaskhk")
      this.filteredData = users;
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
