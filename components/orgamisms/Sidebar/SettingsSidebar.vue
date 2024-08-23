<template>
  <div>
    <action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      classMain="height"
      icon="add"
      heading="Leave Settings"
      v-if="openSidebar"
      show="true"
    >
      <template v-slot:sidebar-body>
        <div>
          <leaves-settings></leaves-settings>
        </div>
      </template>
      <template v-slot:sidebar-footer> </template>
    </action-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { addLeaveVacations } from "@/utils/functions/functions_lib_api";

import {
  SELECT_OPTIONS,
  REQUEST_TYPE_OPTIONS,
  apiKeyUsedValue,
  apiKeyAllowanceValue,
} from "@/utils/constant/Constant";
import {
  addHandleInput,
  selectUserHandle,
  selectLeaveTypeHandle,
} from "@/utils/functions/functions_lib";
const OPEN_SETTINGS_SIDEBAR_EVENT = "open-sidebar-settings";
const CLOSE_SETTINGS_SIDEBAR_EVENT = "close-sidebar-settings";
const ADD_LEAVE_KEY = "add-leave";

export default {
  props: {
    leaveData: {
      type: [Array, String],
      default: "",
    },
  },
  data() {
    return {
      openSidebar: false,
      slideClass: "slide-in",
    };
  },
  created() {
    this.registerRootListeners();
  },

  mounted() {
    this.registerRootListeners();
  },
  methods: {
    closeSidebarFun() {
      this.openSidebar = false;
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(this.closeSidebarFun, 700);
    },
    async leaveSettings() {
      this.slideClass = "slide-in";
      this.openSidebar = true;
      this.addLeaveKey += 1;
    },
    registerCloseSideBarRootListener() {
      this.$root.$on(CLOSE_SETTINGS_SIDEBAR_EVENT, () => {
        this.slideClass = "slide-out";
        setTimeout(this.closeSidebarFun, 700);
      });
    },
    unregisterCloseSideBarRootListener() {
      this.$root.$off(CLOSE_SETTINGS_SIDEBAR_EVENT);
    },
    registerOpenSideBarRootListener() {
      this.$root.$on(OPEN_SETTINGS_SIDEBAR_EVENT, () => {
        this.leaveSettings();
      });
    },
    unregisterOpenSideBarRootListener() {
      this.$root.$off(OPEN_SETTINGS_SIDEBAR_EVENT);
    },
    registerAddLeaveRootListener() {
      this.$root.$on(ADD_LEAVE_KEY, () => {
        this.addLeaveKey += 1;
      });
    },
    unregisterAddLeaveRootListener() {
      this.$root.$off(ADD_LEAVE_KEY);
    },
    registerRootListeners() {
      this.registerOpenSideBarRootListener();
      this.registerCloseSideBarRootListener();
      this.registerAddLeaveRootListener();
    },
    unregisterRootListeners() {
      this.unregisterCloseSideBarRootListener();
      this.unregisterOpenSideBarRootListener();
      this.unregisterAddLeaveRootListener();
    },
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },
};
</script>

<style lang="scss">
.minus-ml {
  margin-left: -8px;
}
.upper-case {
  text-transform: capitalize;
}
</style>
