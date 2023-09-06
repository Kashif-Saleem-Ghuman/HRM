<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="leaveData"
    :hide-no-column="true"
  >
    <!-- <template #cell_action="data">
        <div class="d-flex justify-center align-center">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
      </template> -->
    <template #cell(leavetype)="data">
      <div class="text-dark upper-case">
        <chips
          :title="data.value.type == null ? 'N/A' : data.value.type"
          iconShow="iconShow"
          :icon="
            data.value.type == 'medical'
              ? 'home'
              : '' || data.value.type == 'leave'
              ? 'eye-open'
              : '' || data.value.type == 'vacation'
              ? 'setting'
              : ''
          "
          :variantIcon="
            data.value.status == 'approved'
              ? 'success'
              : '' || data.value.status == 'pending'
              ? 'eye-open'
              : '' || data.value.status == 'Past due'
              ? 'help'
              : ''
          "
          :className="[
            data.value?.status === 'approved'
              ? 'chip-wrapper-without-bg__bgsucess'
              : '',
            data.value?.status === 'pending'
              ? 'chip-wrapper-without-bg__bgabsentpink'
              : '',
            data.value?.status === 'rejected'
              ? 'chip-wrapper-without-bg__bgrejected'
              : '',
            data.value?.status == null ? 'chip-wrapper-without-bg__bggray' : '',
          ]"
        ></chips>
      </div>
    </template>
    <template #cell(start)="data">
      <div class="justify-left text-dark">
        <span>{{ onLoad(data.value.start) }}</span>
      </div>
    </template>
    <template #cell(end)="data">
      <div class="justify-left text-dark">
        <span>{{ onLoad(data.value.end) }}</span>
      </div>
    </template>
    <template #cell(duration)="data">
      <div class="justify-left text-dark">
        <span>{{
          data.value.duration == null
            ? "No record Found"
            : data.value.duration / 24 + " days"
        }}</span>
        <span>{{
          data.value.duration == 12
            ? "Null value found"
            : "(" + data.value.duration + " hrs)"
        }}</span>
      </div>
    </template>
    <!--       
      <template #cell(paid)="data">
        <div class="justify-left text-dark">
          <span>{{ data.value.paid == null ? 'Null value found' : data.value.paid }}</span>
        </div>
      </template> -->
    <template #cell(status)="data">
      <div
        class="d-flex align-center justify-center space-between"
      >
        <chips
          :title="data.value.status == null ? 'N/A' : data.value.status"
          iconShow="iconShow"
          :icon="
            data.value.status == 'approved'
              ? 'check-square-solid'
              : '' || data.value.status == 'pending'
              ? 'check-square-solid'
              : '' || data.value.status == 'rejected'
              ? 'check-square-solid'
              : ''
          "
          class="upper-case justify-left"
          :className="[
            data.value?.status == 'approved' ? 'chip-wrapper__bgsucess' : '',
            data.value?.status === 'pending'
              ? 'chip-wrapper__bgabsentpink'
              : '',
            data.value?.status === 'rejected' ? 'chip-wrapper__bggray' : '',
            data.value?.status == null ? 'chip-wrapper__bggray' : '',
          ]"
          style="min-width: 130px !important;"
        ></chips>
        <!-- <bib-button
          label="Delete"
          variant="danger--outline"
          icon="trash-solid"
          size="xl"
          class="px-1"
          @click="$emit('delete-item', data.value.id)"
        ></bib-button> -->
      </div>
    </template>
  </custom-table>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";

import { TABLE_HEAD } from "../../../../utils/constant/Constant";
export default {
  props: {
    leaveData: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadAttendanceUser,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      startDate: "",
    };
  },
  created() {
    this.$store.dispatch("teams/setTeamListOptions");
  },
  mounted() {
    // this.onLoad();
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
    onLoad(item) {
      return fecha.format(new Date(item), "YYYY/MM/DD");
    },
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
      this.$router.push("/profile/" + item.id);
    },
    viewProfile(id) {
      this.$router.push("/profile/" + id);
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
.upper-case {
  text-transform: capitalize;
}
</style>
