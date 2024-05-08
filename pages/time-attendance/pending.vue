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
              @click="pendingMultiRequestHandler('approve')"
          ></bib-button>
        </div>
        <div class="ml-05 d-flex align-center" v-show="showMultiRecordActionButton">
          <bib-button
              :icon="$button.rejected.icon"
              :variant="$button.rejected.variant"
              :scale="$button.rejected.scale"
              :label="$button.rejected.label"
              @click="pendingMultiRequestHandler('reject')"
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
        ></timesheets-approval-table>
      </div>
    </div>
  </div>
</template>

<script>
import {approveTimesheets, rejectTimesheets} from "@/utils/functions/api_call/timeattendance/time";

export default {
  data() {
    return {
      dates: { from: null, to: null },
      searchString: null,
      requestData: [],
      isStatusUpdated: false,
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
  },

};
</script>

<style>
</style>

