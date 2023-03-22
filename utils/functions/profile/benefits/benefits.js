import axios from "axios";
import dayjs from "dayjs";
export async function addBenefitsData() {
  try {
    const benefits = await axios.post(
      process.env.API_URL + "/employees/" + this.id + "/benefits/benefit-plan",
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      }
    );
    var dateFormat = dayjs(benefits.data.effectiveDate).format('YYYY-MM-DD')
    this.benefitsEffectiveDate = dateFormat
    this.benefits = benefits.data;
    
  } catch (e) {
    alert(e);
  }
}
export async function getBenefitsData() {
  try {
          const benefits = await axios.get(
            process.env.API_URL + "/employees/" + this.id + "/benefits/benefit-plan",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          var dateFormat = dayjs(benefits.data.effectiveDate).format(
            "YYYY-MM-DD"
          );
          this.benefitsEffectiveDate = dateFormat;
          this.benefits = benefits.data;
          // this.benefitsPackageOptions = benefits.data.benefitPackage.options;
          // this.benefitsNameOptions = benefits.data.benefitPlan.options
        } catch (e) {
          alert(e);
        }
}
export async function updateBenefitsData() {
    try {
      const benefits = await axios.put(process.env.API_URL + "/employees/" + this.id + '/benefits/benefit-plan', this.updateForm, {
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
  export async function deleteBenefits() {
    try {
      const benefits = await axios.delete(
        process.env.API_URL + "/employees/" + this.id + "/benefits/benefit-plan",
        {
          headers: {
            Authorization: "Bearer " + this.getAccessToken,
          },
        }
      );
      var dateFormat = dayjs(benefits.data.effectiveDate).format('YYYY-MM-DD')
      this.benefitsEffectiveDate = dateFormat
      this.benefits = benefits.data;
      
    } catch (e) {
      alert(e);
    }
  }