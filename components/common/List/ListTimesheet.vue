<template>
  <div class="remove-pad">
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="userList"
      :hide-no-column="true"
      @item-clicked="handleItemClick_Table"
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
          class="text-dark td_row_wrapper" style="position: relative" v-on:mouseover="timeInfotab('timesheetid_' + data.value.id)"
            v-on:mouseleave="timeInfotab('timesheetid_' + data.value.id, true)"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
          <div :id="'timesheetid_' + data.value.id" class="tooltip-wrapper" style="z-index:100000">
            <tooltip :show="showTooltip"></tooltip>
          </div>
        </div>
      </template>

      <template #cell(tue)="data">
        <div
          class="td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
        </div>
      </template>

      <template #cell(wed)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
        </div>
      </template>
      <template #cell(thu)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
        </div>
      </template>
      <template #cell(fri)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
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
          <span>{{ data.value.status }}</span>
        </div>
      </template>
      <template #cell(sun)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
        </div>
      </template>
      <template #cell(total)="data">
        <div
          class="text-dark td_row_wrapper"
          :class="[
            data.value.status == 'IN' ? 'td_row_wrapper__sucess' : '',
            data.value.status == 'Late' ? 'td_row_wrapper__absent' : '',
            data.value.status == 'Absent' ? 'td_row_wrapper__absentpink' : '',
            data.value.status == 'Vacation' ? 'td_row_wrapper__vacation' : '',
          ]"
        >
          <span>{{ data.value.status }}</span>
        </div>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <chips
            :title="data.value.firstName"
            iconShow="iconShow"
            :icon="
              data.value.status == 'IN'
                ? 'check-all'
                : '' || data.value.status == 'Late'
                ? 'warning'
                : '' || data.value.status == 'Absent'
                ? 'urgent-solid'
                : '' || data.value.status == 'Vacation'
                ? 'help'
                : ''
            "
            :variant="[
              data.value.status == 'IN' ? 'chip-wrapper-bg-same__bgsucess' : '',
              data.value.status == 'Late'
                ? 'chip-wrapper-bg-same__bgabsent'
                : '',
              data.value.status == 'Absent'
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
  </div>
</template>

<script>
import { TABLE_HEAD } from "../../../utils/constant/Constant.js";
export default {
  props: {
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      showTooltip:false,
      tableFields: TABLE_HEAD.tHeadTimesheet,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
    };
  },
  methods: {
    handleItemClick_Table($event, keyI, item) {
      this.$router.push("/myprofile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/myprofile/" + id);
    },
    mouseover() {
      this.showTooltip=true
    },
    mouseleave(){
      this.showTooltip= false
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
