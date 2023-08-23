import axios from "axios";
import fecha, { format } from "fecha";

export async function addLeaveVacations() {
  if (this.getUserRole == "ADMIN") {
    if (this.addForm.type == "") {
      this.errorMsgSelect = true;
      return true;
    }
    this.errorMsgSelect = false;
  }
  if (this.addForm.start == "") {
    this.errorMsgStartDate = true;
    return true;
  }
  this.errorMsgStartDate = false;
  if (this.addForm.end == "") {
    this.errorMsgEndDate = true;
    return true;
  }
  this.errorMsgEndDate = false;
  this.loading = true;
  var data = this.addForm;
  var startDate = fecha.format(new Date(data.start), "YYYY-MM-DDT00:00:00.000Z"); // '2015-11-20'data.start.toISOString();
  var endDate = fecha.format(new Date(data.end), "YYYY-MM-DDT23:59:59.999Z");
  this.addForm.start = startDate;
  this.addForm.end = endDate;
  console.log( this.addForm, "toISOString()")
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
    this.leaveVacationData = addLeaveVacations.data;
    if (this.getUserRole == "ADMIN") {
      this.$store
        .dispatch("leavevacation/setLeaveVacations", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then(() => {
          this.$nuxt.$emit("update-key");
        });
    } else {
      this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then(() => {
          this.$nuxt.$emit("leaves-list");
        });
    }
    this.slideClass = "slide-out";
    setTimeout(() => {
      this.openSidebar = false;
      this.openPopupNotification(0);
    }, 700);
  } catch (e) {
    console.log(e.response.data.message, "tttttttttttttttttttttttttttttttttt")
    alert(e.response.data.message);
  }
  this.loading = false;
}
export async function getAllowanceDays() {
  this.loading = true;
  try {
    const allowanceDays = await axios.get(
      process.env.API_URL + "/requests/allowance-days",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          type: this.leaveType, // This is the body part
        },
      }
    );
    this.loading = false;
    return allowanceDays.data;
    // console.log(this.allowanceDaysData, "this.allowanceDaysData")
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
    // console.log(this.allowanceDaysData, "this.allowanceDaysData")
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
    // console.log(this.allowanceDaysData, "this.allowanceDaysData")
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
    // console.log(this.allowanceDaysData, "this.allowanceDaysData")
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
    // console.log(this.allowanceDaysData, "this.allowanceDaysData")
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function deleteLevaeVacation(value) {
  this.loading = true;
  try {
    const laeveDelete = await axios.delete(
      process.env.API_URL + "/requests/" + value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.loading = false;
    this.confirmastionMessageModal = false;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getUserLeavesDetailUser() {
  this.loading = true;
  try {
    const result = await axios.get(
      process.env.API_URL + "/widgets/request/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.loading = false;
    // this.allowanceLeavesDetailedData = allowanceDays.data;
    return result.data;
    // console.log(this.allowanceLeavesDetailedData, "this.allowanceDaysData")
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}