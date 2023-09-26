<template>
    <div>
       <div class="p-1">Custom Components</div> 
    <div class="d-flex"> 
        <dropdown-menu-custom
          sectionLabel="Without Icon : "
          :items="dropMenu"
          :buttonLabel="ViewTitle"
          :buttonIconShow="false"
          buttonIcon="check-circle-solid"
          @on-click="viewChange($event)"
        ></dropdown-menu-custom>
        <dropdown-menu-custom
          sectionLabel="With Icon : "
          :items="dropMenu"
          :buttonLabel="ViewTitle"
          :buttonIconShow="true"
          buttonIcon="add"
          listIcon="add"
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
      viewChange(e) {
        if (e.key == "today") {
          this.ViewTitle = e.label;
        }
        if (e.key == "week") {
          this.ViewTitle = e.label;
        }
        if (e.key == "month") {
          this.ViewTitle = e.label;
        }
        if (e.key == "year") {
          alert("No list Found");
        }
      },
      leaveStatus(e) {
        if (e.key == "approve") {
          this.buttonTitle = e.label;
          this.buttonIcon = e.icon
        }
        if (e.key == "pending") {
          this.buttonTitle = e.label;
          this.buttonIcon = e.icon
        }
        if (e.key == "reject") {
          this.buttonTitle = e.label;
          this.buttonIcon = e.icon
        }
        if (e == "year") {
          alert("No list Found");
        }
      }}
  };
  </script>
  