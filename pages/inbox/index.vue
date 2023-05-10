<template>
  <div id="dashborad-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Welcome to your HR dashboard, Shweta!"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items.slice(-1)"
        :icon="items.icon"
        @vclick="clickAction"
      ></section-header-left>
     
    </div>
     <div
      class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <button-green
          icon="add"
          variant="success"
          :scale="1"
          title="New Message"
          @on-click="actionBY('schedule-event')"
        ></button-green>
      </div>
    </div>
      <div id="inbox-wrapper">
        <div class="">
          <div
            class="d-flex justify-between align-center px-075 bottom_border_wrapper"
          >
            <div class="d-flex align-center">
              <date-picker></date-picker>
            </div>
            <!-- <action-right @vclick="clickAction" :items="actionMenu"></action-right> -->
            <div class="d-flex align-center">
            <div style="font-size: 14px;" class="mr-05">Search:</div>
            <button
              type="button"
              @click="$emit('on-click')"
              class="cursor-pointer shape-circle icon-size d-flex align-center justify-between border-0"
            >
              All
            </button>
           </div>
          </div>
          <div class="px-1 py-1">
            <info-card
              :items="infoCardData"
              :avtarPhoto="infoCardData"
            ></info-card>
          </div>
          <div class="scroll_wrapper">
            <div style="z-index: 1">
              <list-inbox :userList="inboxData"></list-inbox>
            </div>
          </div>
        </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>
<script>
import {
  TIME_ATTENDANCE_TAB,
  MORE_MENU,
  SORTING_MENU,
} from "../../utils/constant/Constant.js";
import {
  INBOX_DATA,
  INBOX_CARD_DATA,
} from "../../utils/constant/DashboardData";
import { mapGetters } from "vuex";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      infoCardData: INBOX_CARD_DATA,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      inboxData: INBOX_DATA,
      items: MORE_MENU,
      userPhoto: localStorage.getItem("userPhoto"),
    };
  },
  async created() {
    await this.$store.dispatch("employee/setUserList");
    this.localData = this.userList;
    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.id = users.id;
  },
  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
    }),
  },
  async mounted() {
    this.totalUser = this.userList.length;
    console.log(this.userList.length, "uasdasdasdasdasasdasdserList");
  },
  methods: {
    onChange(value) {
      let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
      console.log("selected date:", date);
    },
  },
};
</script>
<style lang="scss"></style>
