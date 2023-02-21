<template>
    <div class="remove-pad">
        <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="userList"
      :hide-no-column="true"
    >
      <template #cell(name)="data" >
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
      <template #cell(status)="data">
        <div class="text-dark" >
          <text-chip
            :title="data.value.status" :className="[
              data.value.status == 'IN' ? 'chip_text_wrapper__textsucess' : '',
              data.value.status == 'Late' ? 'chip_text_wrapper__textabsent' : '',
              data.value.status == 'Absent' ? 'chip_text_wrapper__textabsentpink' : '',
              data.value.status == 'Vacation' ? 'chip_text_wrapper__textvacation' : '',
            ]">
        </text-chip>
        </div>
      </template>
  
      <template #cell(in)="data">
        <div class="text-dark" >
            <text-chip
            :title="data.value.start" :className="[
              data.value.status == 'IN' ? 'chip_text_wrapper__textsucess' : '',
              data.value.status == 'Late' ? 'chip_text_wrapper__textabsent' : '',
              data.value.status == 'Absent' ? 'chip_text_wrapper__textabsentpink' : '',
              data.value.status == 'Vacation' ? 'chip_text_wrapper__textvacation' : '',
            ]"></text-chip>
        </div>
      </template>
  
      <template #cell(out)="data">
       <div class="text-dark">
        <text-chip
            :title="data.value.out != null ? data.value.on : '...'" :className="[
              data.value.status == 'IN' ? 'chip_text_wrapper__textsucess' : '',
              data.value.status == 'Late' ? 'chip_text_wrapper__textabsent' : '',
              data.value.status == 'Absent' ? 'chip_text_wrapper__textabsentpink' : '',
              data.value.status == 'Vacation' ? 'chip_text_wrapper__textvacation' : '',
            ]"></text-chip>
        </div>
      </template>
      <template #cell(on)="data">
       <div class="text-dark">
         <text-chip
            :title="data.value.on != null ? data.value.on : '...'" :className="[
              data.value.status == 'IN' ? 'chip_text_wrapper__textsucess' : '',
              data.value.status == 'Late' ? 'chip_text_wrapper__textabsent' : '',
              data.value.status == 'Absent' ? 'chip_text_wrapper__textabsentpink' : '',
              data.value.status == 'Vacation' ? 'chip_text_wrapper__textvacation' : '',
            ]"></text-chip>
        </div>
      </template>
      <template #cell(breaks)="data">
       <div class="text-dark">
         <text-chip
            :title="data.value.breaks != null ? data.value.breaks : '...'" :className="[
              data.value.status == 'IN' ? 'chip_text_wrapper__textsucess' : '',
              data.value.status == 'Late' ? 'chip_text_wrapper__textabsent' : '',
              data.value.status == 'Absent' ? 'chip_text_wrapper__textabsentpink' : '',
              data.value.status == 'Vacation' ? 'chip_text_wrapper__textvacation' : '',
            ]"></text-chip>
        </div>
      </template>
      <template #cell(time-work)="data">
       <div class="text-dark">
         <text-chip
            :title="data.value.timeWork != null ? data.value.timeWork : '...'" :className="[
              data.value.status == 'IN' ? 'chip_text_wrapper__textsucess' : '',
              data.value.status == 'Late' ? 'chip_text_wrapper__textabsent' : '',
              data.value.status == 'Absent' ? 'chip_text_wrapper__textabsentpink' : '',
              data.value.status == 'Vacation' ? 'chip_text_wrapper__textvacation' : '',
            ]"></text-chip>
        </div>
      </template>
    </custom-table>
    </div>
  </template>
  
  <script>
  import {
    TABLE_FIELDS_TIME_ATTENDANCE,
    TABLE_FIELDS_DIR,
  } from "../../../utils/constant/Constant.js";
  export default {
    props: {
      userList: {
        type: Array,
        default: "",
      },
    },
    data() {
      return {
        tableFields: TABLE_FIELDS_TIME_ATTENDANCE,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
      };
    },
    created() {
    //   if (this.$router.history.current.fullPath == "/people") {
    //     this.tableFields = TABLE_FIELDS;
    //     return;
    //   }
      
    //   if (this.$router.history.current.fullPath == "/people/directory") {
    //     this.tableFields = TABLE_FIELDS_DIR;
    //     return;
    //   }
    },
    methods: {
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
        console.log(data);
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
  .remove-pad{
    table{
        tr{
            margin: 0px !important;
            padding: 0px !important;
        }
    td{
        margin: 0px !important;
        padding: 0px !important;
    }
}
  }
  </style>
  