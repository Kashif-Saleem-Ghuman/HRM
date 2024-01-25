import axios from "axios";
import { DateTime } from "luxon";
import { generateRequestSelectedDays } from "../../../../requests/request-selected-days";

export async function addLeaveVacations() {
  if (this.$store.state.token.isAdmin) {
    if (this.addForm.type == null) {
      this.errorMsgSelect = true;
    }
    this.errorMsgSelect = false;
  }
  if (this.addForm.start == null) {
    this.errorMsgStartDate = true;
    return;
  }
  this.errorMsgStartDate = false;
  if (this.addForm.end == null) {
    this.errorMsgEndDate = true;
    return;
  }
  this.errorMsgEndDate = false;
  if (this.addForm.start > this.addForm.end) {
    this.errorMsgEndDateGreater = true;
    return;
  }
  this.errorMsgEndDateGreater = false;
  this.loading = true;
  var data = this.addForm;
  let startDate = new Date(data.start).toISOString();
  const isoStartDate = DateTime.fromISO(startDate).startOf('day').toUTC().toISO();
  let endDate = new Date(data.end).toISOString();
  const isoEndDate = DateTime.fromISO(endDate).endOf('day').toUTC().toISO();
  // var startDate = fecha.format(
  //   new Date(data.start),
  //   "YYYY-MM-DDT00:00:00.000Z"
  // );
  // var endDate = fecha.format(new Date(data.end), "YYYY-MM-DDT23:59:59.999Z");

  this.addForm.start = isoStartDate;
  this.addForm.end = isoEndDate;
  this.addForm.selectedDays = generateRequestSelectedDays(startDate, endDate);

  try {
    const addLeaveVacations = await axios.post(
      process.env.API_URL + "/requests",
      this.addForm,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.addForm = {};
    this.leaveVacationData = addLeaveVacations.data;
    if (this.$store.state.token.isAdmin) {
      await this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
          employeeId: this.addForm.employeeId,
        })
        .then((result) => {
          this.$nuxt.$emit("update-key");
          this.$nuxt.$emit("fetched-leave-vacation");
          this.slideClass = "slide-out";
          setTimeout(() => {
            this.openSidebar = false;
            this.openPopupNotification(0);
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
          this.slideClass = "slide-out";
          setTimeout(() => {
            this.openSidebar = false;
            this.openPopupNotification(0);
          }, 700);
        });
    }
  } catch (e) {
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
  }
  this.loading = false;
}
export async function deleteLevaeVacation(value) {
  this.loading = true;
  try {
    const leaveDelete = await axios.delete(
      process.env.API_URL + "/requests/" + value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.$nuxt.$emit("fetched-leave-vacation");
    this.$nuxt.$emit("leave-list-key");
    this.loading = false;
    this.$nuxt.$emit("close-sidebar");
    this.confirmastionMessageModal = false;
    this.openPopupNotification(9);
    return leaveDelete;
  } catch (e) {
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
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
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
  }
}
