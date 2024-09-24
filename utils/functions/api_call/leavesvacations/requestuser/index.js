import { DateTime } from "luxon";
import { generateRequestSelectedDays } from "../../../../requests/request-selected-days";
import { createConfig } from "../../config";
import { hrmApiAxiosInstance } from "../../hrm-api-axios-instance";
import axios from "axios";

const addLeaveErrorMessage = [
  { text: "Please select start date", variant: "danger" },
  { text: "Please select end date", variant: "danger" },
  { text: "Start date should be before end date", variant: "danger" },
];
export async function addLeaveVacations() {
  if (this.addForm.start == null) {
    this.$openPopupNotification(addLeaveErrorMessage[0]);
    return;
  }
  if (this.addForm.end == null) {
    this.$openPopupNotification(addLeaveErrorMessage[1]);
    return;
  }
  const date1 = new Date(this.addForm.start);
  const date2 = new Date(this.addForm.end);
  if (date1 > date2) {
    this.$openPopupNotification(addLeaveErrorMessage[2]);
    return;
  }
  this.loading = true;
  let isHalfday = this.isHalfday;
  const dateTimeUtcStart = DateTime.fromFormat(this.addForm.start, "yyyy-MMM-dd", { zone: 'utc'})
  const dateTimeUtcEnd = DateTime.fromFormat(this.addForm.end, "yyyy-MMM-dd", { zone: 'utc'})
  const isoStartDate = dateTimeUtcStart.toISODate();
  const isoEndDate = dateTimeUtcEnd.toISODate();
  const isoStringStart = dateTimeUtcStart.toISO();
  const isoStringEnd = dateTimeUtcEnd.toISO();

  this.addForm.start = isoStartDate;
  this.addForm.end = isoEndDate;
  this.addForm.isHalfDay = isHalfday;
  this.addForm.selectedDays = generateRequestSelectedDays(isoStringStart, isoStringEnd, isHalfday);

  try {
    const url = `/requests`;
    const request = this.addForm;
    const config = createConfig();
    const addLeaveVacations = await hrmApiAxiosInstance.post(
      url,
      request,
      config
    );
    this.addForm = {};
    this.isHalfday = false;
    this.leaveVacationData = addLeaveVacations.data;
    if (this.$store.state.token.isAdmin) {
      await this.$store
        .dispatch("leavevacation/setLeaveVacations", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
          employeeId: this.addForm.employeeId,
        })
        .then((result) => {
          this.$nuxt.$emit("update-key");
          this.$nuxt.$emit("fetched-leave-vacation-admin");
          this.$nuxt.$emit("render-leave-actual-data");
          this.slideClass = "slide-out";
          setTimeout(() => {
            this.openSidebar = false;
            this.$openPopupNotification(0);
          }, 700);
        });
    } else {
      this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then(() => {
          this.$nuxt.$emit("leaves-list");
          this.$nuxt.$emit("fetched-leave-vacation");
          this.$nuxt.$emit("render-leave-actual-data");
          this.slideClass = "slide-out";
          setTimeout(() => {
            this.openSidebar = false;
            this.$openPopupNotification(0);
          }, 700);
        });
    }
  } catch (e) {
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
  this.loading = false;
}
export async function deleteLevaeVacation(value) {
  this.loading = true;
  try {
    const url = `/requests/`;
    const request = value;
    const config = createConfig();
    const leaveDelete = await hrmApiAxiosInstance.delete(url + request, config);
    if (this.$store.state.token.isAdmin) {
      this.$nuxt.$emit("update-key");
      this.$nuxt.$emit("fetched-leave-vacation-admin");
      this.$nuxt.$emit("render-leave-actual-data");
    }else{
      this.$nuxt.$emit("fetched-leave-vacation");
    }
    this.$nuxt.$emit("leave-list-key");
    this.loading = false;
    this.$nuxt.$emit("close-sidebar");
    this.confirmastionMessageModal = false;
    this.$openPopupNotification(9);
    return leaveDelete;
  } catch (e) {
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
  this.loading = false;
}
export async function getUserLeavesDetailUser(payload) {
  try {
    const result = await axios.get(process.env.API_URL + "/widgets/request/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        from: payload?.from,
        to: payload?.to,
      },
    });
    this.loading = false;
    return result.data;
  } catch (e) {
    this.loading = false;
    this.$openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
}
