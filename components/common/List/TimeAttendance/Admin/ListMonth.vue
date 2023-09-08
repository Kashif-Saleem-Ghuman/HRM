<template>
  <div class="remove-pad">
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="activityReports"
      :hide-no-column="true"
    >
      <template #cell(name)="data">
        <div class="info_wrapper text-left pl-1">
            <div class="title">
              {{ data.value.week }}
            </div>
            <div class="description">
              {{ data.value.weekStart }} -> {{ data.value.weekEnd }}
            </div>
          </div>
        
      </template>
      <template #cell(mon)="data">
        <chips
          :title="
            data.value?.weekData?.mon?.totalHours == null
              ? 'N/A'
              : data.value?.weekData?.mon?.totalHours
          "
          :className="[
            data.value?.weekData?.mon?.totalHours >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.mon?.totalHours <= '7' &&
            data.value?.weekData?.mon?.totalHours >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.mon?.totalHours <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
            data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>

      <template #cell(tue)="data">
        <chips
          :title="
            data.value?.weekData?.tue?.totalHours == null
              ? 'N/A'
              : data.value?.weekData?.tue?.totalHours
          "
          :className="[
            data.value?.weekData?.tue?.totalHours >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.tue?.totalHours <= '7' &&
            data.value?.weekData?.tue?.totalHours >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.tue?.totalHours <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
            data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>

      <template #cell(wed)="data">
        <chips
          :title="
            data.value?.weekData?.wed?.totalHours == null
              ? 'N/A'
              : data.value?.weekData?.wed?.totalHours
          "
          :className="[
            data.value?.weekData?.wed?.totalHours >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.wed?.totalHours <= '7' &&
            data.value?.weekData?.wed?.totalHours >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.wed?.totalHours <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
            data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>
      <template #cell(thu)="data">
        <chips
          :title="
            data.value?.weekData?.thu?.totalHours == null
              ? 'N/A'
              : data.value?.weekData?.thu?.totalHours
          "
          :className="[
            data.value?.weekData?.thu?.totalHours >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.thu?.totalHours <= '7' &&
            data.value?.weekData?.thu?.totalHours >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.thu?.totalHours <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
            data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>
      <template #cell(fri)="data">
        <chips
          :title="
            data.value?.weekData?.fri?.totalHours == null
              ? 'N/A'
              : data.value?.weekData?.fri?.totalHours
          "
          :className="[
            data.value?.weekData?.fri?.totalHours >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.fri?.totalHours <= '7' &&
            data.value?.weekData?.fri?.totalHours >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.fri?.totalHours <= '3'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
            data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>
      <template #cell(sat)="data">
        <chips
          :title="
            data.value?.weekData?.sat?.totalHours == null
              ? 'N/A'
              : data.value?.weekData?.sat?.totalHours
          "
          :className="[
            data.value?.weekData?.sat?.totalHours >= '8'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.weekData?.sat?.totalHours <= '7' &&
            data.value?.weekData?.sat?.totalHours >= '5'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.weekData?.sat?.totalHours <= '3'
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
          <span>{{ data.value?.weekData?.sat?.totalHours }}</span>
        </div>
      </template>
      <template #cell(total)="data">
        <div class="justify-between pl-075">
        <span>{{ data.value.totalHour }}</span>
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
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { getTimeAttendanceCustomRange } from "../../../../../utils/functions/functions_lib_api";
export default {
  props: {
    listMonth: {
      type:  [Array, Object],
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
      filteredData: [],
      parsedTimesheets: null
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

  computed: {
    activityReports() {
      return this.parsedTimesheets?.activityReports ?? []
    },

    total() {
      return this.parsedTimesheets?.total ?? 0
    }
  },

  created() {
    this.getAndParseTimesheets()
  },



  methods: {
    async getAndParseTimesheets() {
      //TODO take dates from calendar
      const from = "2023-09-01T00:00:00.000Z"
      const to = "2023-10-01T00:00:00.000Z"

      const timesheets = await getTimeAttendanceCustomRange({ from, to })
      this.parsedTimesheets = (new TimesheetParser(timesheets)).parse('month')
    },
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