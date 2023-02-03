<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="People"
        bookmark="bookmark-solid"
        moreIcon="moreIcon"
        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU"
        headerRight="headerRight"
        :items="items"
        @vclick="clickAction"
      ></section-header-left>
      <div class="d-flex justify-between">
        <template v-for="user in userList.slice(0, 4)">
          <section-header-right
            @click="userId(user.id)"
            :avatar="
              user.avatar == null
                ? 'http://localhost:3000/_nuxt/_/bib-shared/img/user-default.png'
                : user.avatar
            "
          >
          </section-header-right>
        </template>
        <div style="z-index: 100;" class="bg-gray3 shape-circle icon-size d-flex justify-center align-center border-0">
          <span style="font-size: 14px; font-weight: 500;">{{totalUser}}</span>
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
    <div class="d-flex justify-between py-05 px-075 bottom_border_wrapper">
      <div class="d-flex">
        <action-left
          v-on:employee="actionBY"
          v-on:import="actionBY"
          peoplePageAction="peoplePageAction"
        ></action-left>
      </div>
      <action-right v-on:change-sort="sortBy"></action-right>
    </div>
    <list :userList="userList"></list>
    <!-- <action-sidebar v-show="openSidebar"></action-sidebar> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      openSidebar: false,
      currentPage: 1,
      items: [
        {
          label: "submenu Comes here",
          icon: "file",
          key: "dashboard",
          url: "/dashboard",
          selected: false,
        },
        // { label: "Inbox", icon: "recently-added", key: "inbox", url:"/inbox", selected: false},
        // { label: "My Profile", icon: "file", key: "myprofile", url:"/myprofile", selected: false},
      ],
      users: [],
      orderBy: "asc",
      totalUser:'',
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
  computed: {
    ...mapGetters({
      userList: "users/GET_USERS_LIST",
    }),
  },
  async mounted() {
    await this.usersList();
    var userRole = localStorage.getItem("userRole");
    if (userRole === "USER") {
      if (this.$router.history.current.fullPath == "/people") {
        this.$router.push("/myprofile");
        return;
      }
    }
    this.totalUser = this.userList.length
    console.log(this.userList.length, "userList");
  },
  methods: {
    ...mapActions({
      usersList: "users/setUserList",
    }),
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
    },
    clickAction(event) {
      console.log(event.key);
    },
    userId(id) {
      this.$router.push("/people/" + id);
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
