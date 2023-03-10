import axios from "axios";

  export async function updateBenefitsData() {
    try {
      const benefits = await axios.put(process.env.API_URL + "/employees/" + this.id + '/benefits', this.updateForm, {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      });
      this.benefits = benefits.data
    } catch (e) {
      alert(e);
    }
  }
