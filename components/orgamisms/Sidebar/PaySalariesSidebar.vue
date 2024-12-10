<template>
  <div>
    <pay-action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      classMain="heightEdit"
      :heading="`Salary information - ${employeeName}`"
      icon="help-circle-solid"
      v-show="openSidebar"
      @closeSidebar="closeSidebar"
      @flagClicked="handleFlag"
      @bookmarkClicked="handleBookmark"
      @expandClicked="handleExpand"
      @elipsisClicked="handleElipsis"
    >
      <template v-slot:sidebar-body>
        <div class="sidebar-content">
          <div class="two-column">
            <editable-input
              :options="optionsDummy"
              :showAvatar="true"
              label="Employee"
              type="text"
              avatarText="BG"
              @update-value="updatedValue"
              :value="employeeName"
              :hideEditIcon="true"
            />
            <editable-input
              :value="'Terrebonne'"
              :showAvatar="true"
              avatarText="BG"
              type="text"
              label="Location"
              @update-value="updatedValue"
            />
          </div>
          <div class="single-column">
            <compensation-summary
              :amount="salaryAmount"
              label="Salary"
              @edit-click="editSalary"
            />
          </div>

          <div class="single-row-two-column">
            <editable-input
              :value="payPlan"
              :options="optionsDummy"
              label="Pay plan"
              type="select"
              @update-value="updatedValue"
            />

            <editable-input
              :value="payMethod"
              label="Pay method"
              type="text"
              @update-value="updatedValue"
              :hideEditIcon="true"
            />
          </div>
        </div>
        <div class="py-1">
          <salary-earning-info></salary-earning-info>
        </div>
        <div class="py-1 mb-2">
          <logs-section></logs-section>
        </div>
      </template>
    </pay-action-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const OPEN_SIDEBAR_EVENT = "open-sidebar-salaries";
const CLOSE_SIDEBAR_EVENT = "close-sidebar-salaries";
export default {
  props: {
    leaveData: {
      type: [Array, String],
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      openSidebar: false,
      slideClass: "slide-in",
      employeeName: "",
      salaryAmount: "",
      currency: "",
      payPlan: "",
      payMethod: "",
      isVisible: false,
      options: null,
      optionsDummy: [
        { value: "Monthly", label: "Monthly" },
        { value: "Annual", label: "Annual" },
        { value: "Weekly", label: "Weekly" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
    }),
  },
  created() {
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.options = [{ label: "", value: "" }, ...reportTo];
    });
    this.registerRootListeners();
  },
  mounted() {
    this.registerRootListeners();
  },
  methods: {
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    },

    editSalary() {
      console.log("Edit salary clicked");
    },
    handleFlag() {
      return true;
    },
    handleBookmark() {
      alert("Bookmark");
      return true;
    },
    handleElipsis() {
      return true;
    },
    handleExpand() {
      this.isVisible = !this.isVisible;
    },
    async payDetail(item) {
      this.slideClass = "slide-in";
      this.openSidebar = true;

      this.employeeName = `${item.employee.firstName} ${item.employee.lastName}`;
      this.salaryAmount = item.employee.rateAnnual;
      this.currency = item.employee.currency;
      this.payPlan = item.employee.payPlan;
      this.payMethod = item.employee.paymentMethod;
    },
    registerCloseSideBarRootListener() {
      this.$root.$on(CLOSE_SIDEBAR_EVENT, () => {
        this.slideClass = "slide-out";
        setTimeout(() => {
          this.openSidebar = false;
          this.isVisible = true;
        }, 700);
      });
    },
    unregisterCloseSideBarRootListener() {
      this.$root.$off(CLOSE_SIDEBAR_EVENT);
    },
    registerOpenSideBarRootListener() {
      this.$root.$on(OPEN_SIDEBAR_EVENT, (item) => {
        event.stopPropagation();
        this.$hideUserMenu();
        this.payDetail(item);
      });
    },
    unregisterOpenSideBarRootListener() {
      this.$root.$off(OPEN_SIDEBAR_EVENT);
    },
    registerRootListeners() {
      this.registerOpenSideBarRootListener();
      this.registerCloseSideBarRootListener();
    },
    unregisterRootListeners() {
      this.unregisterCloseSideBarRootListener();
      this.unregisterOpenSideBarRootListener();
    },
  },
  handleClickOutside() {
    this.$nuxt.$emit("close-sidebar");
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },
};
</script>

<style lang="scss">
.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .two-column {
    display: flex;
    gap: 1rem;

    > * {
      flex: 1;
    }
  }

  .single-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .single-row-two-column {
    width: 50%;

    gap: 1rem;

    > * {
      flex: 1;
    }
  }
}
</style>
