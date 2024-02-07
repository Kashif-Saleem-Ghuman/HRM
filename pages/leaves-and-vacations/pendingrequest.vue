!
<template>
  <div id="pending-request-wrapper">
    <loader :loading="loading"></loader>

    <div class="" id="pending_request_wrapper">
      <div class="d-flex jutify-between">
        <div class="align-center nav_wrapper px-05 py-05 bottom_border_wrapper">
          <dropdown-menu-calendar
            :items="dropMenuYear"
            :label="selectedYear"
            icon="arrowhead-down"
            @on-click="changeYearView($event)"
            className="button-wrapper__bgblack"
          ></dropdown-menu-calendar>
        </div>
        <div class="d-flex align-center" v-show="showBatchApproveButton">
          <bib-button
            :icon="$button.approved.icon"
            :variant="$button.approved.variant"
            :scale="$button.approved.scale"
            :label="$button.approved.label"
            @click="pendingApproveRequest('approve')"
          ></bib-button>
        </div>
      </div>
      <div>
        <no-record v-if="showNoData"></no-record>

        <div v-else-if="showTable">
          <list-pending
            :listPending="requestListData"
            @selectAllItems="selectAllItems()"
            :key="pendingList"
            :checked="checked"
            :checkedAll="checkedAll"
            @reject-item="enableRefusalModal"
            @approve-item="approveItem($event)"
            @item-checked="handleItemChecked"
          ></list-pending>
        </div>
        <bib-notification :popupMessages="popupMessages"></bib-notification>
      </div>
    </div>
    <request-refusal-modal
      v-if="showRefusalModal"
      @cancel="cancelRejectRequest"
      @close="cancelRejectRequest"
      @confirm="rejectEmployeeRequest"
    ></request-refusal-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  getPendingLeaveVacationsAdmin,
  getApproveLeaveVacationsAdmin,
} from "../../utils/functions/functions_lib_api";
import {
  openPopupNotification,
  getCurrentYear,
  generateYearList,
} from "../../utils/functions/functions_lib.js";
import { LEAVEVACATION_TAB } from "../../utils/constant/Constant";
import { rejectRequest } from "@/utils/functions/api_call/requests";

export default {
  data() {
    return {
      showRefusalModal: false,
      refusalReason: null,
      rejectedRequestId: null,
      componentKey: 0,
      leaveVacation: LEAVEVACATION_TAB,
      activeTab: null,
      leaveVacationAdminData: [],
      getRequest: {},
      requestListData: [],
      addIds: [],
      pendingList: 0,
      requestListApproveData: [],
      checked: false,
      checkedAll: false,
      disabled: true,
      popupMessages: [],
      loading: true,
      dropMenuYear: [],
      selectedYear: new Date().getFullYear(),
      fromDate: "",
      toDate: "",
    };
  },
  computed: {
    showBatchApproveButton() {
      return (
        !this.loading &&
        this.requestListData?.length &&
        this.requestListData?.some((item) => item.checked)
      );
    },
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
    showTable() {
      return !this.loading && this.requestListData?.length;
    },
    showNoData() {
      return (
        !this.loading &&
        (!this.requestListData || !this.requestListData?.length)
      );
    },
  },
  async created() {
    this.$root.$on("update-key", () => {
      this.componentKey += 1;
    });
    this.$root.$on("pending-key", () => {
      this.pendingList += 1;
    });
    this.addIds = [];
    this.getCurrentYear();
    this.getPendingLeaveVacationsAdmin({
        from: this.fromDate,
        to: this.toDate,
      });
  },
  mounted() {
    this.dropMenuYear = this.generateYearList();
  },
  methods: {
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    openPopupNotification,
    getCurrentYear,
    generateYearList,
    cancelRejectRequest() {
      this.addIds.pop();
      this.showRefusalModal = false;
    },
    async enableRefusalModal(event) {
      this.showRefusalModal = true;
      this.rejectedRequestId = event;
    },
    async rejectEmployeeRequest(request) {
      await rejectRequest({ id: this.rejectedRequestId, request }).then(() => {
        this.getPendingLeaveVacationsAdmin({
        from: this.fromDate,
        to: this.toDate,
      });
        this.showRefusalModal = false;
        this.pendingList += 1;
      });
      this.openPopupNotification(3);
    },
    async changeYearView(e) {
      this.selectedYear = e.label;
      this.getCurrentYear();
      await this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      await this.getPendingLeaveVacationsAdmin({
        from: this.fromDate,
        to: this.toDate,
      });
    },
    async approveItem(event) {
      const requestIds = [event + ""];
      console.log(requestIds, event, "requestIds");
      await this.getApproveLeaveVacationsAdmin({ requestIds }).then(() => {
        this.getPendingLeaveVacationsAdmin({
        from: this.fromDate,
        to: this.toDate,
      });
      });
    },
    // async getIdValue(event) {
    //   const { id, key } = event;
    //   this.checkedAll = false;
    //   if (this.addIds.includes(id + "")) {
    //     for (var i = 0; i < this.addIds.length; i++) {
    //       if (this.addIds[i] === id + "") {
    //         this.addIds.splice(i, 1);
    //         console.log(this.addIds, "item");
    //       }
    //       if (!this.addIds.length) {
    //         this.checked = false;
    //       }
    //     }
    //   } else {
    //     this.checkedAll = false;
    //     this.addIds.push(id + "");
    //     console.log(this.addIds, "item");
    //   }
    // },
    selectAllItems() {
      this.checkedAll = !this.checkedAll;

      this.requestListData.forEach((item, index) => {
        this.$set(this.requestListData[index], "checked", this.checkedAll);
      });
    },
    handleItemChecked({ id }) {
      const requestIndex = this.requestListData.findIndex(
        (item) => item.id === id
      );

      if (requestIndex === -1) {
        console.error(`Request with id ${id} not found`);
        return;
      }

      const request = this.requestListData[requestIndex];
      this.$set(request, "checked", !request.checked);

      this.checkedAll = this.requestListData.every((item) => item.checked);
    },
    async pendingApproveRequest(event) {
      if (event == "approve") {
        const requestIds = this.requestListData
          .filter((item) => item.checked)
          .map((item) => item.id);
        await this.getApproveLeaveVacationsAdmin({ requestIds });
        await this.getPendingLeaveVacationsAdmin();
        this.checkedAll = false;
      } else if (event == "reject") {
        this.getPendingLeaveVacationsAdmin();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
