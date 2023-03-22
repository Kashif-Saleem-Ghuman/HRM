import axios from "axios";
import dayjs from "dayjs";
export async function addBenefitsPacakge() {
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
export async function getBenefitsPacakge() {
  try {
    const benefits = await axios.get(process.env.API_URL + "/benefit-packages?select-options=true", {
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
export async function getBenefitsPacakgeById() {
  try {
    const benefits = await axios.get(process.env.API_URL + "/benefit-packages" + this.benefitsPackageId, {
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
export async function updateBenefitsPacakgeById() {
  try {
    const benefits = await axios.put(process.env.API_URL + "/benefit-packages" + this.benefitsPackageId, {
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
export async function deleteBenefitsPacakgeById() {
  try {
    const benefits = await axios.delete(process.env.API_URL + "/benefit-packages" + this.benefitsPackageId, {
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