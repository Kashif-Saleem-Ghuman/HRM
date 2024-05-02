<template>
  <div class="download-wrapper py-1 mt-1 bg-light px-1 mx-1 w-50 shape-rounded">
    <div>
      <div :key="update">
        <!-- Start Date Picker -->
        <form-datepicker
          label="Start Date"
          :value="selectedStartDate"
          @change="updateStartDate"
          :dis="true"
          :variant="variantStart"
          :disableWeekends="false"
        >
        </form-datepicker>
        <!-- End Date Picker -->
        <form-datepicker
          label="End Date"
          :value="selectedEndDate"
          @change="updateEndDate"
          :dis="true"
          :variant="variantEnd"
          :disableWeekends="false"
        >
        </form-datepicker>
      </div>
      <div id="fotter">
        <div class="d-flex pt-1">
          <bib-button
            label="Download Report"
            variant="primary-24"
            class="ml-auto"
            @click="fetchTimesheetReport"
          ></bib-button>
        </div>
      </div>
    </div>
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
      variantStart: null,
      variantEnd: null,
      update: 0,
    };
  },
  methods: {
    downloadFile,
    async fetchTimesheetReport() {
      const endpoint = DETAIL_SUMMARY_ENDPOINT;

      if (!this.selectedStartDate || !this.selectedEndDate) {
        if (!this.selectedStartDate) {
          this.variantStart = "alert";
          this.variantEnd = null;
          return;
        }
        if (!this.selectedEndDate) {
          this.variantStart = null;
          this.variantEnd = "alert";
          this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
          return;
        }
        return;
      }

      try {
        const startDate = DateTime.fromFormat(
          this.selectedStartDate,
          "yyyy-MMM-dd"
        );
        const endDate = DateTime.fromFormat(
          this.selectedEndDate,
          "yyyy-MMM-dd"
        );

        if (startDate > endDate) {
          this.openPopupNotification(
            NOTIFICATION_MESSAGES.DATE_VALIDATION_ERROR
          );
          return;
        }
        if (startDate.toMillis() === endDate.toMillis()) {
          this.openPopupNotification(
            NOTIFICATION_MESSAGES.SAME_DATE_VALIDATION_ERROR
          );
          return;
        }
        this.variantEnd = null;
        this.variantStart = null;
        let startOfWeek = startDate;
        if (startDate.weekday !== 7) {
          startOfWeek = startDate.startOf("week", { weekStartsOn: 7 }).toUTC();
        }
        const start = startOfWeek.toISODate();

        const endOfWeek = endDate.endOf("week", { weekStartsOn: 7 }).minus({ days: 1 }).toUTC();
        const end = endOfWeek.toISODate();

        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { start, end },
          responseType: "blob",
        });

        if (response) {
          this.downloadFile(response.data, "attendance-report");
          this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
          this.selectedStartDate = null;
          this.selectedEndDate = null;
          this.update += 1;
        }
      } catch (error) {
        console.error("Error downloading file:", error);
        this.openPopupNotification(NOTIFICATION_MESSAGES.ERROR_DOWNLOAD);
      }
    },

    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    updateStartDate(date) {
      this.selectedStartDate = date;
      this.selectedStartDate ? (this.variantStart = null) : "danger";
    },
    updateEndDate(date) {
      this.selectedEndDate = date;
      this.selectedEndDate ? (this.variantEnd = null) : "danger";
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
