<template>
    <custom-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="userList"
      :hide-no-column="true"
      @item-clicked="handleItemClick_Table"
    >
      <template #cell_action="data">
        <bib-checkbox size="md"></bib-checkbox>
      </template>
      
      <template #cell(name)="data">
        <div class="d-flex text-dark">
          {{ data.value.label }}
          </div>
      </template>
      <template #cell_action_right="data">
        <bib-icon icon="trash" :scale="1.1"></bib-icon>
      </template>
    </custom-table>
  </template>
  
  <script>
  import {
    TABLE_HEAD,
    TABLE_FIELDS_DIR,
  } from "../../../utils/constant/Constant.js";
  export default {
    props: {
      tableFields:{
        type: Array,
        default: "",
      },
      userList: {
        type: Array,
        default: "",
      },
    },
    data() {
      return {
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
      };
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
  </style>
  