<template>
    <div>
      <!-- Dropdown for Selecting Report Type -->
      <div class="nav_wrapper_border">
          <section-header-left title="Employee Directory"></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              v-if="activeTab"
              :tabs="EMPLOYEE_DIRECTORY"
              :value="activeTab"
              @change="onTabChange"
              :key="activeTab"
              :isLightTheme="isLightThemeCheck"
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
  import { EMPLOYEE_DIRECTORY } from "@/utils/constant/Constant.js";
  
  export default {
    data() {
      return {
        EMPLOYEE_DIRECTORY,
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
        const activeTab = EMPLOYEE_DIRECTORY.find( tab => tab.route == route)
        this.$set(this, 'activeTab', activeTab?.value)
      }
    },
    watch:{
      '$route'(){
        this.setActiveTab();
      }
    }
  };
  </script>
  