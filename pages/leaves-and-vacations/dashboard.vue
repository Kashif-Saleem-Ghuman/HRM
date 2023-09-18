!
<template>
  <div id="dashboard-wrapper">
    <div class="" id="dashboard_info_wrapper">
      <div class="scroll_wrapper">
        <div>
          <calendar-feature :key="componentKey"></calendar-feature>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  getPendingLeaveVacationsAdmin,
  getApproveLeaveVacationsAdmin,
  getRejectLeaveVacationsAdmin,
} from "../../utils/functions/functions_lib_api";
import { popupNotificationMsgs } from "../../utils/constant/Notifications";
import { openPopupNotification } from "../../utils/functions/functions_lib.js";
import { LEAVEVACATION_TAB } from "../../utils/constant/Constant";

export default {
  data() {
    return {
      componentKey: 0,
      leaveVacation: LEAVEVACATION_TAB,
      activeTab: null,
      fromDate: "",
      toDate: "",
      getRequest: {},
      requestListData: [],
      
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
      noRecord: false,
      disabled: true,
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
  },
  async created() {
    this.$root.$on("update-key", () => {
      this.componentKey += 1;
    });
    this.$root.$on("pending-key", () => {
      this.pendingList += 1;
    });
    this.addIds = [];
  },
  mounted() {
    localStorage.removeItem("clickedUserId");
    this.$nuxt.$emit("add-leave");
    // this.getPendingLeaveVacationsAdmin();
    if (this.requestListData.lenghth <= 0) {
      this.noRecord = true;
    } else {
      this.noRecord = false;
    }
  },
  methods: {
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    getRejectLeaveVacationsAdmin,
    openPopupNotification,

  },
};
</script>

<style lang="scss" scoped></style>
