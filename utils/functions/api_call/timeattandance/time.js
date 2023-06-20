import axios from "axios";

export async function getTimeAttandance() {
  try {
          const timeAttandance = await axios.get(
            process.env.API_URL + "/timesheets/admin/attendance?date=" + this.getCurrentDate,
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.localData = timeAttandance.data;
        } catch (e) {
          alert(e);
        }
}
export async function getTimesheet() {
  try {
          const timesheetData = await axios.get(
            process.env.API_URL + "/timesheets?from=2023-06-19&to=2023-06-20",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.timesheetData = timesheetData.data;
        } catch (e) {
          alert(e);
        }
}

export async function getTime() {
  try {
          const time = await axios.get(
            process.env.API_URL + "/employees/" + this.id + "/settings/time",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          this.time = time.data;
          // this.benefitsPackageOptions = benefits.data.benefitPackage.options;
          // this.benefitsNameOptions = benefits.data.benefitPlan.options
        } catch (e) {
          alert(e);
        }
}
export async function updateTimeAttandance() {
    try {
      const timeData = await axios.put(process.env.API_URL + "/employees/" + this.id + "/settings/time", this.updateForm, {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      });
      this.openPopupNotification(1);
      this.time = timeData.data;
    } catch (e) {
      alert(e);
    }
  }