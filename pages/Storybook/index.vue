<template>
  <div>
    <div class="p-1">Custom Components</div>
    <div class="d-flex">
      <dropdown-menu-custom
        sectionLabel="View : "
        :items="dropMenu"
        :button-config="dropMenuChipObject2"
        @on-click="viewChange($event)"
      ></dropdown-menu-custom>
      <dropdown-menu-chip
        :items="dropMenuChip"
        :button-config="dropMenuChipObject"
        :buttonIconShow="true"
        @on-click="leaveStatus($event)"
        class="px-05 py-0"
      ></dropdown-menu-chip>
    </div>
  </div>
</template>
<script>
import {
  DropdownMenu,
  buttonVariant,
  viewType,
} from "../../utils/constant/DropdownMenu";

export default {
  data() {
    return {
      ViewTitle: "Today",
      buttonTitle: "Approved",
      buttonIcon: "check-circle-solid",
      dropMenu: viewType,
      dropMenuChip: buttonVariant,
      dropMenuChipObject:buttonVariant.approved,
      dropMenuChipObject2:viewType.today,

    };
  },
  methods: {
    viewChange(e) {
      if (e.key == "today") {
        this.dropMenuChipObject2 = e;
      }
      if (e.key == "week") {
        this.dropMenuChipObject2 = e;
      }
      if (e.key == "month") {
        this.dropMenuChipObject2 = e;
      }
      if (e.key == "year") {
        alert("No list Found");
      }
    },
    leaveStatus(e) {
      if (e.key == "approve") {
        this.dropMenuChipObject = buttonVariant.approved
      }
      if (e.key == "pending") {
        this.dropMenuChipObject = buttonVariant.pending
      }
      if (e.key == "rejected") {
        this.dropMenuChipObject = buttonVariant.rejected
      }
      if (e == "year") {
        alert("No list Found");
      }
    },
  },
};
</script>
