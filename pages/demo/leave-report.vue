<template>
  <div class="download-wrapper py-1 mt-1 bg-light px-1 mx-1 w-50 shape-rounded">
    <div>
      <bib-input
        type="select"
        label="Employee"
        :options="employeesOptions"
        v-model="selectedEmployeeId"
      ></bib-input>
    </div>
    <div>
      <bib-input
        type="select"
        label="Month"
        :options="monthOptions"
        v-model="selectedMonth"
      ></bib-input>
    </div>
    <div>
      <bib-input
        type="select"
        label="Year"
        :options="yearOptions"
        v-model="selectedYear"
      ></bib-input>
    </div>
    <div id="fotter">
      <div class="d-flex pt-1">
        <bib-button
          label="Download Report"
          variant="primary-24"
          class="ml-auto"
          @click="downloadReport"
        ></bib-button>
      </div>
    </div>
    <loader :loading="loading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import {
  downloadFile,
  generateYearList,
} from "../../utils/functions/common_functions";
import { NOTIFICATION_MESSAGES } from "../../utils/constant/Notifications";
import { MONTHS_LABEL_VALUE } from "../../utils/constant/Calander";
const DETAIL_REPORT_ENDPOINT = "/requests/admin/leave/detail-report";

export default {
  data() {
    return {
      employeesOptions: null,
      monthOptions: [{ label: "", value: "" }, ...MONTHS_LABEL_VALUE],
      yearOptions: null,
      selectedEmployeeId: null,
      selectedMonth: null,
      selectedYear: null,
      loading: false,
    };
  },
  async created() {
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{ label: "", value: "" }, ...reportTo];
    });
  },
  mounted() {
    this.yearOptions = [{ label: "", value: "" }, ...this.generateYearList()];
  },
  methods: {
    downloadFile,
    generateYearList,
    async downloadReport() {
      this.loading = true;
      const employeeId = this.selectedEmployeeId;
      const month = this.selectedMonth;
      const year = this.selectedYear;

      const endpoint = DETAIL_REPORT_ENDPOINT;
      try {
        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { month, year, employeeId },
          responseType: "blob",
        });

        if (response) {
          this.downloadFile(response.data, "report");
          this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);

          this.selectedEmployeeId = null;
          this.selectedMonth = null;
          this.selectedYear = null;
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
  },
};
</script>
<style lang="scss">
.download-wrapper {
.vdpComponent {
  display: unset !important;
  input {
    label {
      font-weight: bold !important;
      font-size: 14px !important;
    }
  }
}
  .input {
    label {
      font-weight: bold !important;
      font-size: 14px !important;
    }
  }
}
</style>
