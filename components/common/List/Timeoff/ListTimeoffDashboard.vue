<template>
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="timeoffData"
      :hide-no-column="true"
      classTypeHead="table__hrow__custom"
        classTypeBody="table__hrow__custom__irow"
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
      <template #cell(allowance)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.allowance }}</span>
        </div>
      </template>
      <template #cell(paid)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.paid }}</span>
        </div>
      </template>
      <template #cell(notpaid)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.notPaid }}</span>
        </div>
      </template>
      <template #cell(requests)="data">
        <div class="justify-between text-dark">
          <span>{{ data.value.requests }}</span>
        </div>
      </template>
    </custom-table>
  </template>
  
  <script>  
  import {
    TABLE_HEAD,
  } from "../../../../utils/constant/Constant";
  export default {
    props: {
      timeoffData: {
        type: Array,
        default: "",
      },
    },
    data() {
      return {
        tableFields: TABLE_HEAD.tHeadTimeoffRequestDashboard,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
      };
    },
    
    methods: {
      profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },

      handleItemClick_Table($event, keyI, item) {
        this.$router.push("/myprofile/" + item.id);
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
  </style>
  