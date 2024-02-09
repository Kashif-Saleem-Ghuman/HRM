<template>
  <div id="people-action-wrapper">
    <loader :loading="loading"></loader>

    <div class="d-flex justify-between align-center bottom_border_wrapper">
      <section-header-left title="People"></section-header-left>
    </div>
    <no-record v-if="showNoData"></no-record>

    <div v-else-if="showTable">
      <list :userList="employees"></list>
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
      const data = await getEmployees();
      const employees = data.employees;

      employees.forEach((employee) => {
        const parser = new TimesheetParser(employee);
        return parser.parse("day");
      });

      this.employees = employees;
      this.loading = false;
    },
    sendMeet() {
      window.open("https://dev-connect.business-in-a-box.com/", "_blank");
    },
    sendMessage() {
      window.open(
        "https://dev-chat.business-in-a-box.com/directs/" + this.form.userId,
        "_blank"
      );
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
    async handleChange_Tabs(tab) {
      this.$store.dispatch("token/setActiveTab", tab.value);

      if (tab.value == "Departments") {
        await this.$store.dispatch("department/setDepartmentList");
        this.departmentOptions = this.getDepartment;
      }
      if (tab.value == "Teams") {
        // await this.$store.dispatch("teams/setTeamListOptions");
        // this.teamOptions = this.getTeamListOptions;
      }
    },
    clickAction(event) {
      if (event.key == "name") {
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.localData.sort((a, b) => b.firstName.localeCompare(a.firstName));
        } else {
          this.orderBy = "desc";
          this.localData.sort((a, b) => a.firstName.localeCompare(b.firstName));
        }
      }
      if (event.key == "presence") {
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.localData.sort((a, b) => b.email.localeCompare(a.email));
        } else {
          this.orderBy = "desc";
          this.localData.sort((a, b) => a.email.localeCompare(b.email));
        }
      }
      if (event.key == "reset") {
        this.$store.dispatch("employee/setUserList");
      }
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
      background-color: #000 !important;
    }
  }
}
</style>
