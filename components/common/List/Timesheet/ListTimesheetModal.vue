<template>
  <custom-timesheet-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="userListTimesheet"
    :hide-no-column="true"
    classTypeHead="table__hrow__default"
    classTypeBody="table__hrow__default__irow"
    customTitle="custom-title"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md"></bib-checkbox>
      </div>
    </template>
    <template #cell(activity)="data">
      <div class="justify-between text-dark px-05" style="width:200px">
        <span>{{ data.value.activity }}</span>
      </div>
    </template>
    <template #cell(start)="data">
      <div class="justify-end text-dark">
        <bib-input
          type="text"
          v-model=" data.value.start"
          name="name"
          placeholder="Type your name"
        ></bib-input>
      </div>
    </template>
    <template #cell(end)="data">
      <div class="d-flex justify-end text-dark">
        <!-- {{ getTeamListOptions }} -->
        <bib-input
          type="text"
          v-model=" data.value.end"
          name="name"
          placeholder="Type your name"
        ></bib-input>
      </div>
    </template>
    <template #cell(total)="data">
      <div class="d-flex justify-end text-dark">
        <!-- <span>{{ data.value.totalHour }}</span> -->
        <bib-input
          type="text"
          v-model=" data.value.totalHour"
          name="name"
          placeholder="Type your name"
        ></bib-input>
      </div>
    </template>
    <template #cell_action_right="data">
      <div class="d-flex justify-center align-center">
        <bib-icon icon="trash" :scale="0.9"></bib-icon>
      </div>
    </template>
  </custom-timesheet-table>
</template>

<script>
import { mapGetters } from "vuex";

import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
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
  mounted() {
    console.log(this.getTeamListOptions, "Team List");
  },
  methods: {
    test(item) {
      // console.log(item, this.getTeamListOptions, "data.value.teams")
      var teamNames = "";
      this.getTeamListOptions.forEach((element) => {
        if (element.value == item) {
          console.log(element.label, "element");
          teamNames = element.label;
          // return t
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
