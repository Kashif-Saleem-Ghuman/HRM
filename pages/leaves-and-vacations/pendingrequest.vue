!
<template>
  <div id="pending-request-wrapper">
    <div class="" id="pending_request_wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
        v-show="requestListData.length ? true : false"
      >
        <div class="d-flex align-center pt-05 pb-05">
          <bib-button
            :icon="$button.approved.icon"
            :variant="$button.approved.variant"
            :scale="$button.approved.scale"
            :label="$button.approved.label"
            class="mr-05"
            @click="pendingApproveRequest('approve')"
          ></bib-button>
        </div>
      </div>
      <div class="scroll_wrapper">
        <div v-if="!leaveList">
          <list-pending
            :listPending="requestListData"
            @input="getIdValue($event)"
            @selectAllItems="selectAllItems()"
            :key="pendingList"
            :checked="checked"
            :checkedAll="checkedAll"
            @reject-item="enableRefusalModal"
            @approve-item="approveItem($event)"
          ></list-pending>
        </div>
        <div v-else-if="leaveList">
          <no-record></no-record>
        </div>
        <bib-notification :popupMessages="popupMessages"></bib-notification>
      </div>
    </div>

    <request-refusal-modal
      v-if="showRefusalModal"
      @cancel="cancelRejectRequest"
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
import { popupNotificationMsgs } from "../../utils/constant/Notifications";
import { openPopupNotification } from "../../utils/functions/functions_lib.js";
import { LEAVEVACATION_TAB } from "../../utils/constant/Constant";
import { rejectRequest } from "@/utils/functions/api_call/requests"

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
      leaveList:false,
      addIds: [],
      pendingList: 0,
      requestListApproveData: [],
      checked: false,
      checkedAll: false,
      noRecord: false,
      disabled: true,
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
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
      this.addIds.pop()
      this.showRefusalModal = false
    },
    async enableRefusalModal(event) {
      this.showRefusalModal = true 
      this.rejectedRequestId = event
    },
    async rejectEmployeeRequest(request) {
      await rejectRequest({id: this.rejectedRequestId, request}).then(() => {
        this.getPendingLeaveVacationsAdmin();
        this.showRefusalModal = false
      });
    },

    async approveItem(event) {
      this.addIds.push(event + "");
      console.log(this.addIds, "item");
      await this.getApproveLeaveVacationsAdmin().then(() => {
        this.getPendingLeaveVacationsAdmin();
      });
    },
    async getIdValue(event) {
      this.checkedAll = false;
      if (this.addIds.includes(event + "")) {
        for (var i = 0; i < this.addIds.length; i++) {
          if (this.addIds[i] === event + "") {
            this.addIds.splice(i, 1);
            console.log(this.addIds, "item");
          }
        }
      } else {
        this.checkedAll = false;
        this.addIds.push(event + "");
        console.log(this.addIds, "item");
      }
      if (this.addIds != "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    selectAllItems() {
      if (this.addIds.length) {
        this.addIds = [];
        this.checked = false;
        console.log(this.addIds, "item");
      } else {
        this.requestListData.map((item, index) => {
          this.addIds.push(item.id + "");
          console.log(this.addIds, "item");
          this.checkedAll = true;
          this.checked = true;
        });
      }
    },
    async pendingApproveRequest(event) {
      if(this.addIds == ''){
        alert("Please Select Leave Request")
        this.disabled = true;
        return
      }
      if (event == "approve") {
        await this.getApproveLeaveVacationsAdmin();
        await this.getPendingLeaveVacationsAdmin();
      } else if (event == "reject") {
        this.getPendingLeaveVacationsAdmin();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
