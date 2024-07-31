<template>
    <div>
      <!-- Dropdown for Selecting Report Type -->
       
    <section-header-left title="Settings"></section-header-left>
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              v-if="activeTab"
              :tabs="SETTINGS_TAB"
              :value="activeTab"
              @change="onTabChange"
              :key="activeTab"
            ></bib-tabs>
          </div>
        </div>
      </div>
      <div>
        <NuxtChild />
      </div>
    </div>
  </template>
  
  <script>
  import { SETTINGS_TAB } from "@/utils/constant/Constant.js";
  
  export default {
    data() {
      return {
        SETTINGS_TAB,
        activeTab: null,
      };
    },
    async created() {
      this.setActiveTab()
    },
    methods: {
      onTabChange(tab) {
        this.$router.push(tab.route);
      },
      setActiveTab() {
        const route = this.$route.fullPath
        const activeTab = SETTINGS_TAB.find( tab => tab.route == route)
        this.$set(this, 'activeTab', activeTab.value)
      }
    },
    watch:{
      '$route'(){
        this.setActiveTab();
      }
    }
  };
  </script>
  