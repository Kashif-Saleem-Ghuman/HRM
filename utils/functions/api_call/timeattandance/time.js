import axios from "axios";

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
      this.time = timeData.data;
    } catch (e) {
      alert(e);
    }
  }