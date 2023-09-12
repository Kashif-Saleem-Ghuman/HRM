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
        <template #cell(mon)="data">
          <chips
            :title="data.value?.weekData?.[1]?.totalHours ?? '--'"
            :className="[
              data.value?.weekData?.[1]?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.weekData?.[1]?.totalHours <= '7' &&
              data.value?.weekData?.[1]?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.weekData?.[1]?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips>
        </template>
  
        <template #cell(tue)="data">
          <chips
            :title="data.value?.weekData?.[2]?.totalHours ?? '--'"
            :className="[
              data.value?.weekData?.[2]?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.weekData?.[2]?.totalHours <= '7' &&
              data.value?.weekData?.[2]?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.weekData?.[2]?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips>
        </template>
  
        <template #cell(wed)="data">
          <chips
            :title="data.value?.weekData?.[3]?.totalHours ?? '--'"
            :className="[
              data.value?.weekData?.[3]?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.weekData?.[3]?.totalHours <= '7' &&
              data.value?.weekData?.[3]?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.weekData?.[3]?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips>
        </template>
        <template #cell(thu)="data">
          <chips
            :title="data.value?.weekData?.[4]?.totalHours ?? '--'"
            :className="[
              data.value?.weekData?.[4]?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.weekData?.[4]?.totalHours <= '7' &&
              data.value?.weekData?.[4]?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.weekData?.[4]?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips>
        </template>
        <template #cell(fri)="data">
          <chips
            :title="data.value?.weekData?.[5]?.totalHours ?? '--'"
            :className="[
              data.value?.weekData?.[5]?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.weekData?.[5]?.totalHours <= '7' &&
              data.value?.weekData?.[5]?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.weekData?.[5]?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips>
        </template>
        <template #cell(sat)="data">
          <chips
            :title="data.value?.weekData?.[6]?.totalHours ?? '--' "
            :className="[
              data.value?.weekData?.[6]?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.weekData?.[6]?.totalHours <= '7' &&
              data.value?.weekData?.[6]?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.weekData?.[6]?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips>
        </template>
        <template #cell(sun)="data">
          <div
            class="text-dark td_row_wrapper"
            :class="[data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '']"
          >
            <span>{{ data.value?.weekData?.[7]?.totalHours }}</span>
          </div>
        </template>
        <template #cell(total)="data">
          <div class="justify-between pl-075">
          <span>{{ data.value.total }}</span>
        </div>
        
          <!-- <chips
            :title="
              data.value.totalHour == null
                ? 'N/A'
                : data.value?.totalHours
            "
            :className="[
              data.value?.totalHours >= '8'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value?.totalHours <= '7' &&
              data.value?.totalHours >= '5'
                ? 'chip-wrapper__bgabsent'
                : '',
                data.value?.totalHours <= '3'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
              data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
            ]"
          ></chips> -->
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
                  : '' || data.value.status == 'pending'
                  ? 'urgent-solid'
                  : '' || data.value.status == 'Past due'
                  ? 'help'
                  : ''
              "
              :variant="[
                data.value.status == 'Approve'
                  ? 'chip-wrapper__bgsucess'
                  : '',
                data.value.status == 'Pending'
                  ? 'chip-wrapper__bgabsent'
                  : '',
                data.value.status == 'Past due'
                  ? 'chip-wrapper__bgabsentpink'
                  : '',
                data.value.status == 'Vacation'
                  ? 'chip-wrapper__bgvacation'
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
  import { TABLE_HEAD } from "../../../../../utils/constant/Constant.js";
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
      };
    },
    // async created(){
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
        this.filteredData = users;
      },
      handleItemClick_Table(event, keyI, item) {
        event.preventDefault();
        this.$router.push("/profile/" + item.id);
      },
      viewProfile(id) {
        this.$router.push("/profile/" + id);
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