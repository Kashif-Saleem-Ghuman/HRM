<template>
  <div>
    <div
      class="d-flex justify-between align-center px-1 py-025 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker">
          <date-selector :dates.sync="dates" />
        </div>
        <div class="ml-05 d-flex align-center" v-show="showMultiRecordActionButton">
          <bib-button
              :icon="$button.approved_g.icon"
              :variant="$button.approved_g.variant"
              :scale="$button.approved_g.scale"
              :label="$button.approved_g.label"
              @click="enableModal($event, 'approveMultiple')"
          ></bib-button>
        </div>
        <div class="ml-05 d-flex align-center" v-show="showMultiRecordActionButton">
          <bib-button
              :icon="$button.rejected.icon"
              :variant="$button.rejected.variant"
              :scale="$button.rejected.scale"
              :label="$button.rejected.label"
              @click="enableModal($event, 'rejectMultiple')"
          ></bib-button>
        </div>
      </div>


      <div class="d-flex align-center">
        <search-input :on-change-fn="onSearchChange" :debounce-ms="300"></search-input>
      </div>
    </div>
    <div class="scroll_wrapper">
      <div>
        <timesheets-approval-table

          v-if="dates.from && dates.to"
            type="past_due"
            :dates.sync="dates"
            :requestData.sync="requestData"
            :searchString="searchString"
            :isStatusUpdated.sync="isStatusUpdated"
            @reject-item="enableModal($event, 'rejectSingle')"
            @approve-item="enableModal($event, 'approveSingle')"
        ></timesheets-approval-table>
      </div>
    </div>
    <request-refusal-modal
      v-if="showRefusalModal"
      @cancel="disableModal"
      @close="disableModal"
      @confirm="actionPerformOnRequest"
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
import {approveTimesheets, rejectTimesheets, rejectTimesheet, approveTimesheet} from "@/utils/functions/api_call/timeattendance/time";
import {TIMESHEET_NOTIFICATIN_MESSAGE} from "@/utils/constant/Notifications";

const TIMESHEET_CONFIRMATION_MESSAGE = {
  approved: {
    title: "Approve Timesheet Request",
    message: "Are you sure you want to approve the selected timesheet?",
  },
  rejected: {
    title: "Reject Request",
    message: "Are you sure you want to reject the selected timesheet?",
  },
};
export default {
  data() {
    return {
      dates: { from: null, to: null },
      searchString: null,
      requestData: [],
      isStatusUpdated: false,
      showRefusalModal: false,
      refusalReason: null,
      showApproveModal: false,
      confirmastionMessageModal: false,
      actionToPerformOnButton: null,
      confirmationPopupData: null,
      variantButton: "",
      id: null,
    };
  },
  computed: {
    showMultiRecordActionButton() {
      return (
          this.requestData?.length &&
          this.requestData?.some((employee) => employee?.timesheets?.some((timesheet) => timesheet.checked))
      );
    },
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification })
    },
    approveTimesheets,
    rejectTimesheets,
    onSearchChange(value) {
      this.searchString = value
    },
    async pendingMultiRequestHandler(event) {
      const timesheetIds = this.requestData
          .flatMap((item) => item.timesheets)
          .filter((timesheet) => timesheet.checked)
          .map((timesheet) => timesheet.id);
      if(timesheetIds?.length <= 0){
        return;
      }
      if (event == "approve") {
        await this.approveTimesheets({ timesheetIds });
      } else if (event == "reject") {
        await this.rejectTimesheets({timesheetIds});
      }
      this.isStatusUpdated = true;
    },

    disableModal() {
      this.showApproveModal = false;
      this.showRefusalModal = false;
      this.confirmastionMessageModal = false;
    },
    async enableModal(id, event) {
      switch (event) {
        case "approveMultiple":
          this.confirmastionMessageModal = true;
          this.confirmationPopupData = TIMESHEET_CONFIRMATION_MESSAGE.approved;
          this.variantButton = "primary-24";
          break;
        case "rejectMultiple":
          this.confirmastionMessageModal = true;
          this.confirmationPopupData = TIMESHEET_CONFIRMATION_MESSAGE.rejected;
          this.variantButton = "danger";
          break;
        case "approveSingle":
          this.confirmastionMessageModal = true;
          this.confirmationPopupData = TIMESHEET_CONFIRMATION_MESSAGE.approved;
          this.variantButton = "primary-24";
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
      const timesheetIds = this.requestData
        .flatMap((item) => item.timesheets)
        .filter((timesheet) => timesheet.checked)
        .map((timesheet) => timesheet.id);

      switch (type) {
        case "approveMultiple":
          await this.handleApproveMultiple(timesheetIds);
          break;
        case "rejectMultiple":
          await this.handleRejectMultiple(timesheetIds);
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
      this.isStatusUpdated = true;
      this.checkedAll = false;
      this.disableModal();
    },
    async handleApproveMultiple(requestIds) {
      await this.approveTimesheets({ requestIds });
    },

    async handleRejectMultiple(requestIds) {
      await this.rejectTimesheets({requestIds});
    },

    async handleApproveSingle(request) {
      await approveTimesheet({id: this.id});
      this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.approved);
    },

    async handleRejectSingle(request) {
      const rejectPayload = { id: this.id, refusalReason: request.refusalReason };
      await rejectTimesheet(rejectPayload);
      this.openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
    },
  },

};
</script>

<style>
</style>
