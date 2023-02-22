<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="Time and Attendance"
        moreIcon="more"
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
      <div class="row mx-0 pt-1">
        <div class="col-12">
          <bib-tabs
            :tabs="peopleTabItem"
            :value="activeTab"
            @change="handleChange_Tabs"
          ></bib-tabs>
        </div>
      </div>
      <div
        class="d-flex justify-between align-center py-05 px-075 bottom_border_wrapper"
      >
        <div class="d-flex align-center">
          <date-picker></date-picker>
          <!-- <action-left
            v-on:employee="actionBY"
            v-on:import="actionBY"
            peoplePageAction="peoplePageAction"
            @vclick="clickAction"
          ></action-left> -->
        </div>
        <action-right
          @vclick="clickAction"
          :items="actionMenu"
        ></action-right>
      </div>
      <div id="directory-wrapper">
        <div class="" id="tab_info_wrapper">
          <div v-if="activeTab == peopleTabItem[0].value">
            <div class="scroll_wrapper">
              <div>
                <list-attendance :userList="users"></list-attendance>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-wrapper custom-input px-1" id="directory-wrapper">
        <div class="" id="tab_info_wrapper">
          <div v-if="activeTab == peopleTabItem[1].value">
            <div class="scroll_wrapper">
              <div>
                <h1>hgello world</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <action-sidebar v-show="openSidebar"></action-sidebar> -->
  </div>
</template>
<script>
import { TIME_ATTENDANCE_TAB, MORE_MENU, SORTING_MENU, TABLE_SECTIONS } from "../../utils/constant/Constant.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      openSidebar: false,
      endDate: null,
                              starDate: new Date("2022-09-17"),
                              minDate: new Date('2022-10-11'),
                              maxDate: new Date('2022-10-21'),
                                    peopleTabItem: TIME_ATTENDANCE_TAB,
      currentPage: 1,
      users:TABLE_SECTIONS,
      activeTab: "Attendance",
      items: MORE_MENU,
      actionMenu:SORTING_MENU.actionMenuTimeAttandance,
      orderBy: "asc",
      totalUser: "",
      userPhoto:localStorage.getItem('userPhoto')

    };
  },
  async created() {
    await this.$store.dispatch("users/setUserList")
    this.localData = this.userList;
  },
  computed: {
    ...mapGetters({
      userList: "users/GET_USERS_LIST",
    }),
  },
  async mounted() {
    // if (userRole === "USER") {
    //   if (this.$router.history.current.fullPath == "/people") {
    //     this.$router.push("/myprofile");
    //     return;
    //   }
    // }
    this.totalUser = this.userList.length;
    console.log(this.userList.length, "uasdasdasdasdasasdasdserList");
  },
  methods: {
    handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    onChange(value) {
                                            let date = value ? format(new Date(value), "YYYY-MM-DD") : null;
                                            console.log("selected date:", date);
                                        },
    clickAction(event) {
      if(event.key=='name'){
       
      }
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
