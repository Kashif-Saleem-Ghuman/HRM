<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="People"
        bookmark="bookmark-solid"
        moreIcon="more"
        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU"
        headerRight="headerRight"
        :items="items"
        :icon="items.icon"
        :seprator="items.seprator"
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
          ></action-left>
        </div>
        <action-right v-on:change-sort="sortBy"></action-right>
      </div>
      <div id="directory-wrapper">
        <div class="" id="tab_info_wrapper">
          <div v-if="activeTab == peopleTabItem[0].value">
            <div class="scroll_wrapper">
              <div>
                <list :userList="displayedUsers"></list>
              </div>
            </div>
            <nav aria-label="Page navigation">
              <ul class="pagination py-2 px-1">
                <li>
                  <a href="#" @click="page = 1" aria-label="First">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    v-if="page != 1"
                    @click="page--"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&lsaquo;</span>
                  </a>
                </li>
                <li
                  v-for="pageNumber in pages.slice(page - 1, page + 8)"
                  :class="{ active: page === pageNumber }"
                >
                  <a href="#" @click="page = pageNumber">{{ pageNumber }}</a>
                </li>
                <li>
                  <a
                    href="#"
                    @click="page++"
                    v-if="page < pages.length"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&rsaquo;</span>
                  </a>
                </li>
                <li>
                  <a href="#" @click="page = pages.length" aria-label="Last">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
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
import { PEOPLE_TAB } from "../../utils/constant/Constant.js";
import { mapGetters, mapActions } from "vuex";

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
      users: [],
      items: [
        {
          label: "Open",
          key: "Open",
        },
        {
          label: "Show Detail",
          key: "showdetail",
        },
        {
          label: "Shared with...",
          key: "dashboard",
          icon: "file",

        },
        {
          label: "Get Link",
          key: "dashboard",
          icon: "file",

        },
        {
          label: "Upload Folder",
          key: "dashboard",
          icon: "file",

        },
        {
          label: "submenu Comes here",
          key: "dashboard",
          icon: "file",

        },
        {
          label: "submenu Comes here",
          key: "dashboard",
          icon: "file",

        },
        // { label: "Inbox", icon: "recently-added", key: "inbox", url:"/inbox", selected: false},
        // { label: "My Profile", icon: "file", key: "myprofile", url:"/myprofile", selected: false},
      ],

      orderBy: "asc",
      totalUser: "",
      userItems: [
        {
          avatarUrl: "1",
        },
        {
          avatarUrl: "1",
        },
        {
          avatarUrl: "1",
        },
      ],
    };
  },
  fetch() {
    this.$store.dispatch("users/setUserList");
  },
  watch: {
    users() {
      this.setPages();
    },
  },
  computed: {
    ...mapGetters({
      userList: "users/GET_USERS_LIST",
    }),
    displayedUsers() {
      return this.paginate(this.users);
    },
  },
  async mounted() {
    await this.usersList({ limit: 10, page: 1 });
    this.users = this.userList;
    console.log(this.users);

    console.log(this.pages, "users");
    var userRole = localStorage.getItem("userRole");
    if (userRole === "USER") {
      if (this.$router.history.current.fullPath == "/people") {
        this.$router.push("/myprofile");
        return;
      }
    }
    this.totalUser = this.userList.length;
    console.log(this.userList.length, "uasdasdasdasdasasdasdserList");
  },
  methods: {
    setPages() {
      var numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (var index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(users) {
      var page = this.page;
      var perPage = this.perPage;
      var from = page * perPage - perPage;
      var to = page * perPage;
      return users.slice(from, to);
    },
    ...mapActions({
      usersList: "users/setUserList",
    }),
    handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },

    clickAction(event) {
      console.log(event.key);
    },
    userId(id) {
      this.$router.push("/myprofile/" + id);
    },
    actionBY() {
      // this.openSidebar = true
      alert("callled");
    },
    sortBy(event) {
      console.log(event, "callled");
      if (event == "sort") {
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.$store.dispatch("users/sortUserList", {
            sName: "name",
            order: this.orderBy,
          });
        } else {
          this.orderBy = "desc";
          this.$store.dispatch("users/sortUserList", {
            sName: "name",
            order: this.orderBy,
          });
        }
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
