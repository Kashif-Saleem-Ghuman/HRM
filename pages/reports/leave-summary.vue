<template>
  <div class="download-wrapper py-1 mt-1 px-1 mx-1 w-50 shape-rounded" :class="themeClassCommon">
    <div>
      <div>
        <bib-input
          type="select"
          label="Year"
          :options="yearOptions"
          v-model="selectedYear"
          :variant="isLightThemeCheck  ? 'light' : 'dark'"
        ></bib-input>
      </div>
      <div id="fotter">
        <div class="d-flex pt-1">
          <bib-button
            label="Download Report"
            variant="primary-24"
            class="ml-auto"
            @click="fetchSummaryReport"
          ></bib-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  downloadFile,
  generateYearList,
} from "../../utils/functions/common_functions";
import { NOTIFICATION_MESSAGES } from "../../utils/constant/Notifications";
export const DETAIL_SUMMARY_ENDPOINT = "/requests/admin/leave/summary-report";

export default {
  data() {
    return {
      yearOptions: null,
      selectedYear: null,
    };
  },
  mounted() {
    this.yearOptions = [{ label: "", value: "" }, ...this.generateYearList()];
  },
  methods: {
    downloadFile,
    generateYearList,
    async fetchSummaryReport() {
      const year = this.selectedYear;

      const endpoint = DETAIL_SUMMARY_ENDPOINT;
      try {
        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { year },
          responseType: "blob",
        });
        if (response) {
          this.downloadFile(response.data, "leave-summary-report");
          this.$openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
          this.selectedYear = null;
        }
      } catch (error) {
        console.error("Error downloading file:", error);
        this.$openPopupNotification(NOTIFICATION_MESSAGES.ERROR_DOWNLOAD);
      }
    },
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
  },
};
</script>
