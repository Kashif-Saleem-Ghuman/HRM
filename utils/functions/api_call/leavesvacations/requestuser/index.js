import axios from "axios";

export async function getLeaveVacations() {
  this.loading = true
  try {
          const leaveVacations = await axios.get(
           "https://dev-hrm-api.business-in-a-box.com/v1/requests",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
              params: {
                from: this.fromDate, // This is the body part
                to:this.toDate
              }
            }
          );
          this.leaveVacationData = leaveVacations.data;
        } catch (e) {
          alert(e);
        }
        this.loading = false
}
export async function getAllowanceDays() {
    this.loading = true
    try {
            const allowanceDays = await axios.get(
              process.env.API_URL + "/requests/allowance-days?" + this.vacationType,
              {
                headers: {
                  Authorization: "Bearer " + this.getAccessToken,
                },
              }
            );
            this.allowanceDaysData = allowanceDays.data;
          } catch (e) {
            alert(e);
          }
          this.loading = false
  }
  export async function addLeaveVacations() {
    this.loading = true
    try {
            const addLeaveVacations = await axios.post(
              process.env.API_URL + "/requests/", this.addLeave,
              {
                headers: {
                  Authorization: "Bearer " + this.getAccessToken,
                },
              }
            );
            this.leaveVacationData = addLeaveVacations.data;
          } catch (e) {
            alert(e);
          }
          this.loading = false
  }