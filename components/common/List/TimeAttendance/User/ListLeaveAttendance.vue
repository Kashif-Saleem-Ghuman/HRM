<template>
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="leaveData"
      :hide-no-column="true"
      @item-clicked="handleItemClick_Table"
     
    >
      <!-- <template #cell_action="data">
        <div class="d-flex justify-center align-center">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
      </template> -->
      <template #cell(leavetype)="data">
        <div>
          <chips
            :title="data.value.leaveType == null ? 'N/A' : data.value.leaveType"
            iconShow="iconShow"
            icon="setting"
            :variantIcon="
              data.value.status == 'approve'
                ? 'success'
                : '' || data.value.status == 'pending'
                ? 'eye-open'
                : '' || data.value.status == 'Past due'
                ? 'help'
                : ''
            "
            :className="[
              data.value?.status == 'Vacation' ? 'chip-wrapper-without-bg__bgsucess' : '',
              data.value?.status === 'pending' ? 'chip-wrapper-without-bg__bgabsentpink' : '',
              data.value?.status === 'A' ? 'chip-wrapper-without-bg__bgvacation' : '',
              data.value?.status == null ? 'chip-wrapper-without-bg__bggray' : '',
            ]"
          ></chips>
        </div>
      </template>
      <template #cell(start)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.start == "" ? '---' : data.value.start }}</span>
        </div>
      </template>
      <template #cell(end)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.end == null ? 'HRM' : data.value.end }}</span>
        </div>
      </template>
      <template #cell(duration)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.duration == null ? 'Null' : data.value.duration }}</span>
          <span>{{ data.value.duration == null ? 'Null' : data.value.duration }}</span>
        </div>
      </template>
      
      <template #cell(paid)="data">
        <div class="text-dark" style="text-align: right;">
          <span>{{ data.value.paid == null ? 'Null' : data.value.paid }}</span>
        </div>
      </template>
      <template #cell(status)="data" style="width: 80px;">
        <chips
            :title="data.value.status == null ? 'N/A' : data.value.status"
            iconShow="iconShow"
            :icon="
              data.value.status == 'approve'
                ? 'check-all'
                : '' || data.value.status == 'pending'
                ? 'eye-open'
                : '' || data.value.status == 'Past due'
                ? 'help'
                : ''
            "
            :className="[
              data.value?.status == 'approve' ? 'chip-wrapper__bgsucess' : '',
              data.value?.status === 'pending' ? 'chip-wrapper__bgabsentpink' : '',
              data.value?.status === 'A' ? 'chip-wrapper__bgvacation' : '',
              data.value?.status == null ? 'chip-wrapper__bggray' : '',
            ]"
            
          ></chips>
      </template>
    </custom-table>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  import {
    TABLE_HEAD,
  } from "../../../../../utils/constant/Constant";
  export default {
    props: {
        leaveData: {
        type: Array,
        default: "",
      },
    },
    data() {
      return {
        tableFields: TABLE_HEAD.tHeadAttandanceUser,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
      };
    },
    created() {
      this.$store.dispatch("teams/setTeamListOptions");
    },
    // created() {
    //   if (this.$router.history.current.fullPath == "/people") {
    //     this.tableFields = TABLE_HEAD.tHeadPeople;
    //     return;
    //   }
  
    //   if (this.$router.history.current.fullPath == "/people/directory") {
    //     this.tableFields = TABLE_FIELDS_DIR;
    //     return;
    //   }
    // },
    computed: {
      ...mapGetters({
        getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      }),
    },
    methods: {
      test(item) {
        var teamNames = "";
        this.getTeamListOptions.forEach((element) => {
          if (element.value == item) {
            teamNames = element.label;
          }
        });
        return teamNames;
      },
      handleItemClick_Table($event, keyI, item) {
        this.$router.push("/myprofile/" + item.id);
      },
      viewProfile(id) {
        this.$router.push("/myprofile/" + id);
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
        // console.log(data);
      },
    },
  };
  </script>
  
  <style lang="scss">
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
  </style>
  