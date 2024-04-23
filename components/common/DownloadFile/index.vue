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
          style="
            transform: translateY(-30px);
            margin-bottom: -30px;
            right: 30px;
          "
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
          <form-datepicker
            label="Start Date"
            :value="selectedStartDate"
            @change="updateStartDate"
            :dis="true"
            class="mr-1"
          >
          </form-datepicker>
          <!-- End Date Picker -->
          <form-datepicker
            label="Start Date"
            :value="selectedEndDate"
            fieldKey="start"
            @change="updateEndDate"
            :dis="true"
          >
          </form-datepicker>
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
import { DATETIME_FORMAT } from "@/utils/functions/datetime-input";

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
      selectedStartDate: null,
      selectedEndDate: null,
      downloadFileOptions: DOWNLOAD_REPORT_OPTIONS,
    };
  },
  methods: {
    async selectReport(reportType) {
      switch (reportType) {
        case "custom_range":
          this.showCustomRangePicker = true;
          this.selectedStartDate = null;
          this.selectedEndDate = null;
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
      this.startDate = DateTime.fromISO(lastMonthStart).toISO({ includeOffset: false })
      this.endDate = DateTime.fromISO(currentDay).toISO({ includeOffset: false })
      this.downloadReport();
      this.hideReportOptions();
    },
    setSixMonthsDates() {
      const today = DateTime.local();
      const sixMonthsAgo = DateTime.local().minus({ months: 6 });
      const endOfMonth = today.endOf("day");
      this.startDate = DateTime.fromISO(sixMonthsAgo).toISO({
        includeOffset: false,
      });
      this.endDate = DateTime.fromISO(endOfMonth).toISO({
        includeOffset: false,
      });
      this.downloadReport();
      this.hideReportOptions();
    },
    setYearlyDates() {
      const today = DateTime.local();
      const currentYearStart = DateTime.local().startOf("year");
      console.log(
        currentYearStart,
        "currentYearStartcurrentYearStartcurrentYearStart"
      );
      const currentYearEnd = today.endOf("day");
      this.startDate = DateTime.fromISO(currentYearStart).toISO({
        includeOffset: false,
      });
      this.endDate = DateTime.fromISO(currentYearEnd).toISO({
        includeOffset: false,
      });
      this.downloadReport();
      this.hideReportOptions();
    },
    async downloadReport(reportType) {
      const endpoint = DETAIL_REPORT_ENDPOINT;
      const { startDate, endDate } = this;
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
      const start = DateTime.fromISO(this.startDate).toISODate();
      const end = DateTime.fromISO(this.endDate).toISODate();
      const url = window.URL.createObjectURL(new Blob([data]));
      const filename = start && end ? `${start}-${end}.csv` : 'download_summary.csv';
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.startDate = null;
      this.endDate = null;
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
      this.selectedStartDate = date;
    },
    updateEndDate(date) {
      this.selectedEndDate = date;
    },
    cancelCustomRange() {
      this.showCustomRangePicker = false;
      this.selectedStartDate = null;
      this.selectedEndDate = null;
    },
    async downloadCustomRange() {
      if (!this.selectedStartDate || !this.selectedEndDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
        return;
      }
      if (this.selectedStartDate > this.selectedEndDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.DATE_VALIDATION_ERROR);
        return;
      }
      const dateFormat = "yyyy-MMM-dd";
      const parsedStartDate = DateTime.fromFormat(
        this.selectedStartDate,
        dateFormat
      );
      const parsedEndDate = DateTime.fromFormat(
        this.selectedEndDate,
        dateFormat
      );

      const start = parsedStartDate.endOf("day").toISO({
        includeOffset: false,
      });
      const end = parsedEndDate.endOf("day").toISO({
        includeOffset: false,
      });

      this.startDate = start;
      this.endDate = end;

      await this.downloadReport("custom_range");
      this.showCustomRangePicker = false;
    },
  },
  watch: {
    dateValue() {
      this.setDateValue();
    },
  },
};
</script>
