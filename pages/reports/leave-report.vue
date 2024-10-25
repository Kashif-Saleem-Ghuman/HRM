<template>
  <div class="download-wrapper py-1 mt-1 px-1 mx-1 w-50 shape-rounded" :class="themeClassCommon">
    <div>
      <bib-input
        type="select"
        label="Employee"
        :options="formattedEmployeesOptions"
        v-model="selectedEmployeeId"
        :variant="isLightThemeCheck  ? 'light' : 'dark'"
      ></bib-input>
    </div>
    <div>
      <bib-datetime-picker
        v-model="from"
        label="From"
        hide-quick-select
      ></bib-datetime-picker>
    </div>
    <div>
      <bib-datetime-picker
        v-model="to"
        label="To"
        hide-quick-select
      ></bib-datetime-picker>
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
      from: null,
      to: null,
    };
  },
  computed:{
    formattedEmployeesOptions() {
    if (Array.isArray(this.employeesOptions)) {
      return this.employeesOptions.map((employee) => {
        const truncatedLabel = this.$options.filters.truncate(employee.label, 100, "...");
        return {
          ...employee,
          label: truncatedLabel,
          title: employee.label,
        };
      });
    }
    return [];
  },
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
      const { from, to } = this
      const employeeId = this.selectedEmployeeId;
 
      const endpoint = DETAIL_REPORT_ENDPOINT;
      try {
        // TODO - This request should be moved to api service
        const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: { from, to, employeeId },
          responseType: "blob",
        });

        if (response) {
          let filename
          try {
            filename = response.headers['content-disposition'].split(
              "filename="
            )[1];
          } catch (error) {
            console.log(error);
          }

          filename = filename ?? "leave-details-report";
          
          this.downloadFile(response.data, filename);
          this.openPopupNotification(NOTIFICATION_MESSAGES.SUCCESS_DOWNLOAD);
          this.selectedEmployeeId = null;
          this.selectedMonth = null;
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
