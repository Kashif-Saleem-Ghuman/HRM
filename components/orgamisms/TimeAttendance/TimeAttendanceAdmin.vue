<template>
  <div id="people-action-wrapper">
    <div class="nav_wrapper_border">
      <section-header-left
        title="Time & Attendance"
      ></section-header-left>
    </div>
    <div class="tab-wrapper">
      <div class="row mx-0 bottom_border_wrapper">
        <div class="col-12 px-1">
          <bib-tabs
            v-if="activeTab"
            :tabs="TIME_ATTENDANCE_TAB"
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
import { TIME_ATTENDANCE_TAB } from "../../../utils/constant/Constant.js";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      TIME_ATTENDANCE_TAB,
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
      const activeTab = TIME_ATTENDANCE_TAB.find( tab => tab.route == route)
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
      color: $black;
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
      color: $white;
      background-color: #31a22c;
      // border-color: @pagination-active-border;
      cursor: default;
    }
  }
}
</style>
  