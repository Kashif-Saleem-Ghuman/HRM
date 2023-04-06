<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper"
    >
      <section-header-left
        title="Dashboard"
        :bookmark="bookmark"
        :moreIcon="moreIcon"
        headerRight="headerRight"
      ></section-header-left>
      <div class="d-flex justify-between mr-1">
        <template>
          <button-circle
            icon="user-add"
            :scale="1"
            @click="addUser()"
            variant="success"
            showLight="true"
            class="ml-05"
          ></button-circle>
        </template>
      </div>
    </div>
    <div class="d-flex justify-between py-05 px-075 bottom_border_wrapper">
      <div class="d-flex">
        <button-green
                  icon="add"
                  variant="success"
                  :scale="1"
                  title="Add Department"
                ></button-green>
      </div>
      <action-right
        icon="add"
        variant="success"
        title="Import"
        titleClass="button-title"
        v-on:change-sort="sortBy"
      ></action-right>
    </div>
    <div class="py-2 px-2">
      <div class="d-flex"  style="position: relative;">
        <progress-circle :progressCount="70" :fill="fill" emptyfill="#D5E8D4" variant="__bg-green" @mouseover="mouseover" @mouseleave="mouseleave"></progress-circle>
        <tooltip :show="showTooltip"></tooltip>
      </div>
      <div class="py-2 d-flex">
        <chips title="Punched in" variant="chip-wrapper__bgsucess"></chips>
        <chips title="Absent" variant="chip-wrapper__bgabsent"></chips>
        <chips title="Vacation" variant="chip-wrapper__bgvacation"></chips>
        <chips title="Absent" variant="chip-wrapper__bgabsentpink"></chips>
        <chips title="Pending" variant="chip-wrapper__bgpending"></chips>
      </div>
      <div class="py-2 d-flex">
        <chips title="V" shapeCircle="__shape-circle" variant="chip-wrapper__bgsucess"></chips>
        <chips title="V" shapeCircle="__shape-circle" variant="chip-wrapper__bgvacation"></chips>
        <chips title="V" shapeCircle="__shape-circle" variant="chip-wrapper__bgabsent"></chips>
        <chips title="M" shapeCircle="__shape-circle" variant="chip-wrapper__bgabsentpink"></chips>
        <chips title="N/A" shapeCircle="__shape-circle"></chips>
        <chips title="M"  shapeRound="__shape-round" variant="chip-wrapper__bgsucess"></chips>
        <chips title="N/A"  shapeRound="__shape-round" variant="chip-wrapper__bgwhite"></chips>

      </div>
    </div>
    
    <!-- <modal-wrapper></modal-wrapper> -->
    <!-- <action-button v-on:new-employee-action="sortBy" v-on:import-action="sortBy"></action-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      switchChecked1: true,
      switchChecked2: false,
      showTooltip:false,
      fill:"#2BA026" ,
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
    mouseover() {
      this.showTooltip=true
    },
    mouseleave(){
      this.showTooltip= false
    }
  },
};
</script>
