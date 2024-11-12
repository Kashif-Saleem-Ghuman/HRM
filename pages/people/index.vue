<template>
  <div>
    <div v-if="isUser">
      <page-not-found></page-not-found>
    </div>
    <div v-else>
      <div id="people-action-wrapper">
        <loader :loading="loading"></loader>

          <section-header-left :title="'People - ' + totalEmployee "></section-header-left>
        <no-record v-if="showNoData"></no-record>

        <div v-else-if="showTable">
          <list :userList="employees"></list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PEOPLE_TAB } from "../../utils/constant/Constant.js";
import { mapGetters } from "vuex";
import {
  vfileAdded,
  handleInput,
  handleInputObject,
} from "../../utils/functions/functions_lib.js";
import fecha, { format } from "fecha";
import { TimesheetParser } from "@/utils/timesheet-parsers/timesheet-parser";
import { getEmployees } from "../../utils/functions/api_call/employees";

export default {
  data() {
    return {
      localData: [],
      departmentOptions: "",
      newMessageSidebar: false,
      peopleTabItem: PEOPLE_TAB,
      activeTab: "Directory",
      slideClass: "slide-in",
      updateForm: {},
      isFlag: false,
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
      getCurrentDate: "",
      employees: [],
      loading: true,
      totalEmployee: 0,
    };
  },
  async created() {
    this.getCurrentDate = this.date2;
  },

  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      activeTabSidebar: "token/getActiveTab",
    }),
    showTable() {
      return !this.loading && this.employees?.length;
    },
    showNoData() {
      return !this.loading && (!this.employees || !this.employees?.length);
    },
    isAdmin() {
      return this.$store.state.token.isAdmin;
    },
    isUser() {
      return this.$store.state.token.isUser;
    },
  },
  mounted() {
    this.getOrganizationEntries();
  },

  methods: {
    vfileAdded,
    handleInput,
    handleInputObject,
    async getOrganizationEntries() {
      this.loading = true;
      try {
        const data = await getEmployees();
        const employees = data.employees;

      this.totalEmployee = employees.length;
      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

        this.employees = employees;
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }
      this.loading = false;
    },
    handleClickOutside() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.newMessageSidebar = false;
      }, 700);
    },
    actionBY() {},
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.newMessageSidebar = false;
      }, 700);
    },
    close() {
      this.departmentModel = false;
    },
    
    userId(id) {
      if (id) {
        this.$router.push("/profile/" + id);
      } else {
        this.$router.push("/profile/");
      }
    },
  },
};
</script>
<style lang="scss">
// @media (min-width: 1200px) {
//   .title {
//     font-size: 14px !important;
//     font-weight: 600;
//   }
//   .description {
//     font-size: 12px !important;
//     font-weight: normal;
//     color: $black;
//   }
//   .custom-tabs {
//     .tabs {
//       button {
//         font-size: 12px !important;
//       }
//     }
//   }
// }
// .border-wrapper {
//   border: solid 1px $light;
//   border-radius: 5px;
//   padding: 0px 10px 1rem 10px;
//   margin-bottom: 16px;
// }
.custom-tabs {
  .tabs {
    border: none !important;
    button {
      margin-right: 10px;
      border: none !important;
      border-radius: 6px;
      font-size: 14px;
      background-color: #eee !important;
    }
    .active {
      color: #fff !important;
      background-color: $black !important;
    }
  }
}
</style>
