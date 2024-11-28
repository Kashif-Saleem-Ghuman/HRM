<template>
    <div id="people-action-wrapper">
      <div class="nav_wrapper_border">
        <section-header-left
          title="Pay"
          :back="true"
        ></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              v-if="activeTab"
              :tabs="PAY_TAB"
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
  import { PAY_TAB } from "../../../utils/constant/pay/PayConstant";
  
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        PAY_TAB,
        activeTab: null,
      };
    },
    async created() {
      this.setActiveTab()
      await this.$store.dispatch("employee/setActiveUser");
    },
  
    computed: {
      ...mapGetters({
        getUser: "employee/GET_USER",
        getAccessToken: "token/getAccessToken",
        activeDate: "date/getActiveDate",
      }),
    },
    methods: {
      onTabChange(tab) {
        this.$router.push(tab.route);
      },
      filterRoute(route) {
        if (route.includes("?show_all=true")) {
          route = route.replace("?show_all=true", "");
        }
        return route;
      },
      setActiveTab() {
        const route = this.filterRoute(this.$route.fullPath);
        const activeTab = PAY_TAB.find( tab => tab.route == route)
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

    