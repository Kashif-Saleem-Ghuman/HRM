<template>
  <div class="my-profile-wrapper">
    <loader :loading="loading"></loader>
      <section-header-left
        :title="
          getEmployeeFullName(form) != 'undefined undefined'
            ? getEmployeeFullName(form)
            : '---'
        "
        :avatar="form.photo"
        :key="topNav"
        :back="true"
        @on-click="backToPage()"
      ></section-header-left>
    <div class="section-wrapper custom-input">
      <div class="tab-wrapper">
        <div class="row mx-0" :class="borderClassBottom">
          <div class="col-12 px-1">
            <bib-tabs
              v-if="activeTab"
              :tabs="personalTabItem"
              :value="activeTab"
              @change="onTabChange"
              :key="updateTabs"
            ></bib-tabs>
          </div>
        </div>
      </div>
      <div class="main-wrapper">
        <NuxtChild />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { USER_PROFILE_TAB } from "../../../../utils/constant/Constant.js";
import { getEmployee } from "@/utils/functions/api_call/employees.js";

import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "../../../../utils/functions/common_functions";

export default {
  data() {
    return {
      personalTabItem: USER_PROFILE_TAB,
      activeTab: null,
      form: {},
      id: "",
      topNav: 0,
      name: {},
      loading: true,
      updateTabs: 0,
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getUserRole: "token/getUserRole",
      previousPath: "previouspath/getPreviousPath",
    }),
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("employee/setActiveUser");
    // await this.$store.dispatch("employee/setUser", this.getUser.id);
    this.id = this.$route.params.id ?? this.getUser.id;
    this.$store.dispatch("token/setActiveTab", "Employee Profile");
    this.fetchData();
    this.setActiveTab();
    this.$root.$on("top-nav-key", (data) => {
      this.form = data
    });
    this.$nuxt.$on("routeChanged", (to, from) => {
      this.$store.dispatch("previouspath/setPreviousPath", from.path);
    });
  },
  methods: {
    getEmployeeFullName,
    getEmployeeInitials,
    backToPage() {
      switch (true) {
        case this.previousPath === "/time-attendance/attendance/":
          this.$router.push(this.previousPath);
          break;
        default:
          this.$router.push("/people/");
          break;
      }
    },

    async fetchData() {
      this.loading = true;
      const id = this.$route.params.id ?? this.getUser?.id;
      if (id) {
        this.id = id;
        const employee = await getEmployee({ id });
        this.form = employee;
        this.loading = false;
      }
    },
    onTabChange(tab) {
      this.$router.push(tab.route);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("close-sidebar-main");
    },
    setActiveTab() {
      const route = this.$route.fullPath;
      const activeTab = USER_PROFILE_TAB.find((tab) =>
        route.includes(tab.route)
      );
      this.activeTab = activeTab?.value ?? USER_PROFILE_TAB[0]?.value;
      this.updateTabs += 1;
    },
  },

  watch: {
    //Added this watcher because when client is already on another profile, searching for another employee will not update the page.
    "$route.params.id": {
      handler: function (val, old) {
        if (val && old && val != old) {
          window.location.reload();
        }
      },
    },
  },
};
</script>
<style lang="scss">
.scroll-wrapper {
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
@media (max-width: 1900px) {
  .scroll-wrapper {
    height: 80vh !important;
  }
}
@media (min-width: 1900px) {
  .scroll-wrapper {
    height: 76vh !important;
  }
}
@media (min-width: 2500px) {
  .scroll-wrapper {
    height: 82vh !important;
  }
}
.scroll-wrapper {
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
.section-wrapper {
  width: 100%;

  .section-left {
    width: 50%;
    height: 100%;
  }

  .section-mid {
    border-left: 1px solid $secondary-sub3;
  }

  .section-right {
    width: 50%;
  }
}
.dropdown {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  select {
    margin-bottom: 12px !important;
    border-radius: 4px;
    padding: 8px;
  }
}
.dropdown span {
  display: inline-block;
  width: 80px;
}

.time-attendance-wrapper {
  .button-items {
    display: flex;
    align-items: center;

    label {
      padding-right: 5px;
      font-size: 14px;
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid $secondary-sub3;
      border-radius: 0.2rem;
      background-color: $secondary-sub3;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: $white;
        color: #6d7278;
      }
    }
  }
  .menu-items {
    background-color: $white;
    width: 97px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: 0px;
    top: 0px;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 5px 0;
      }
    }
  }
}
.button-custom-wrapper {
  .button {
    text-align: center;
    display: flex;
    justify-content: center;
    a {
      display: flex;
      justify-content: center;
    }
    div {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
