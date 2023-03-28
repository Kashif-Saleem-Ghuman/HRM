<template>
    <custom-timesheet-table
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="userListTimesheet"
      :hide-no-column="true"
      @item-clicked="handleItemClick_Table"
      classTypeHead="table__hrow__default"
      classTypeBody="table__hrow__default__irow"
      customTitle="custom-title"
    >
      <template #cell_action="data">
        <div class="d-flex justify-center align-center"><bib-checkbox size="md"></bib-checkbox></div>
      </template>
      <template #cell(activity)="data">
        <div class="text-dark">
          <chips
            :title="data.value.presence == null ? '---' : data.value.presence "
            :className="[
              data.value.presence >= 70 ? 'chip-wrapper__bgsucess' : '',
              data.value.presence <= 70 ? 'chip-wrapper__bgabsent' : '',
              data.value.presence <= 35 ? 'chip-wrapper__bgabsentpink' : '',
              data.value.presence == null ? 'chip-wrapper__bggray' : '',
            ]"
            
          ></chips>
        </div>
      </template>
      <template #cell(start)="data">
        <div class="justify-between text-dark px-05">
          <span>{{ data.value.department }}</span>
        </div>
      </template>
      <template #cell(end)="data">
        <div class="d-flex text-dark px-05">
          <!-- {{ getTeamListOptions }} -->
          <div v-for="(item, index) in data.value.teams" class="mr-05">
            <chips
            :title="test(item)"
            class="chip-wrapper__bggray"
          ></chips>
            <!-- {{ item }} -->
          </div>
        </div>
      </template>
      <template #cell(role)="data">
        <div class="justify-between text-dark">
          <chips
            :title="data.value.role"
            class="chip-wrapper__bggray"
          ></chips>
        </div>
      </template>
      <template #cell_action_right="data">
        <div class="d-flex justify-center align-center">
        <bib-icon icon="trash" :scale="1.1"></bib-icon>
        </div>
      </template>
    </custom-timesheet-table>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  import {
    TABLE_HEAD,
  } from "../../../../utils/constant/Constant.js";
  export default {
    props: {
        userListTimesheet: {
        type: Array,
        default: "",
      },
    },
    data() {
      return {
        tableFields: TABLE_HEAD.tHeadTimesheetModal,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
        
      };
    },
    created(){
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
    mounted(){
    console.log(this.getTeamListOptions, "Team List")
    
  
   },
    methods: {
      test(item){
        // console.log(item, this.getTeamListOptions, "data.value.teams")
        var teamNames = ""
        this.getTeamListOptions.forEach(element => {
          if(element.value == item){
            console.log(element.label, "element")
            teamNames = element.label
            // return t
          }
        });
        return teamNames
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
  