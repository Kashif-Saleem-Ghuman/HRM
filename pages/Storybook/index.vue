<template>
    <div>
       <div class="p-1">Custom Components</div> 
    <div class="d-flex"> 
        <dropdown-menu-custom
          sectionLabel="View : "
          :items="dropMenu"
          :buttonLabel="ViewTitle"
          :buttonIconShow="false"
          buttonIcon="check-circle-solid"
          @on-click="viewChange($event)"
        ></dropdown-menu-custom>
        <dropdown-menu-chip
          :items="dropMenuChip"
          :buttonLabel="buttonTitle"
          :buttonIconShow="true"
          :buttonIcon="buttonIcon"
          @on-click="leaveStatus($event)"
        ></dropdown-menu-chip>
    </div>
    </div>
  </template>
  <script>
  import { DropdownMenu } from "../../utils/constant/DropdownMenu";
  
  export default {
    data() {
      return {
        ViewTitle: "Today",
        buttonTitle: "Approved",
        buttonIcon: "check-circle-solid",
        dropMenu: DropdownMenu.tableListView,
      dropMenuChip: DropdownMenu.dropButtonChip,
      };
    },
    methods: {
      viewChange(event) {
        if (e == "today") {
          this.todayListView = true;
          this.weekListView = false;
          this.monthListView = false;
          this.ViewTitle = "Today";
        }
        if (e == "week") {
          this.todayListView = false;
          this.weekListView = true;
          this.monthListView = false;
          this.ViewTitle = "Week";
        }
        if (e == "month") {
          this.todayListView = false;
          this.monthListView = true;
          this.weekListView = false;
          this.ViewTitle = "Month";
        }
        if (e == "year") {
          alert("No list Found");
        }
      },
      leaveStatus(e) {
        console.log(e, "vihange");
        if (e.key == "approve") {
          this.buttonTitle = "Approved";
        }
        if (e.key == "pending") {
          this.buttonTitle = "Pending";
          this.buttonIcon = "add";
        }
        if (e.key == "reject") {
          this.buttonTitle = "Reject";
          this.buttonIcon = "output";
        }
        if (e == "year") {
          alert("No list Found");
        }
      }}
  };
  </script>
  