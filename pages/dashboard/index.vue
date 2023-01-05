<template>
  <div id="people-action-wrapper">
    <div class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper">
      <section-header-left title="Dashboard" :bookmark="bookmark" :moreIcon="moreIcon"
        headerRight="headerRight"></section-header-left>
      <div class="d-flex justify-between mr-1">
        <template>
          <button-circle icon="user-add" :scale="1" @click="addUser()" variant="success" showLight="true"
            class="ml-05"></button-circle>
        </template>
      </div>
    </div>
    <div class="d-flex justify-between py-05 px-075 bottom_border_wrapper">
      <div class="d-flex">
        <action-left v-on:dashboard="sortBy" v-on:setting="sortBy" dashButton="dashButton"></action-left>
      </div>
      <action-right icon="add" variant="success" title="Import" titleClass="button-title"
        v-on:change-sort="sortBy"></action-right>
    </div>
    <bib-switch :checked="switchChecked2" @change="switchChecked2 = !switchChecked2"></bib-switch>
    <!-- <action-button v-on:new-employee-action="sortBy" v-on:import-action="sortBy"></action-button> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      
                            switchChecked1: true,
                            switchChecked2: false,
                          
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
  methods: {
    sortBy() {
      alert("called");
    },
  },
};
</script>
