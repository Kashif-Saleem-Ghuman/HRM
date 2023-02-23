<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="People"
        moreIcon="more"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items"
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
          <action-left
            v-on:employee="actionBY"
            v-on:import="actionBY"
            peoplePageAction="peoplePageAction"
            @vclick="clickAction"
          ></action-left>
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
                <list :userList="localData"></list>
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
                <h1>Organizational Chart</h1>
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
import { PEOPLE_TAB, MORE_MENU, SORTING_MENU, } from "../../utils/constant/Constant.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      openSidebar: false,
      peopleTabItem: PEOPLE_TAB,
      currentPage: 1,
      activeTab: "Directory",
      page: 1,
      perPage: 10,
      pages: [],
      localData: [],
      items: MORE_MENU,
      actionMenu:SORTING_MENU.actionMenuPeople,
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
      getAccessToken: "token/getAccessToken",
    }),
    displayedUsers() {
      return this.paginate(this.users);
    },
  },
  async mounted() {
    var userRole = localStorage.getItem("userRole");
    if (userRole === "USER") {
      if (this.$router.history.current.fullPath == "/people") {
        this.$router.push("/myprofile");
        return;
      }
    }
    this.totalUser = this.userList.length;
  },
  methods: {
    setPages() {
      var numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (var index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    clickAction(event) {
      if(event.key=='name'){
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.localData.sort((a, b) => b.firstName.localeCompare(a.firstName));
        } else {
          this.orderBy = "desc";
          this.localData.sort((a, b) => a.firstName.localeCompare(b.firstName));
        }
      }
      if(event.key=='presence'){
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.localData.sort((a, b) => b.email.localeCompare(a.email));
        } else {
          this.orderBy = "desc";
          this.localData.sort((a, b) => a.email.localeCompare(b.email));
        }
      }
      if(event.key=='reset'){
        this.$store.dispatch("users/setUserList")
      }
    },
    userId(id) {
      this.$router.push("/myprofile/" + id);
    },
    actionBY() {
      // this.openSidebar = true
      alert("callled");
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
