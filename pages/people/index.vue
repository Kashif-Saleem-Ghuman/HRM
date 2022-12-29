<template>
  <div id="people-action-wrapper">
    <div class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper">
      <section-header-left
        title="People"
        bookmark="bookmark-solid"
        moreIcon="horizontal-dots"
        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU"
        headerRight="headerRight"
      ></section-header-left>
      <div class="d-flex justify-between mr-1">
        <template v-for="user in userItems">
          <section-header-right :avatar="user.avatarUrl">
          </section-header-right>
        </template>
        <button-circle
          icon="user-add"
          :scale="1"
          @click="addUser()"
          variant="success"
          showLight="true"
          class="ml-05"
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
        icon="add"
        variant="success"
        title="Import"
        titleClass="button-title"
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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU",
        },
        {
          avatarUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU",
        },
        {
          avatarUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4_dVtB2PPMJ5B1ZKtZ8eKxteEzC0vUdVeQ&usqp=CAU",
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
    //   this.openPopupNotification(1);
  },
  methods: {
    actionBY() {
      alert("called");
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
