<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Time Off"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items.slice(-1)"
        :icon="items.icon"
        @vclick="clickAction"
      ></section-header-left>
      <div class="d-flex justify-between">
        <template v-for="user in userList.slice(0, 4)">
          <section-header-right
            @click="userId(user.id)"
            :avatar="
              user.photo == null
                ? 'http://localhost:3000/_nuxt/_/bib-shared/img/user-default.png'
                : user.photo
            "
          >
          </section-header-right>
        </template>
        <div
          style="z-index: 100"
          class="bg-gray3 shape-circle icon-size d-flex justify-center align-center border-0"
        >
          <span style="font-size: 14px; font-weight: 500">{{ totalUser }}</span>
        </div>
        <button-circle
          icon="user-add"
          :scale="1"
          @click="addUser()"
          variant="success"
          class="ml-05"
          icon_bg="light-green"
        ></button-circle>
      </div>
    </div>
    <div class="tab-wrapper">
      <div class="row mx-0 bottom_border_wrapper">
        <div class="col-12 px-1">
          <bib-tabs
            :tabs="timeOffTab"
            :value="activeTab"
            @change="handleChange_Tabs"
          ></bib-tabs>
        </div>
      </div>
      <div id="directory-wrapper">
        <div class="" id="tab_info_wrapper">
          <div v-if="activeTab == timeOffTab[0].value">
            <div
              class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <button-green
                  icon="add"
                  variant="success"
                  :scale="1"
                  title="Request time-off"
                  @on-click="timeOffModal = true"
                ></button-green>
                <button-green
                  icon="add"
                  variant="success"
                  :scale="1"
                  title="Absence Notification"
                ></button-green>
              </div>
            </div>
            <div class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper">
                <date-picker></date-picker>
                <action-right
                @vclick="clickAction"
                :items="actionMenu"
              ></action-right>
              </div>
            <list-timeoff :timeoffData="timeoffData"></list-timeoff>
          </div>
          <div v-if="activeTab == timeOffTab[1].value">
            <div
              class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <button-green
                  icon="add"
                  variant="success"
                  :scale="1"
                  title="Request time-off"
                  @on-click="timeOffModal = true"
                ></button-green>
                <button-green
                  icon="add"
                  variant="success"
                  :scale="1"
                  title="Absence Notification"
                  @on-click="timeOffModal = true"
                ></button-green>
              </div>
            </div>
            <div class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper">
                <date-picker></date-picker>
                <action-right
                @vclick="clickAction"
                :items="actionMenu"
              ></action-right>
              </div>
            <list-request :timeoffData="timeoffRequestData"></list-request>
          </div>
        </div>
      </div>
    </div>
    <timeoff-modal
      @close="timeOffModal = false"
      :timeOffModal="timeOffModal"
    ></timeoff-modal>
  </div>
</template>
<script>
import {
  TIME_OFF_TAB,
  MORE_MENU,
  SORTING_MENU,
  WEEK_DAY,
} from "../../utils/constant/Constant";
import { TIMEOFF_DATA, TIMEOFF_REQUEST_DATA } from "../../utils/constant/TimesheetData.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "",
      timeOffTab: TIME_OFF_TAB,
      timeoffData: TIMEOFF_DATA,
      timeoffRequestData:TIMEOFF_REQUEST_DATA,
      activeTab: "Dashborad",
      items: MORE_MENU,
      actionMenu: SORTING_MENU.actionMenuTimeAttandance,
      orderBy: "asc",
      totalUser: "",
      userPhoto: localStorage.getItem("userPhoto"),
      // Time & attandance
      weekOptions: WEEK_DAY,
      timeOffModal: false,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setUserList");
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
    }),
  },
  async mounted() {
    this.totalUser = this.userList.length;
  },
  methods: {
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    userId(id) {
      this.$router.push("/myprofile/" + id);
    },
  },
};
</script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  > li {
    display: inline; // Remove list-style and block-level defaults
    > a,
    > span {
      position: relative;
      float: left; // Collapse white-space
      padding: 5px 10px;
      line-height: 30px;
      text-decoration: none;
      color: #000;
      background-color: #d5e8d4;
      border: 1px solid #8dd488;
      margin-left: -1px;
    }
    &:first-child {
      > a,
      > span {
        margin-left: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    &:last-child {
      > a,
      > span {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  > li > a,
  > li > span {
    &:hover {
      z-index: 2;
      color: #31a22c;
      background-color: #f2f5f1;
      // border-color: @pagination-hover-border;
    }
  }

  > .active > a,
  > .active > span {
    &,
    &:hover,
    &:focus {
      z-index: 3;
      color: #fff;
      background-color: #31a22c;
      // border-color: @pagination-active-border;
      cursor: default;
    }
  }
}
</style>
