<template>
    <div id="people-action-wrapper">
      <section-header title="People" avatar="t.jpg" iconOne="bookmark-solid" iconTwo="horizontal-dots"></section-header>
      <action-button ></action-button> 
      <!-- <list></list> -->
      <list></list>

    </div>
  </template>
  <script>
  export default {
    data() {
      return {
      };
    },
    mounted() {
      this.loading = true;
    //   this.openPopupNotification(1);
    },
    methods: {
      // employe(){
      //   alert("employe called")
      // }
    //   openPopupNotification,
    //   handleChange_Tabs(tab) {
    //     this.activeTab = tab.value
    //   }
    },
  };
  </script>
    