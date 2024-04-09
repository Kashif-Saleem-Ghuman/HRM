<template>
  <div>
    <!-- Dropdown for Selecting Report Type -->
    <div v-click-outside="hideReportOptions">
      <bib-button
        label="Download"
        variant="primary-24"
        size="lg"
        class="w-100"
        @click="toggleReportOptions"
      ></bib-button>
      <bib-button
        dropdown=""
        label=""
        style="transform: translateY(-30px); margin-bottom: -30px; right: 30px"
        class="max-z-index"
      >
        <template v-slot:menu>
          <ul>
            <!-- Loop through DOWNLOAD_REPORT_OPTIONS to populate dropdown items -->
            <li
              class="option-item"
              v-for="option in downloadFileOptions"
              :key="option.value"
              @click="selectReport(option.value)"
            >
              {{ option.label }}
            </li>
          </ul>
        </template>
      </bib-button>
    </div>

    <!-- Custom Range Date Picker Modal -->
    <bib-modal-wrapper
      title="Download Leave Report"
      v-if="showCustomRangePicker"
      @close="cancelCustomRange"
    >
      <template #content>
        <div class="d-flex">
          <!-- Start Date Picker -->
          <bib-datetime-picker
            v-model="startDate"
            placeholder="Select start date"
            label="Start Date:"
            @input="updateStartDate"
            class="mr-1"
          ></bib-datetime-picker>

          <!-- End Date Picker -->
          <bib-datetime-picker
            v-model="endDate"
            placeholder="Select end date"
            label="End Date:"
            @input="updateEndDate"
          ></bib-datetime-picker>
        </div>
      </template>
      <template #footer>
        <div class="d-flex">
          <bib-button
            label="Cancel"
            variant="light"
            @click="cancelCustomRange"
          ></bib-button>
          <bib-button
            label="Download"
            variant="primary-24"
            class="ml-auto"
            @click="downloadCustomRange"
          ></bib-button>
        </div>
      </template>
    </bib-modal-wrapper>
  </div>
</template>
<script>
import axios from "axios";

const DOWNLOAD_REPORT_OPTIONS = [
  { label: "Download Report", value: "download_report" },
  { label: "Download Summary", value: "download_summary" },
];

// Constants for API endpoints
const SUMMARY_REPORT_ENDPOINT = "/dashboard/admin/leave-summary-report";
const DETAIL_REPORT_ENDPOINT = "/dashboard/admin/leave-detail-report";

// Constant for popup notification settings
const NOTIFICATION_MESSAGES = {
  SUCCESS_DOWNLOAD: {
    text: "File has been downloaded successfully...",
    variant: "primary-24",
  },
  ERROR_DOWNLOAD: {
    text: "Failed to download file. Please try again.",
    variant: "danger",
  },
  BOTH_DATES_REQUIRED: {
    text: "Please select both start and end dates for the custom range.",
    variant: "danger",
  },
  DATE_VALIDATION_ERROR: {
    text: "End date cannot be earlier than the start date. Please adjust.",
    variant: "danger",
  },
};

export default {
  data() {
    return {
      showOptions: false,
      showCustomRangePicker: false,
      startDate: null,
      endDate: null,
      downloadFileOptions: DOWNLOAD_REPORT_OPTIONS,
    };
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    toggleReportOptions() {
      this.showOptions = !this.showOptions;
    },
    hideReportOptions() {
      this.showOptions = false;
    },
    selectReport(reportType) {
      if (reportType === "download_report") {
        this.showCustomRangePicker = true;
      } else {
        this.downloadReport(reportType);
        this.hideReportOptions();
      }
    },
    async downloadReport(reportType) {
      const endpoint =
        reportType === "download_report"
          ? SUMMARY_REPORT_ENDPOINT
          : DETAIL_REPORT_ENDPOINT;

      try {
        let params = {}; // Initialize params object

        if (reportType === "download_report") {
          // Include additional parameters for "download_report" type
          params = {
            from: this.startDate,
            to: this.endDate,
          };
        }

        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: params, 
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "filename.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
      } catch (error) {
        console.error("Error downloading file:", error);
        this.openPopupNotification(NOTIFICATION_MESSAGES.ERROR_DOWNLOAD);
      }
    },

    updateStartDate(date) {
      this.startDate = date;
    },
    updateEndDate(date) {
      this.endDate = date;
    },
    cancelCustomRange() {
      this.showCustomRangePicker = false;
      // Reset start and end date if needed
      this.startDate = null;
      this.endDate = null;
    },
    async downloadCustomRange() {
      if (!this.startDate || !this.endDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
        return;
      }

      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      if (endDate < startDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.DATE_VALIDATION_ERROR);
        return;
      }

      await this.downloadReport("download_report");

      this.showCustomRangePicker = false; // Hide custom range modal after download
    },
  },
};
</script>
