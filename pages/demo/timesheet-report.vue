<template>
  <div class="download-wrapper py-1 mt-1 bg-light px-1 mx-1 w-50 shape-rounded">
    <div>
      <div>
        <!-- Start Date Picker -->
        <form-datepicker
          label="Start Date"
          :value="selectedStartDate"
          @change="updateStartDate"
          :dis="true"
        >
        </form-datepicker>
        <!-- End Date Picker -->
        <form-datepicker
          label="End Date"
          :value="selectedEndDate"
          @change="updateEndDate"
          :dis="true"
        >
        </form-datepicker>
      </div>
      <div id="fotter">
        <div class="d-flex pt-1">
          <bib-button
            label="Download Timesheet"
            variant="primary-24"
            class="ml-auto"
            @click="fetchTimesheetReport"
          ></bib-button>
        </div>
      </div>
    </div>
    <loader :loading="loading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import { DateTime } from "luxon";

import { downloadFile } from "../../utils/functions/common_functions";
import { NOTIFICATION_MESSAGES } from "../../utils/constant/Notifications";
export const DETAIL_SUMMARY_ENDPOINT =
  "/requests/admin/timesheet/attendance-report";

export default {
  data() {
    return {
      selectedStartDate: null,
      selectedEndDate: null,
      loading: false,
    };
  },
  methods: {
    downloadFile,
    async fetchTimesheetReport() {
      this.loading = true;
      const endpoint = DETAIL_SUMMARY_ENDPOINT;

      if (!this.selectedStartDate || !this.selectedEndDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
        return;
      }

      try {
        const startDate = DateTime.fromFormat(this.selectedStartDate, "yyyy-MMM-dd");
        const endDate = DateTime.fromFormat(this.selectedEndDate, "yyyy-MMM-dd");

        if (startDate >= endDate) {
          this.openPopupNotification(NOTIFICATION_MESSAGES.DATE_VALIDATION_ERROR);
          return;
        }

        const start = startDate.toISODate();
        const end = endDate.toISODate();

        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { start, end },
          responseType: "blob",
        });

        if (response) {
          this.downloadFile(response.data, 'timesheet');
          this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
          this.selectedEndDate = null;
          this.selectedEndDate= null;
        }
      } catch (error) {
        console.error("Error downloading file:", error);
        this.openPopupNotification(NOTIFICATION_MESSAGES.ERROR_DOWNLOAD);
      }
      this.loading = false;
    },

    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    updateStartDate(date) {
      this.selectedStartDate = date;
    },
    updateEndDate(date) {
      this.selectedEndDate = date;
    },
  },
};
</script>
<style lang="scss">
.download-wrapper {
  .vdpComponent {
    display: unset !important;
    label {
      font-weight: bold !important;
      font-size: 14px !important;
    }
  }
}
</style>
