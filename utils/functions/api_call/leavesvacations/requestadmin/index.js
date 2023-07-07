import axios from "axios";

export async function getLeaveVacationsAdmin() {
  this.loading = true
  try {
          const leaveVacationsAdmin = await axios.get(
            process.env.API_URL + "/requests/admin?from=2023-06-06T01%3A04%3A18.528Z&to=2023-07-06T10%3A04%3A18.528Z&type=vacation&status=approved",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.leaveVacationAdminData = leaveVacationsAdmin.data;
        } catch (e) {
          alert(e);
        }
        this.loading = false
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
          this.pendingLeaveVacationAdminData = pendingLeaveVacationsAdmin.data;
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
          this.approveLeaveVacationsAdminData = approveLeaveVacationsAdmin.data;
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

