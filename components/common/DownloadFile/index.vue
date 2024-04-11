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
            @change="updateStartDate"
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

const DOWNLOAD_REPORT_OPTIONS = [
  { label: "Month", value: "month" },
  { label: "Six Months", value: "six_months" },
  { label: "Yearly", value: "yearly" },
  { label: "Custom Range", value: "custom_range" },
];

const DETAIL_REPORT_ENDPOINT = "/dashboard/admin/leave-detail-report";

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
      if (reportType === "custom_range") {
        this.showCustomRangePicker = true;
      } else if (reportType === "month") {
        this.setMonthDateRange();
      } else if (reportType === "six_months") {
        this.setSixMonthDateRange();
      } else if (reportType === "yearly") {
        this.setYearDateRange();
      } else {
        this.downloadReport(reportType);
        this.hideReportOptions();
      }
    },
    async downloadReport(reportType) {
      const endpoint = DETAIL_REPORT_ENDPOINT;

      try {
        let params = {};

        if (reportType === "custom_range") {
          if (!this.startDate || !this.endDate) {
            this.openPopupNotification(
              NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED
            );
            return;
          }

          params = {
            from: this.startDate,
            to: this.endDate,
          };
        } else if (reportType === "six_months") {
          // Calculate six months ago
          const sixMonthsAgo = DateTime.local().minus({ months: 6 });
          params = {
            from: sixMonthsAgo.startOf("month").toJSDate(),
            to: DateTime.local().endOf("month").toJSDate(),
          };
        } else if (reportType === "yearly") {
          // Calculate last year
          const lastYearStart = DateTime.local()
            .minus({ years: 1 })
            .startOf("year")
            .toJSDate();
          const lastYearEnd = DateTime.local()
            .minus({ years: 1 })
            .endOf("year")
            .toJSDate();
          params = {
            from: lastYearStart,
            to: lastYearEnd,
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
      this.startDate = null;
      this.endDate = null;
    },
    async setMonthDateRange() {
      const today = DateTime.local();
      const lastMonthStart = today
        .minus({ months: 1 })
        .startOf("month")
        .toJSDate();
      const lastMonthEnd = today.minus({ months: 1 }).endOf("month").toJSDate();

      this.startDate = lastMonthStart;
      this.endDate = lastMonthEnd;

      await this.downloadReport("custom_range");
      this.hideReportOptions();
    },

    async setSixMonthDateRange() {
      const today = DateTime.local();
      const firstDayOfCurrentMonth = today.startOf("month");
      const sixMonthsAgo = firstDayOfCurrentMonth.minus({ months: 6 });

      const startDate = sixMonthsAgo.startOf("month").toJSDate();
      const endDate = firstDayOfCurrentMonth.endOf("month").toJSDate();

      this.startDate = startDate;
      this.endDate = endDate;

      await this.downloadReport("six_months");
      this.hideReportOptions();
    },

    async setYearDateRange() {
      const lastYearStart = DateTime.local()
        .minus({ years: 1 })
        .startOf("year")
        .toJSDate();
      const lastYearEnd = DateTime.local()
        .minus({ years: 1 })
        .endOf("year")
        .toJSDate();

      this.startDate = lastYearStart;
      this.endDate = lastYearEnd;

      await this.downloadReport("yearly");
      this.hideReportOptions();
    },
    async downloadCustomRange() {
      if (!this.startDate || !this.endDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.BOTH_DATES_REQUIRED);
        return;
      }

      const startDate = DateTime.fromJSDate(this.startDate);
      const endDate = DateTime.fromJSDate(this.endDate);

      if (endDate < startDate) {
        this.openPopupNotification(NOTIFICATION_MESSAGES.DATE_VALIDATION_ERROR);
        return;
      }

      await this.downloadReport("custom_range");
      this.showCustomRangePicker = false;
    },
  },
};
</script>
