<template>
  <div>
    <!-- Dropdown for Selecting Report Type -->
   <div class="d-flex">
    <bib-button
        label="Download Summary"
        variant="primary-24"
        size="lg"
        class="w-100 mr-05"
        @click="downloadSummary"
      ></bib-button>
    <div v-click-outside="hideReportOptions">
      <bib-button
        label="Download Reports"
        variant="primary-24"
        size="lg"
        class="w-100"
        @click="toggleReportOptions"
      ></bib-button>
      <bib-button
        dropdown
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
            @change="updateEndDate"
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
import { DateTime } from "luxon";

export const DOWNLOAD_REPORT_OPTIONS = [
  { label: "Monthly Report", value: "month" },
  { label: "Last Six Months Report", value: "six_months" },
  { label: "Yearly Report", value: "yearly" },
  { label: "Custom Range", value: "custom_range" },
];

export const DETAIL_REPORT_ENDPOINT = "/requests/admin/leave/detail-report";
export const DETAIL_SUMMARY_ENDPOINT = "/requests/admin/leave/summary-report";

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
    async selectReport(reportType) {
      switch (reportType) {
        case "custom_range":
          this.showCustomRangePicker = true;
          this.startDate = null;
          this.endDate = null;
          break;
        case "month":
          this.setMonthDates();
          break;
        case "six_months":
          this.setSixMonthsDates();
          break;
        case "yearly":
          this.setYearlyDates();
          break;
        default:
          this.downloadReport(reportType);
          this.hideReportOptions();
          break;
      }
    },
    
    setMonthDates() {
      const today = DateTime.local();
      const lastMonthStart = today.minus({ months: 1 }).startOf("month");
      const currentDay = today.endOf("day");
      this.startDate = lastMonthStart.toUTC().toISO();
      this.endDate = currentDay.toUTC().toISO();;
      this.downloadReport();
      this.hideReportOptions();
    },
    setSixMonthsDates() {
      const sixMonthsAgo = DateTime.local().minus({ months: 6 }).startOf("month");
      const endOfMonth = DateTime.local().endOf("month");
      this.startDate = sixMonthsAgo.toUTC().toISO();
      this.endDate = endOfMonth.toUTC().toISO();
      this.downloadReport();
      this.hideReportOptions();
    },
    setYearlyDates() {
      const currentYearStart = DateTime.local().startOf("year");
      const currentYearEnd = DateTime.local().endOf("year");
      this.startDate = currentYearStart.toUTC().toISO();
      this.endDate = currentYearEnd.toUTC().toISO();
      this.downloadReport();
      this.hideReportOptions();
    },
    async downloadReport(reportType) {
      const endpoint = DETAIL_REPORT_ENDPOINT;
      const { startDate, endDate } = this;

      if (!startDate || !endDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
        return;
      }

      try {
        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { from: startDate, to: endDate },
          responseType: "blob",
        });

        this.downloadFile(response.data);
        this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
      } catch (error) {
        console.error("Error downloading file:", error);
        this.openPopupNotification(NOTIFICATION_MESSAGES.ERROR_DOWNLOAD);
      }
    },
    async downloadSummary() {
      const endpoint = DETAIL_SUMMARY_ENDPOINT;
      try {
        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        this.downloadFile(response.data);
        this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
      } catch (error) {
        console.error("Error downloading file:", error);
        this.openPopupNotification(NOTIFICATION_MESSAGES.ERROR_DOWNLOAD);
      }
    },
    downloadFile(data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filename.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    toggleReportOptions() {
      this.showOptions = !this.showOptions;
    },
    hideReportOptions() {
      this.showOptions = false;
    },
    updateStartDate(date) {
      this.startDate = date;
    },
    updateEndDate(date) {
      this.endDate = date;
    },
    cancelCustomRange() {
      this.showCustomRangePicker = false;
      this.startDate = null;
      this.endDate = null;
    },
    async downloadCustomRange() {
      if (!this.startDate || !this.endDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
        return;
      }

      if (DateTime.fromISO(this.startDate) > DateTime.fromISO(this.endDate)) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.DATE_VALIDATION_ERROR);
        return;
      }
      this.startDate = DateTime.fromISO(this.startDate).toUTC().toISO();
      this.endDate = DateTime.fromISO(this.endDate).toUTC().toISO();
      await this.downloadReport("custom_range");
      this.showCustomRangePicker = false;
    },
  },
};
</script>
