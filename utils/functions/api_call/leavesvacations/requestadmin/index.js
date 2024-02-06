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
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
  }
}

export async function getPendingLeaveVacationsAdmin() {
  // this.loading = true;
  // const { from, to } = payload
  try {
    // const dates = {from:from, to:to }
    const pendingLeaveVacationsAdmin = await axios.get(
      process.env.API_URL + "/requests/admin/pending",
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
    this.requestListData = pendingLeaveVacationsAdmin.data.requests;
    this.loading = false;
    this.$nuxt.$emit('pending-key')
  } catch (e) {
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
    this.loading = false;
  }
  // this.loading = false;
}

export async function getApproveLeaveVacationsAdmin({ requestIds }) {
  this.loading = true;
  try {
    const approveLeaveVacationsAdmin = await axios.put(
      process.env.API_URL + "/requests/admin/approve",
      {
        requestIds
      },
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
          "Content-Type": "application/json",
        },
      }
    );
    this.$nuxt.$emit("pending-key");
    this.openPopupNotification(2);
    this.requestListApproveData = approveLeaveVacationsAdmin.data.requests;
  } catch (e) {
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
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
    this.openPopupNotification(3);
  } catch (e) {
    this.openPopupNotification({text:e.response.data.message, variant:'danger'})
  }
  this.loading = false;
}
export async function getUserLeavesDetail(id) {
  this.loading = true;
  try {
    const result = await axios.get(
      process.env.API_URL + "/widgets/admin/request/employees/"  + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.loading = false;
    this.is_data_fetched = true
    return result.data;
  } catch (e) {
    console.log(e);
  }
  this.openPopupNotification({text:e.response.data.message, variant:'danger'})
}
