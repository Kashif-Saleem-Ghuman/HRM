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
    <template #cell(presence)="data">
      <div class="text-dark">
        <chips
          :title="data.value.attendance"
          :className="[
            data.value.attendance >= 70 ? 'chip-wrapper__bgsucess' : '',
            data.value.attendance <= 70 ? 'chip-wrapper__bgabsent' : '',
            data.value.attendance <= 35 ? 'chip-wrapper__bgabsentpink' : '',
            data.value.attendance <= 20 ? 'chip-wrapper__bggray' : '',
          ]"
        ></chips>
      </div>
    </template>
    <template #cell(department)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.department }}</span>
      </div>
    </template>
    <template #cell(team)="data">
      <div class="d-flex text-dark">
        <div v-for="teams in data.value.teams.slice(0, 1)" class="mr-05">
          {{ teams }}
        </div>
        {{
          data.value.teams.length == "0"
            ? ""
            : "+" + "" + data.value.teams.length
        }}
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
    userList: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadPeople,
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
