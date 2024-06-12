!
<template>
  <div id="pending-request-wrapper">
    <loader :loading="loading"></loader>
    <div class="" id="pending_request_wrapper">
      <div class="d-flex jutify-between">
        <div class="align-center nav_wrapper px-05 py-05 bottom_border_wrapper">
          <dropdown-menu-calendar
            :items="dropMenuYear"
            :label="selectedYear.toString()"
            icon="arrowhead-down"
            @on-click="changeYearView($event)"
            className="button-wrapper__bgblack"
          ></dropdown-menu-calendar>
        </div>
        <div class="d-flex align-center" v-show="showBatchApproveButton">
          <bib-button
            :icon="$button.approved_g.icon"
            :variant="$button.approved_g.variant"
            :scale="$button.approved_g.scale"
            :label="$button.approved_g.label"
            @click="enableModal($event, 'approveMultiple')"
            class="mr-05"
          ></bib-button>
          <bib-button
            :icon="$button.rejected.icon"
            :variant="$button.rejected.variant"
            :scale="$button.rejected.scale"
            :label="$button.rejected.label"
            @click="enableModal($event, 'rejectMultiple')"
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
            @reject-item="enableModal($event, 'rejectSingle')"
            @approve-item="enableModal($event, 'approveSingle')"
            @item-checked="handleItemChecked"
            :disabled="disableButtonMultiselect"
          ></list-pending>
        </div>
      </div>
    </div>
    <request-refusal-modal
      v-if="showRefusalModal"
      @cancel="disableModal"
      @close="disableModal"
      @confirm="actionPerformOnRequest"
      title="Reject Leave Request"
    ></request-refusal-modal>
    <request-approve-modal
      v-if="showApproveModal"
      @cancel="disableModal"
      @close="disableModal"
      @confirm="actionPerformOnRequest"
    ></request-approve-modal>
    <confirmation-modal
      :title="confirmationPopupData?.title"
      :confirmationMessage="confirmationPopupData?.message"
      :confirmastionMessageModal="confirmastionMessageModal"
      @on-click ="actionPerformOnRequest"
      @close="disableModal"
      :variant="variantButton"
    ></confirmation-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  getPendingLeaveVacationsAdmin,
  multiApproveLeaveRequests,
  approveLeaveRequest,
  multipleRejectRequest,
  rejectLeaveRequest,
} from "../../utils/functions/functions_lib_api";
import {
  getCurrentYear,
  generateYearList,
} from "../../utils/functions/functions_lib.js";
import { LEAVEVACATION_TAB } from "../../utils/constant/Constant";
import { LEAVE_CONFIRMATION_MESSAGE } from '../../utils/constant/Notifications'
export default {
  data() {
    return {
      showRefusalModal: false,
      refusalReason: null,
      showApproveModal: false,
      confirmastionMessageModal: false,
      id: null,
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
      loading: true,
      dropMenuYear: [],
      selectedYear: new Date().getFullYear(),
      fromDate: "",
      toDate: "",
      actionToPerformOnButton: null,
      confirmationPopupData: null,
      variantButton: null,
      disableButtonMultiselect: false, 
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
    this.$root.$on("update-key", () => this.componentKey++);
    this.$root.$on("pending-key", () => this.pendingList++);
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
    multiApproveLeaveRequests,
    approveLeaveRequest,
    multipleRejectRequest,
    rejectLeaveRequest,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    getCurrentYear,
    generateYearList,

    async changeYearView(e) {
      this.selectedYear = e.label;
      this.getCurrentYear();
      const dateRange = {
        from: this.fromDate,
        to: this.toDate,
      };
      await this.$store.dispatch(
        "leavevacation/setActiveFromToDate",
        dateRange
      );
      await this.getPendingLeaveVacationsAdmin(dateRange);
    },
    checkCount(){
      const checkedCount = this.requestListData.filter((item) => item.checked).length;
      this.disableButtonMultiselect = checkedCount > 1 ? true : false;
    },
    selectAllItems() {
      this.checkedAll = !this.checkedAll;
      this.requestListData.forEach((item, index) => {
        this.$set(this.requestListData[index], "checked", this.checkedAll);
      });
      this.checkCount();
    },
    handleItemChecked({ id }) {
      const requestIndex = this.requestListData.findIndex(
        (item) => item.id === id
      );
      this.id = id;
      if (requestIndex === -1) {
        console.error(`Request with id ${id} not found`);
        return;
      }
      const request = this.requestListData[requestIndex];
      this.$set(request, "checked", !request.checked);

      this.checkedAll = this.requestListData.every((item) => item.checked);
      this.checkCount();
    },
    disableModal() {
      this.addIds.pop();
      this.showApproveModal = false;
      this.showRefusalModal = false;
      this.confirmastionMessageModal = false;
    },
    async enableModal(id, event) {
      const checkedCount = this.requestListData.filter((item) => item.checked).length;
      switch (event) {
        case "approveMultiple":
          this.confirmastionMessageModal = true;
          this.confirmationPopupData = checkedCount > 1
              ? LEAVE_CONFIRMATION_MESSAGE.approved
              : LEAVE_CONFIRMATION_MESSAGE.approvedSingle;
          this.variantButton = "primary-24";
          break;
        case "rejectMultiple":
          this.confirmastionMessageModal = true;
          this.confirmationPopupData = checkedCount > 1
              ? LEAVE_CONFIRMATION_MESSAGE.rejected
              : LEAVE_CONFIRMATION_MESSAGE.rejectedSingle;;
          this.variantButton = "danger";
          break;
        case "approveSingle":
          this.showApproveModal = true;
          break;
        default:
          this.showRefusalModal = true;
          break;
      }
      this.actionToPerformOnButton = event;
      this.id = id;
    },
    
    async actionPerformOnRequest(request) {
      let type = this.actionToPerformOnButton;
      const requestIds = this.requestListData
        .filter((item) => item.checked)
        .map((item) => item.id);

      switch (type) {
        case "approveMultiple":
          await this.handleApproveMultiple(requestIds);
          break;
        case "rejectMultiple":
          await this.handleRejectMultiple(requestIds);
          break;
        case "approveSingle":
          await this.handleApproveSingle(request);
          break;
        case "rejectSingle":
          await this.handleRejectSingle(request);
          break;
        default:
          console.error("Unknown action type");
          break;
      }

      await this.getPendingLeaveVacationsAdmin({
        from: this.fromDate,
        to: this.toDate,
      });
      this.checkedAll = false;
      this.disableModal();
    },

    async handleApproveMultiple(requestIds) {
      const approveMultiPayload = { requestIds };
      await this.multiApproveLeaveRequests(approveMultiPayload);
    },

    async handleRejectMultiple(requestIds) {
      await this.multipleRejectRequest({ requestIds });
    },

    async handleApproveSingle(request) {
      const approvePayload = { id: this.id, request };
      await this.approveLeaveRequest(approvePayload);
    },

    async handleRejectSingle(request) {
      const rejectPayload = { id: this.id, request };
      await this.rejectLeaveRequest(rejectPayload);
    },
  },
  watch:{
    requestListData: {
    deep: true, // Watch for nested changes
    handler() {
      // Call the checkCount function
      this.checkCount();
    }
  }
  }
};
</script>
