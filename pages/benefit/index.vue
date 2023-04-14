<template>
    <div id="benefits-wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
      >
        <section-header-left
          title="Benefit"
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
              :tabs="payTab"
              :value="activeTab"
              @change="handleChange_Tabs"
            ></bib-tabs>
          </div>
        </div>
        <div id="benefits-inner-wrapper">
          <div class="" id="tab_info_wrapper">
            <div v-if="activeTab == payTab[0].value">
              <div class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper">
                  <date-picker></date-picker>
                  <action-right
                  @vclick="clickAction"
                  :items="actionMenu"
                ></action-right>
                </div>
              <list-benefits :payData="payData"></list-benefits>
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
    PAY_TAB,
    MORE_MENU,
    SORTING_MENU,
    WEEK_DAY,
    PAY_ACTION_MENU
  } from "../../utils/constant/Constant";
  import { PAY_DATA } from "../../utils/constant/PayData";
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        id: "",
        payTab: PAY_TAB,
        payData: PAY_DATA,
        // timeoffRequestData:TIMEOFF_REQUEST_DATA,
        activeTab: "Dashborad",
        items: MORE_MENU,
        actionMenu: PAY_ACTION_MENU,
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
  
  