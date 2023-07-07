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
          <chips-list
            :title="data.value.activityReport.status == null ? '---' : data.value.activityReport.status"
            iconShow="iconShow"
            icon="add"
            :className="[
              data.value.activityReport.status == 'Online' ? 'chip-list-wrapper__sucess' : 'chip-list-wrapper__default',
              data.value.activityReport.status == 'Absent' ? 'chip-list-wrapper__light' : '',
            ]"
          ></chips-list>
        </div>
      </template>
      <template #cell(in)="data">
        <div>
          <chips
            :title="data.value?.activityReport.in == null ? 'N/A' : dateCheck(data.value.activityReport.in)"
            :className="[
              data.value?.activityReport.in >= '15:00' ? 'chip-wrapper__bgsucess' : '',
              data.value?.activityReport.in === 'V' ? 'chip-wrapper__bgvacation' : '',
              data.value?.activityReport.in === 'A' ? 'chip-wrapper__bgabsentpink' : '',
              data.value?.activityReport.in == null ? 'chip-wrapper__bggray' : '',
            ]"
          ></chips>
        </div>
      </template>
      <template #cell(out)="data">
        <chips
          :title="data.value?.activityReport.out == null ? 'N/A' : dateCheck(data.value?.activityReport.out)"
          :className="[
            data.value?.activityReport.out >= '15:00' ? 'chip-wrapper__bgsucess' : '',
          ]"
        ></chips>
      </template>
      <template #cell(breaks)="data">
        <chips
          :title="data.value?.activityReport.breaks == null ? 'N/A' : data.value?.activityReport.breaks"
          :className="[
            data.value?.activityReport.breaks >= '00:02' ? 'chip-wrapper__bgsucess' : '',
          ]"
        ></chips>
      </template>
      <template #cell(total)="data">
        <chips
          :title="
            data.value?.activityReport.total == null ? 'N/A' : data.value?.activityReport.total
          "
           style="background-color: #fff; height: auto; color: #000;"
        ></chips>
      </template>
    </custom-table>
  </div>
</template>

<script>
import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
import { mapGetters } from "vuex";
import{dateCheck} from '../../../../utils/functions/functions_lib'
import dayjs from "dayjs";
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
