<template>
  <div>
    <!-- Dropdown for Selecting Report Type -->
    <div v-click-outside="hideReportOptions">
      <bib-button
        label="Download Report"
        variant="primary-24"
        size="lg"
        class="w-100"
        @click="toggleReportOptions"
      ></bib-button>
      <bib-button
        dropdown=""
        label=""
        style="transform: translateY(-30px); margin-bottom: -30px"
        class="max-z-index"
      >
        <template v-slot:menu>
          <ul class="min-height-10">
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
      title="Download Leave Summary"
      v-if="showCustomRangePicker"
      @close="showCustomRangePicker = false"
    >
      <template #content>
        <div class="d-flex">
          <!-- Start Date Picker -->
          <bib-datetime-picker
            v-model="startDate"
            placeholder="Select start date"
            label="Start Date:"
            @input="updateStartDate"
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
  { label: "Last Week", value: "week" },
  { label: "Last Month", value: "month" },
  { label: "Last Year", value: "year" },
  { label: "Custom Range", value: "custom" },
];

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
      if (reportType === "custom") {
        this.showCustomRangePicker = true;
        this.showOptions = false; // Hide report options after selecting Custom Range
      } else {
        this.downloadFile(reportType);
        this.showOptions = false; // Hide report options after selecting other report types
      }
    },
    async downloadFile(reportType) {
      let fromDate = new Date();
      let toDate = new Date();

      switch (reportType) {
        case "week":
          fromDate.setDate(fromDate.getDate() - 7);
          break;
        case "month":
          fromDate.setMonth(fromDate.getMonth() - 1);
          break;
        case "year":
          fromDate.setFullYear(fromDate.getFullYear() - 1);
          break;
        default:
          break; // No changes needed for other report types
      }

      await this.fetchAndDownloadReport(fromDate, toDate);
    },
    async fetchAndDownloadReport(fromDate, toDate) {
      try {
        const response = await axios.get(
            `${process.env.API_URL}/dashboard/admin/leave-summary-report`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              from: fromDate.toISOString(),
              to: toDate.toISOString(),
            },
          }
        );
        console.log(response, "response")
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "filename.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.openPopupNotification({
          text: "File has been downloaded successfully...",
          variant: "primary-24",
        });
      } catch (error) {
        console.error("Error downloading file:", error);
        this.openPopupNotification({
          text: "Failed to download file. Please try again.",
          variant: "danger",
        });
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
        this.openPopupNotification({
          text: "Please select both start and end dates for the custom range.",
          variant: "danger",
        });
        return;
      }

      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      if (endDate < startDate) {
        this.openPopupNotification({
          text: "End date cannot be earlier than the start date. Please adjust.",
          variant: "danger",
        });
        return;
      }

      await this.fetchAndDownloadReport(startDate, endDate);

      this.showCustomRangePicker = false; // Hide custom range modal after download
    },
  },
};
</script>
