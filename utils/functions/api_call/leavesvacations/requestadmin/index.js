import { createConfig } from "../../config";
import { hrmApiAxiosInstance } from "../../hrm-api-axios-instance";
export async function getPendingLeaveVacationsAdmin() {
  // this.loading = true;
  try {
    const url = `/requests/admin/pending`;
    const config = createConfig();
    const pendingLeaveVacationsAdmin = await hrmApiAxiosInstance.get(
      url,
      config,
    );
    this.requestListData = pendingLeaveVacationsAdmin.data.requests;
    this.loading = false;
    this.$nuxt.$emit("pending-key");
  } catch (e) {
    this.openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
    this.loading = false;
  }
}

export async function getApproveLeaveVacationsAdmin({ requestIds }) {
  this.loading = true;
  try {
    const url = '/requests/admin/approve'
    const requestId = {requestIds}
    const config = createConfig()
    const approveLeaveVacationsAdmin = await hrmApiAxiosInstance.put(
     url,
     requestId,
     config
    );
    this.$nuxt.$emit("pending-key");
    this.openPopupNotification(2);
    this.requestListApproveData = approveLeaveVacationsAdmin.data.requests;
  } catch (e) {
    this.openPopupNotification({
      text: e.response.data.message,
      variant: "danger",
    });
  }
  this.loading = false;
}

