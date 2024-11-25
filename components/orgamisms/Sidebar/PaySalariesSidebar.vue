<template>
  <div>
    <pay-action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      classMain="heightEdit"
      :heading="`Salary information -   ${employeeName}`"
      icon="help-circle-solid"
      v-show="openSidebar"
      @closeSidebar="closeSidebar"
      @flagClicked="handleFlag"
      @bookmarkClicked="handleBookmark"
      @expandClicked="handleExpand"
      @elipsisClicked="handleElipsis"
    >
      <template v-slot:sidebar-body>
        <compensation-summary
      :amount="85000.00"
      label="Annual"
      currency="CAD"
      @edit-click="editSalary"
    />
      </template>
    </pay-action-sidebar>
  </div>
</template>

<script>
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
      employeeName:'',
      isVisible: false,
    };
  },
  created() {
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
      alert("Bookmark")
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
      this.employeeName = item
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
