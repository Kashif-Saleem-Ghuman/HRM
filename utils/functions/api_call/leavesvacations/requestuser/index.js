import axios from "axios";
import fecha from "fecha";
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
    return
  }
  this.errorMsgStartDate = false;
  if (this.addForm.end == null) {
    this.errorMsgEndDate = true;
    return
  }
  this.errorMsgEndDate = false;
  this.loading = true;
  var data = this.addForm;
  var startDate = fecha.format(
    new Date(data.start),
    "YYYY-MM-DDT00:00:00.000Z"
  );
  var endDate = fecha.format(new Date(data.end), "YYYY-MM-DDT23:59:59.999Z");

  this.addForm.start = startDate;
  this.addForm.end = endDate;
  this.addForm.selectedDays = generateRequestSelectedDays(startDate, endDate)

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
    alert(e.response.data.message);
  }
  this.loading = false;
}
export async function getAllowanceDays(leaveType) {
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          type: leaveType, // This is the body part
        },
      }
    );
    return allowanceDays.data;
    
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getAllowancVacationeDays() {
  this.loading = true;
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          type: "vacation", // This is the body part
        },
      }
    );
    this.loading = false;
    this.allowanceVacationData = allowanceDays.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getAllowancMedicalDays() {
  this.loading = true;
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          type: "medical", // This is the body part
        },
      }
    );
    this.loading = false;
    this.allowanceMedicalData = allowanceDays.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getAllowanceLeaveDays() {
  this.loading = true;
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          type: "leave", // This is the body part
        },
      }
    );
    this.loading = false;
    this.allowanceLeaveData = allowanceDays.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getAllowancOtherDays() {
  this.loading = true;
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          type: "vacation", // This is the body part
        },
      }
    );
    this.loading = false;
    this.allowanceOtherData = allowanceDays.data;
  } catch (e) {
    alert(e);
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
    this.$nuxt.$emit('fetched-leave-vacation')
    this.$nuxt.$emit('leave-list-key')
    this.loading = false;
    this.confirmastionMessageModal = false;
    return leaveDelete;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getUserLeavesDetailUser() {
  this.loading = true;
  try {
    const result = await axios.get(process.env.API_URL + "/widgets/request/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    this.loading = false;
    return result.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
