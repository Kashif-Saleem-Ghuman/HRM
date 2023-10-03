<template>
  <custom-table
    :fields="tableFields"
    class="border-gray4 bg-white"
    :sections="userList"
    :hide-no-column="true"
  >
    <!-- <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox size="md"></bib-checkbox>
      </div>
    </template> -->
    <template #cell(name)="data">
      <div
        class="d-flex align-center text-left gap-05"
        style="position: relative;"
      >
        <div
          style="cursor: pointer"
          v-on:mouseover="profiletab('id_' + data.value.id)"
          v-on:mouseleave="profiletab('id_' + data.value.id, true)"
        >
          <bib-avatar
            variant="secondary-sub3"
            :text="
              data.value.firstName.slice(0, 1) + data.value.lastName.slice(0, 1)
            "
            text-variant="primary"
            size="3rem"
            v-show="data.value.photo === null"
          ></bib-avatar>
          <bib-avatar
            class="mt-auto mb-auto"
            shape="circle"
            :src="data.value.photo"
            v-show="data.value.photo != null"
            size="3rem"
          >
          </bib-avatar>
          <div :id="'id_' + data.value.id" style="" class="userCard">
            <user-info-card
              :user="data.value"
              @viewProfile="viewProfile(data.value.id)"
              @sendMeet="sendMeet(data.value.userId)"
              @sendMessage="sendMessage(data.value.userId)"
              :active="data.value.presence === 'in'"
            ></user-info-card>
          </div>
        </div>
        <div
          class="info_wrapper"
          style="width: 100%;"
          @click="handleItemClick_Table(data.value.id, $event)"
        >
          <div class="title">
            {{ data.value.firstName }} {{ data.value.lastName }}
          </div>
          <div class="description">
            {{ data.value.jobTitle }}
          </div>
        </div>
      </div>
    </template>
    <template #cell(email)="data">
      <div class="text-dark">
        <div class="justify-between text-dark">
          <span>{{ data.value.email }}</span>
        </div>
      </div>
    </template>
    <template #cell(telephone)="data">
      <div class="justify-between text-dark">
        <span>{{
          data.value.phone === null
            ? "---"
            : data.value.phone || data.value.phone != ""
            ? data.value.phone
            : "---"
        }}</span>
      </div>
    </template>
    <template #cell(department)="data">
      <div class="justify-between text-dark">
        <span>{{
          data.value.department == null ? "HRM" : data.value.department
        }}</span>
      </div>
    </template>
    <template #cell(hiredate)="data">
      <div class="justify-between text-dark">
        <span>{{
          data.value.hireDate == null ? "---" : onLoad(data.value.hireDate)
        }}</span>
      </div>
    </template>
    <!-- <template #cell(department)="data">
      <div class="d-flex text-dark">
        {{ getTeamListOptions }}
        <div v-for="(item, index) in data.value.teams" class="mr-05">
          <chips :title="test(item)" class="chip-wrapper__bggray"></chips>
           {{ item }} 
        </div>
      </div>
    </template> -->
  </custom-table>
</template>

<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { TABLE_HEAD } from "../../../utils/constant/Constant.js";
import {
  sendMeet,
  sendMessage,
  handleItemClick_Table,
} from "../../../utils/functions/functions_lib";
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
  methods: {
    sendMeet,
    sendMessage,
    handleItemClick_Table,
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MM-YYYY");
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
@media (min-width: 500px) {
  body {
    font-size: 10px;
  }
}
@media (min-width: 768px) {
  body {
    font-size: 11px;
  }
}

@media (min-width: 1400px) {
  body {
    font-size: 14px;
  }
}
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
