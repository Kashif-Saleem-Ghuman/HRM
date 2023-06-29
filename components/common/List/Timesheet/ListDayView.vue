<template>
  <div class="cutom-input">
    <custom-table-day-view
      :fields="tableFields"
      class="border-gray4 bg-white"
      :sections="dayWiseDataTimesheet"
      :hide-no-column="true"
      classTypeHead="table__hrow__default"
      classTypeBody="table__hrow__default__irow"
      customTitle="custom-title"
    >
    <template #cell(name)="data">
        <div
          class="d-flex align-center text-left gap-05"
          style="position: relative"
        >
          <div class="info_wrapper p-1">
           {{data.value.timeto}} -> {{data.value.timeFrom}}
          </div>
        </div>
      </template>
    <template #cell(mon)="data">
        <chips
          :title="
            data.value?.mon == null ? 'N/A': data.value.mon"
          :className="[
             data.value?.mon >= '08'
              ? 'chip-wrapper__bgsucess'
              : '',
             data.value?.mon <= '07' &&
             data.value?.mon >= '05'
              ? 'chip-wrapper__bgabsent'
              : '',
               data.value?.mon <= '01' && data.value?.mon >= '03'
              ? 'chip-wrapper__bgabsentpink'
              : '',
          ]"
        ></chips>
      </template>

      <template #cell(tue)="data">
        <chips
          :title="
           data.value?.tue == null ? 'N/A' : data.value.tue"
          :className="[
            data.value?.tue >= '08' && data.value?.tue <= '09'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.tue >= '09' && data.value?.tue >= '10'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.tue >= '11'
              ? 'chip-wrapper__bgabsentpink'
              : '',
          ]"
        ></chips>
      </template>

      <template #cell(wed)="data">
        <chips
          :title="
            data.value?.wed == null
              ? 'N/A'
              : data.value?.wed
          "
          :className="[
            data.value?.wed >= '08' && data.value?.wed <= '09'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.wed >= '09' && data.value?.wed >= '10'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.wed >= '11'
              ? 'chip-wrapper__bgabsentpink'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(thu)="data">
        <chips
          :title="
            data.value?.thu == null
              ? 'N/A'
              : data.value?.thu
          "
           :className="[
            data.value?.thu >= '08' && data.value?.thu <= '10'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.thu >= '09' && data.value?.thu >= '10'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.thu >= '11'
              ? 'chip-wrapper__bgabsentpink'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(fri)="data">
        <chips
          :title="
            data.value?.fri == null
              ? 'N/A'
              : data.value?.fri
          "
           :className="[
            data.value?.fri >= '08' && data.value?.fri <= '09'
              ? 'chip-wrapper__bgsucess'
              : '',
            data.value?.fri >= '09' && data.value?.fri >= '10'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value?.fri >= '11'
              ? 'chip-wrapper__bgabsentpink'
              : '',
          ]"
        ></chips>
      </template>
      <template #cell(sat)="data">
        <chips
          :title="
            data.value?.sat == null
              ? 'N/A'
              : data.value?.sat
          "
        ></chips>
      </template>
      <template #cell(sun)="data">
        <chips
          :title="
            data.value?.sun == null
              ? 'N/A'
              : data.value?.sun
          "
        ></chips>
      </template>
      <template #cell(total)="data">
        <chips
          :title="
            data.value.total == null
              ? 'N/A'
              : data.value.total
          "
          :className="[
            data.value.total >= '40'
              ? 'chip-wrapper__bgsucess'
              : '',
              data.value.total <= '35'
              ? 'chip-wrapper__bgabsent'
              : '',
              data.value.total <= '10'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value.status == 'Vacation' ? 'chip-wrapper__bgvacation' : '',
            data.value.test == '00:00' ? 'chip-wrapper__bgabsentpink' : '',
          ]"
        ></chips>
      </template>
      <template #cell(status)="data">
        <div class="text-dark">
          <chips
            :title="data.value.status"
            iconShow="iconShow"
            :icon="
              data.value.status == 'Approve'
                ? 'check-all'
                : '' || data.value.status == 'pending'
                ? 'eye-open'
                : '' || data.value.status == 'Past due'
                ? 'help'
                : ''
            "
            :variant="[
              data.value.status == 'pending'
                ? 'chip-wrapper__bgsucess'
                : '',
              data.value.status == 'pending'
                ? 'chip-wrapper__bgabsent'
                : '',
              data.value.status == 'Past due'
                ? 'chip-wrapper__bgabsentpink'
                : '',
              data.value.status == 'Vacation'
                ? 'chip-wrapper__bgvacation'
                : '',
            ]"
          ></chips>
        </div>
      </template>
    </custom-table-day-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { TABLE_HEAD } from "../../../../utils/constant/Constant.js";
export default {
  props: {
    dayWiseDataTimesheet: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadTimesheet,
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
