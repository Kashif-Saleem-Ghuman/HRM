<template>
  <div id="people-action-wrapper">
    <div class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper">
      <section-header-left
        title="People"
        bookmark="bookmark-solid"
        moreIcon="horizontal-dots"
        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU"
        headerRight="headerRight"
      ></section-header-left>
      <div class="d-flex justify-between">
        <template v-for="user in userItems">
          <section-header-right :avatar="user.avatarUrl">
          </section-header-right>
        </template>
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
      <action-right
        v-on:change-sort="sortBy"
      ></action-right>
    </div>
    <list :userList="userList"></list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      users: [],
      orderBy: "asc",
      userItems: [
        {
          avatarUrl:
            "1",
        },
        {
          avatarUrl:
            "1",
        },
        {
          avatarUrl:
            "1",
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
  mounted() {
    this.loading = true;
  },
  methods: {
    actionBY() {
      // this.$router.push('/people/employeeprofile')
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
