<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center bottom_border_wrapper"
    >
      <section-header-left
      title="Leave & Vacations"
      ></section-header-left>
    </div>
    <div class="tab-wrapper">
      <div class="row mx-0 bottom_border_wrapper">
        <div class="col-12 px-1">
          <bib-tabs
            v-if="activeTab"
            :tabs="LEAVEVACATION_TAB"
            :value="activeTab"
            @change="onTabChange"
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
import { mapGetters } from "vuex";
import { LEAVEVACATION_TAB } from "../../../utils/constant/Constant";
export default {
  data() {
    return {
      LEAVEVACATION_TAB,
      activeTab: null,
    };
  },
  async created() {
    this.setActiveTab()
    await this.$store.dispatch("employee/setActiveUser");
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
      getUser: "employee/GET_USER",

    }),
  },
  
  methods: {
  
    onTabChange(tab) {
      this.$router.push(tab.route);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("close-sidebar-main");
    },
    setActiveTab() {
      const route = this.$route.fullPath;
      const activeTab = LEAVEVACATION_TAB.find((tab) => tab.route == route);
      this.activeTab = activeTab.value;
    },
  }
};
</script>

<style lang="scss">
.author-display {
  // border-radius: 0.5rem;
  // background-color: #cdf784;
  color: black;
  // padding: 0.5rem;
  margin-bottom: 10px;
  opacity: 10 !important;
  z-index: 10000;
  label {
    font-weight: bold;
    display: block;
  }
}
.fc-header-toolbar {
  padding: 0 20px !important;
}
.fc-scrollgrid {
  border-left: none !important;
}
.fc-scrollgrid-section-liquid {
  background-color: #f8f8f9;
}
.fc-theme-standard {
  th {
    background-color: #fff !important;
    // padding: 5px 0;
    border-right: 0px;
    border-left: 0px;
    .fc-scrollgrid-sync-inner {
      padding: 0.5rem;
    }
  }
}
.fc-theme-standard td {
  border: 1px solid #eee !important;
}
.fc-day-today {
  background-color: #fff !important;
}
.fc-daygrid-event-harness {
  a {
    border: none !important;
  }
}
.fc-button-primary {
  color: #ffffff;
  background-color: #000 !important;
  border-color: #ffffff !important;
  border-radius: 6px;
  padding-right: 10px;
}
.fc .fc-button-primary:not(:disabled).fc-button-active:focus,
.fc .fc-button-primary:not(:disabled):active:focus {
  box-shadow: none !important;
}
.fc .fc-button-primary:focus {
  box-shadow: none !important;
}
.fc-button-group {
  .fc-button {
    border-radius: 10px !important;
  }
  .fc-button:not(:last-child) {
    border-bottom-right-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }
  .fc-button:not(:first-child) {
    border-bottom-left-radius: 10px !important;
    border-top-left-radius: 10px !important;
    margin-left: 5px !important;
  }
}
.fc-icon-chevrons-left {
  margin-top: -10px;
}
.fc-icon-chevrons-right {
  margin-top: -10px;
}
.fc-icon-chevron-left {
  margin-top: -10px;
}
.fc-icon-chevron-right {
  margin-top: -10px;
}
.fc-icon-chevrons-left::before {
  font-family: "fcicons" !important;
}

.fc-icon-chevrons-right::before {
  font-family: "fcicons" !important;
}
.fc-icon-chevron-left::before {
  font-family: "fcicons" !important;
}

.fc-icon-chevron-right::before {
  font-family: "fcicons" !important;
}
.event_wrapper {
  border-radius: 6px;
  padding: 4px 8px;
  border: none;
  margin-right: 10px;
  display: flex;
  height: 3rem;
  // justify-content: center;
  align-items: center;
  // background-color: #f2f2f5;

  &__shape-circle {
    width: 3rem;
    height: 3rem;
    padding: 6px;
    border-radius: 50%;
  }
  &__shape-round {
    width: 3rem;
    height: 3rem;
    padding: 6px;
    border-radius: 1px;
  }
  &__bgevent {
    background-color: #d5e8d4;
  }
  &__bgonleave {
    background-color: #f7e9ce;
  }

  &__bghoilday {
    background-color: #1f42a2;
    color: #fff;
  }
  &__bgvacation {
    background-color: #f2f2f2;
  }
  &__bgabsent {
    background-color: #f5d0d3;
    color: #e6000e;
  }
  &__bgpending {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    svg {
      fill: #b1b1b4 !important;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bgdefault {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    svg {
      fill: #b1b1b4 !important;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bggray {
    background-color: #f2f2f5;
    border-radius: 0.5rem;
    svg {
      fill: #000 !important;
    }
    span {
      color: #000;
      font-weight: 600;
      font-size: 14px;
    }
    span:first-letter {
      text-transform: uppercase;
    }
  }
  &__bgwhite {
    background-color: #fff;
    border-radius: 0.5rem;
    color: #eee;
    span {
      color: #e2e2e3;
      font-weight: 600;
      font-size: 14px;
    }
    // span:first-letter{
    //   text-transform: uppercase
    // }
  }
}
</style>
