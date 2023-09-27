<template>
    <div class="remove-pad">
      <custom-table
        :fields="tableFields"
        class="border-gray4 bg-white"
        :sections="userList"
        :hide-no-column="true"
      >
      <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md"></bib-checkbox>
      </div>
    </template>
        <template #cell(name)="data">
          <div
            class="d-flex align-center text-left gap-05"
            style="position: relative"
          >
            <div
              style="cursor: pointer"
              v-on:click="profiletab('id_' + data.value.id)"
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
                  :user="data.value"
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
        <template #cell(type)="data">
          <div class="text-dark px-05">
            <span>{{ data.value.type == null ? 'N/A' : data.vaue.type }}</span>
          </div>
        </template>
        <template #cell(subject)="data">
          <div class="text-dark px-05">
            <span>{{ data.value.subject == null ? 'N/A' : data.vaue.subject }}</span>
          </div>
        </template>
        <template #cell(received)="data">
          <div class="text-dark px-05" style="text-align: right;">
            <span>{{ data.value.received == null ? 'N/A' : data.vaue.received }}</span>
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
        tableFields: TABLE_HEAD.tHeadInbox,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
        timesheetModal: false,
        localData: DASHBOARD_DATA,
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
    mounted(){
        let el = document.querySelector("#Received_action");
        el.style = "display: flex; justify-content: flex-end;"
    },
    methods: {
      close() {
        this.timesheetModal = false;
      },
      itemCliked(item) {
        document.querySelector("#timesheetid_" + item).style = "display:none";
        this.timesheetModal = true;
        var users = this.localData.find((items) => items.id === item);
        console.log(users.id, item, "asdkskahkdhshadakdhaskhk");
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
  