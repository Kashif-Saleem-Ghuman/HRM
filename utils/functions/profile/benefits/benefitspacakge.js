import axios from "axios";
import dayjs from "dayjs";
export async function getBenefitsPacakge() {
  try {
    const benefits = await axios.get(process.env.API_URL + "/benefit-packages", {
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