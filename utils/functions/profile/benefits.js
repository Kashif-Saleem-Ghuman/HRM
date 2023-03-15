import axios from "axios";
import dayjs from "dayjs";
  export async function updateBenefitsData() {
    try {
      const benefits = await axios.put(process.env.API_URL + "/employees/" + this.id + '/benefits', this.updateForm, {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      });
      var dateFormat = dayjs(benefits.data.effectiveDate).format(
        "YYYY-MM-DD"
      );
      this.benefitsEffectiveDate = dateFormat;
      this.benefits = benefits.data
    } catch (e) {
      alert(e);
    }
  }
