<template>
    <div class="remove-pad">
      <custom-table
        :fields="tableFields"
        class="border-gray4 bg-white"
        :sections="listWeek"
        :hide-no-column="true"
        :showTotal=true
      >
        <template #cell(name)="data">
          <div class="info_wrapper text-left pl-1">
              <div class="title">
                {{ data.value.weekDay }}
              </div>
              <div class="description">
                {{ data.value.weekDayTime }}
              </div>
            </div>
        </template>
        <template #cell(in)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.in }}</span>
      </div>
        </template>
  
        <template #cell(break)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.break }}</span>
      </div>
        </template>
  
        <template #cell(out)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.out }}</span>
      </div>
        </template>
        
        <template #cell(total)="data">
          <div class="justify-between pl-075">
        <span>{{ data.value.total }}</span>
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
  import { mapGetters } from "vuex";
  import { TIMESHEET_DATA } from "../../../../../utils/constant/TimesheetData";
  export default {
    props: {
      listWeek: {
        type: [Array, Object],
        default: "",
      },
    },
    data() {
      return {
        modal3Opened: false,
        showTooltip: false,
        tableFields: TABLE_HEAD.tHeadWeekView,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
        timesheetModal: false,
        localData: TIMESHEET_DATA,
        filteredData: [],
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