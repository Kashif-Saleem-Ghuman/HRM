import axios from "axios";

export async function getLeaveVacationsAdmin() {
  this.loading = true
  try {
    const leaveVacations = await axios.get(
      process.env.API_URL + "/requests/admin",
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
        params: {
          from: this.fromDate, // This is the body part
          to: this.toDate,
        },
      }
    );
    this.calendarOptions.events = leaveVacations.data.requests;
  } catch (e) {
    alert(e);
  }
}

export async function getPendingLeaveVacationsAdmin() {
  this.loading = true
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
        } catch (e) {
          alert(e);
        }
        this.loading = false
}
export async function getApproveLeaveVacationsAdmin() {
  this.loading = true
  try {
          const approveLeaveVacationsAdmin = await axios.get(
            process.env.API_URL + "/requests/admin/approve",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.requestListData = approveLeaveVacationsAdmin.data;
        } catch (e) {
          alert(e);
        }
        this.loading = false
}
export async function getRejectLeaveVacationsAdmin() {
  this.loading = true
  try {
          const rejectLeaveVacationsAdmin = await axios.get(
            process.env.API_URL + "/requests/admin/reject",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.rejectLeaveVacationsAdminData = rejectLeaveVacationsAdmin.data;
        } catch (e) {
          alert(e);
        }
        this.loading = false
}

