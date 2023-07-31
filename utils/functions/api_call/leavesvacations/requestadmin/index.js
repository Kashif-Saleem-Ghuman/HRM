import axios from "axios";
export async function getLeaveVacationsAdmin() {
  this.loading = true;
  try {
    const leaveVacations = await axios.get(
      process.env.API_URL + "/requests/admin",
      {
        params: {
          from: this.fromDate, // This is the body part
          to: this.toDate,
        },
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      },
      
    );
    this.calendarOptions.events = leaveVacations.data.requests;
  } catch (e) {
    alert(e);
  }
}

export async function getPendingLeaveVacationsAdmin() {
  this.loading = true;
  try {
    const pendingLeaveVacationsAdmin = await axios.get(
      process.env.API_URL + "/requests/admin/pending",
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      }
    );
    this.requestListData = pendingLeaveVacationsAdmin.data.requests;
    this.$nuxt.$emit('pending-key')
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}

export async function getApproveLeaveVacationsAdmin() {
  // var id = JSON.stringify(this.addIds);
  this.loading = true;
  try {
    const approveLeaveVacationsAdmin = await axios.put(
      process.env.API_URL + "/requests/admin/approve",
      {
        requestIds: this.addIds,
      },
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
          "Content-Type": "application/json",
        },
      }
    );
    this.$nuxt.$emit("pending-key");
    this.addIds=[];
    this.checked = false;
    this.openPopupNotification(2);
    this.requestListApproveData = approveLeaveVacationsAdmin.data.requests;
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
export async function getRejectLeaveVacationsAdmin() {
  this.loading = true;
  try {
    const rejectLeaveVacationsAdmin = await axios.put(
      process.env.API_URL + "/requests/admin/reject",
      {
        requestIds: this.addIds,
      },
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      }
    );
    this.rejectLeaveVacationsAdminData = rejectLeaveVacationsAdmin.data;
    this.$nuxt.$emit("pending-key");
    this.addIds=[];
  } catch (e) {
    alert(e);
  }
  this.loading = false;
}
