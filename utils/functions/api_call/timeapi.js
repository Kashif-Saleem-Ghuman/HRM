import axios from "axios";
export async function employeeTime(payload) {
    try {
      const employeeTime = await axios.get(`${process.env.API_URL}/employees/${payload}/settings/time`, {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      });
      this.time = employeeTime.data
      console.log(employeeTime, "employeeTime")
    } catch (e) {
      console.log(e);
    }
  }
  
  export async function updateEmployeeTime(payload) {
    this.loading = true;
    await this.$axios
      .$put(`${process.env.API_URL}/employees/${payload}/settings/time`, this.updateForm, {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      })
      .then((res) => {
        this.$openPopupNotification(1);
        this.time = res;
        this.loading = false;
        this.isFlag = false;
      })
      .catch((err) => {
        console.log("There was an issue in employees API", err);
      });
    this.loading = false;
  }