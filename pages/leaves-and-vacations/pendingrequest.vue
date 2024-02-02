!
<template>
  <div id="pending-request-wrapper">
    <loader :loading="loading"></loader>

    <div class="" id="pending_request_wrapper">
      <div
        v-show="showBatchApproveButton"
        class="d-flex justify-between align-center nav_wrapper px-1 py-05 bottom_border_wrapper"
      >
        <div class="d-flex align-center">
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
            @input="getIdValue($event)"
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
  getRejectLeaveVacationsAdmin,
} from "../../utils/functions/functions_lib_api";
import { openPopupNotification } from "../../utils/functions/functions_lib.js";
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
    };
  },
  computed: {
    showBatchApproveButton() {
      return !this.loading && this.requestListData?.length && this.requestListData?.some((item) => item.checked);
    },
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
    showTable() {
      return !this.loading && this.requestListData?.length;
    },
    showNoData() {
      return !this.loading && (!this.requestListData || !this.requestListData?.length);
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
    this.getPendingLeaveVacationsAdmin();
  },
  mounted() {
    localStorage.removeItem("clickedUserId");
    this.$nuxt.$emit("add-leave");

    // this.getPendingLeaveVacationsAdmin();
  },
  methods: {
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    getRejectLeaveVacationsAdmin,
    openPopupNotification,
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
        this.getPendingLeaveVacationsAdmin();
        this.showRefusalModal = false;
      });
    },

    async approveItem(event) {
      const requestIds = [event + ""]
      console.log(requestIds, event, "requestIds")
      await this.getApproveLeaveVacationsAdmin({requestIds}).then(() => {
        this.getPendingLeaveVacationsAdmin();
      });
    },
    async getIdValue(event) {
      const { id, key } = event;
      this.checkedAll = false;
      if (this.addIds.includes(id + "")) {
        for (var i = 0; i < this.addIds.length; i++) {
          if (this.addIds[i] === id + "") {
            this.addIds.splice(i, 1);
            console.log(this.addIds, "item");
          }
          if (!this.addIds.length) {
            this.checked = false;
          }
        }
      } else {
        this.checkedAll = false;
        this.addIds.push(id + "");
        console.log(this.addIds, "item");
      }
    },
    selectAllItems() {  
      this.checkedAll = !this.checkedAll;

      this.requestListData.forEach((item, index) => {
        this.$set(this.requestListData[index], 'checked', this.checkedAll);
      });
    },
    handleItemChecked({ id }) {
      const requestIndex = this.requestListData.findIndex((item) => item.id === id);

      if (requestIndex === -1) {
        console.error(`Request with id ${id} not found`);
        return;
      }

      const request = this.requestListData[requestIndex];
      this.$set(request, 'checked', !request.checked)

      this.checkedAll = this.requestListData.every((item) => item.checked)
    },
    async pendingApproveRequest(event) {
      if (event == "approve") {
        const requestIds = this.requestListData.filter((item) => item.checked).map((item) => item.id);
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
