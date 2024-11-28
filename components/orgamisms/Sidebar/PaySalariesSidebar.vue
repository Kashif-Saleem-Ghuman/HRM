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
        <!-- Sidebar layout with two columns -->
        <div class="sidebar-content">
          <!-- Left Column for Employee Details -->
          <div class="left-column">
            <editable-select
              :options="options"
              :showAvatar="true"
              label="Pay plan"
              avatarText="BG"
              @update-value="updatedValue"
            />
            <compensation-summary
              :amount="85000.0"
              label="Salary"
              currency="CAD"
              @edit-click="editSalary"
            />
            <editable-select
              :options="options"
              label="Pay plan"
              avatarText="BG"
              @update-value="updatedValue"
            />
            <editable-select
              :options="options"
              label="Pay method"
              avatarText="BG"
              @update-value="updatedValue"
            />
          </div>

          <!-- Right Column for Location -->
          <div class="right-column">
            <editable-input
              :value="'Terrebonne'"
              :showAvatar="true"
              avatarText="BG"
              label="Location"
              @update-value="updatedValue"
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
      isVisible: false,
      options: [
        { value: "opt1", label: "Option 1" },
        { value: "opt2", label: "Option 2" },
        { value: "opt3", label: "Option 3" },
      ],
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
      this.employeeName = item;
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
/* Sidebar Content Layout */
.sidebar-content {
  display: flex;
  justify-content: space-between;
  border: 1px solid $dark-sub3;
  padding: 1rem;
  border-radius: 8px;
  /* gap: 10px; */
}

/* Left Column for Employee Details */
.left-column {
  flex: 1;
}

/* Right Column for Location */
.right-column {
  flex: 1;
}

/* Optionally, you can add more specific styling to make the layout look cleaner */
</style>
