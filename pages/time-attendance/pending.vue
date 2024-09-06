<template>
  <div>
    <div
      class="d-flex justify-between align-center px-1 py-025 bottom_border_wrapper"
    >
      <div class="d-flex align-center">
        <div class="custom_date_picker">
          <date-selector :is-year-disabled="isShowAll" :is-month-disabled="isShowAll" :dates.sync="dates" />
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
            type="pending"
            :dates.sync="dates"
            :requestData.sync="requestData"
            :searchString="searchString"
            :isStatusUpdated.sync="isStatusUpdated"
            :is-show-all="isShowAll"
            @reject-item="enableModal($event, 'rejectSingle')"
        ></timesheets-approval-table>
      </div>
    </div>
    <request-refusal-modal
      v-if="showRefusalModal"
      @cancel="disableModal"
      @close="disableModal"
      @confirm="actionPerformOnRequest"
      title="Reject Timesheet"
    ></request-refusal-modal>
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
import {
  approveTimesheet,
  approveTimesheets,
  rejectTimesheet,
  rejectTimesheets
} from "@/utils/functions/api_call/timeattendance/time";
import {TIMESHEET_NOTIFICATIN_MESSAGE, TIMESHEET_CONFIRMATION_MESSAGE} from "@/utils/constant/Notifications";
export default {
  data() {
    return {
      dates: { from: null, to: null },
      searchString: null,
      requestData: [],
      isStatusUpdated: false,
      showRefusalModal: false,
      refusalReason: null,
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
    isShowAll() {
      return this.$route.query.show_all == 'true';
    },
  },
  methods: {
    
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
      if (event == "reject") {
        await this.rejectTimesheets({timesheetIds});
      }
      this.isStatusUpdated = true;
    },
    async approveMultipleTimesheets() {
      const timesheetIds = this.requestData
        .flatMap((item) => item.timesheets)
        .filter((timesheet) => timesheet.checked)
        .map((timesheet) => timesheet.id);
      if (timesheetIds.length <= 0) {
        return;
      }
      await this.approveTimesheets({ timesheetIds });
      this.isStatusUpdated = true;
      this.checkedAll = false;
    },
    disableModal() {
      this.showRefusalModal = false;
      this.confirmastionMessageModal = false;
    },
    async enableModal(timesheetReq, event) {
      const checkedCount = this.requestData
        .flatMap((employee) => employee.timesheets)
        .filter((timesheet) => timesheet.checked).length;
      switch (event) {
        case "approveMultiple":
          this.approveMultipleTimesheets();
          this.confirmationPopupData =
            checkedCount > 1
              ? TIMESHEET_CONFIRMATION_MESSAGE.approved
              : TIMESHEET_CONFIRMATION_MESSAGE.approvedSingle;
          break;
        case "rejectMultiple":
          this.confirmastionMessageModal = true;
          this.confirmationPopupData =
            checkedCount > 1
              ? TIMESHEET_CONFIRMATION_MESSAGE.rejected
              : TIMESHEET_CONFIRMATION_MESSAGE.rejectedSingle;
          this.variantButton = "danger";
          break;
        default:
          this.showRefusalModal = true;
          break;
      }
      this.actionToPerformOnButton = event;
      this.id = timesheetReq?.id;
      this.timesheetReq = timesheetReq;
    },
    async actionPerformOnRequest(request) {

      let type = this.actionToPerformOnButton;
      const timesheetIds = this.requestData
        .flatMap((item) => item.timesheets)
        .filter((timesheet) => timesheet.checked)
        .map((timesheet) => timesheet.id);

      switch (type) {
        case "rejectMultiple":
          await this.handleRejectMultiple(timesheetIds);
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

    async handleRejectMultiple(requestIds) {
      await this.rejectTimesheets({timesheetIds: requestIds});
    },


    async handleRejectSingle(request) {
      const rejectPayload = { id: this.id, refusalReason: request.refusalReason };
      await rejectTimesheet(rejectPayload);
      this.$openPopupNotification(TIMESHEET_NOTIFICATIN_MESSAGE.rejected);
    },
  },

};
</script>

<style>
</style>

